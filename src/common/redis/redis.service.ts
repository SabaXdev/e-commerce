import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { EnvKey } from '../enums/env-key.enum';
import { RedisLogMessage, RedisNumericSetting, RedisStringSetting } from './redis.constants';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private readonly client: Redis;
  private readonly defaultTtlSeconds: number;
  private isHealthy = false;

  constructor(private readonly configService: ConfigService) {
    this.defaultTtlSeconds = this.configService.get<number>(
      EnvKey.RedisDefaultTtlSeconds,
      RedisNumericSetting.DefaultTtlSeconds,
    );

    this.client = new Redis({
      host: this.configService.get<string>(
        EnvKey.RedisHost,
        RedisStringSetting.DefaultHost,
      ),
      port: this.configService.get<number>(
        EnvKey.RedisPort,
        RedisNumericSetting.DefaultPort,
      ),
      password:
        this.configService.get<string>(EnvKey.RedisPassword) || undefined,
      lazyConnect: true,
      enableOfflineQueue: false,
      maxRetriesPerRequest: 1,
      connectTimeout: RedisNumericSetting.ConnectionTimeoutMs,
    });

    this.client.on('ready', () => {
      this.isHealthy = true;
      this.logger.log(RedisLogMessage.ConnectionReady);
    });

    this.client.on('error', (error: Error) => {
      this.isHealthy = false;
      this.logger.warn(`${RedisLogMessage.ConnectionError}: ${error.message}`);
    });

    this.client.on('end', () => {
      this.isHealthy = false;
    });

    void this.connectSafely();
  }

  get isAvailable(): boolean {
    return this.isHealthy;
  }

  async onModuleDestroy(): Promise<void> {
    if (this.client.status === 'end') {
      return;
    }

    await this.client.quit().catch(() => this.client.disconnect());
  }

  async get<T>(key: string): Promise<T | null> {
    if (!this.isHealthy) {
      return null;
    }

    try {
      const value = await this.client.get(key);

      if (value === null) {
        return null;
      }

      return JSON.parse(value) as T;
    } catch (error) {
      this.logOperationFailure(error);
      return null;
    }
  }

  async set(
    key: string,
    value: unknown,
    ttlSeconds = this.defaultTtlSeconds,
  ): Promise<boolean> {
    if (!this.isHealthy) {
      return false;
    }

    try {
      const ttlWithJitter = this.applyTtlJitter(ttlSeconds);
      await this.client.set(key, JSON.stringify(value), 'EX', ttlWithJitter);
      return true;
    } catch (error) {
      this.logOperationFailure(error);
      return false;
    }
  }

  async setIfNotExists(
    key: string,
    value: string,
    ttlSeconds: number,
  ): Promise<boolean> {
    if (!this.isHealthy) {
      return false;
    }

    try {
      const result = await this.client.set(key, value, 'EX', ttlSeconds, 'NX');
      return result === 'OK';
    } catch (error) {
      this.logOperationFailure(error);
      return false;
    }
  }

  async del(...keys: string[]): Promise<boolean> {
    if (!this.isHealthy || keys.length === 0) {
      return false;
    }

    try {
      await this.client.del(...keys);
      return true;
    } catch (error) {
      this.logOperationFailure(error);
      return false;
    }
  }

  async deleteByPattern(pattern: string): Promise<boolean> {
    if (!this.isHealthy) {
      return false;
    }

    try {
      let cursor = '0';

      do {
        const [nextCursor, keys] = await this.client.scan(
          cursor,
          'MATCH',
          pattern,
          'COUNT',
          RedisNumericSetting.ScanCount,
        );

        cursor = nextCursor;

        if (keys.length > 0) {
          await this.client.del(...keys);
        }
      } while (cursor !== '0');

      return true;
    } catch (error) {
      this.logOperationFailure(error);
      return false;
    }
  }

  private applyTtlJitter(baseTtlSeconds: number): number {
    const jitter = Math.floor(Math.random() * RedisNumericSetting.TtlJitterMaxSeconds);
    return baseTtlSeconds + jitter;
  }

  private async connectSafely(): Promise<void> {
    try {
      await this.client.connect();
    } catch (error) {
      this.isHealthy = false;
      this.logOperationFailure(error);
    }
  }

  private logOperationFailure(error: unknown): void {
    const message = error instanceof Error ? error.message : String(error);
    this.logger.warn(`${RedisLogMessage.OperationFailed}: ${message}`);
  }
}
