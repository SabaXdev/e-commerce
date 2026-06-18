import { Injectable, Logger } from '@nestjs/common';
import { RedisNumericSetting } from '../../../common/redis/redis.constants';
import { RedisService } from '../../../common/redis/redis.service';
import { PaginatedProducts } from '../products.constants';
import { ProductCacheKey } from './products.cache.keys';

enum ProductsCacheLogMessage {
  InvalidatedListEntries = 'Invalidated product list cache entries',
  InvalidationSkipped = 'Skipped product list cache invalidation — Redis unavailable',
}

@Injectable()
export class ProductsCacheService {
  private readonly logger = new Logger(ProductsCacheService.name);

  constructor(private readonly redisService: RedisService) {}

  async getList(
    page: number,
    limit: number,
  ): Promise<PaginatedProducts | null> {
    return this.redisService.get<PaginatedProducts>(
      ProductCacheKey.list(page, limit),
    );
  }

  async setList(
    page: number,
    limit: number,
    payload: PaginatedProducts,
  ): Promise<void> {
    await this.redisService.set(ProductCacheKey.list(page, limit), payload);
  }

  async resolveList(
    page: number,
    limit: number,
    loader: () => Promise<PaginatedProducts>,
  ): Promise<PaginatedProducts> {
    const cached = await this.getList(page, limit);

    if (cached) {
      return cached;
    }

    const lockKey = ProductCacheKey.listLock(page, limit);
    const lockAcquired = await this.redisService.setIfNotExists(
      lockKey,
      '1',
      RedisNumericSetting.LockTtlSeconds,
    );

    if (!lockAcquired) {
      await this.delay(RedisNumericSetting.StampedeRetryDelayMs);

      const retryCache = await this.getList(page, limit);

      if (retryCache) {
        return retryCache;
      }
    }

    try {
      const freshData = await loader();
      await this.setList(page, limit, freshData);
      return freshData;
    } finally {
      await this.redisService.del(lockKey);
    }
  }

  async invalidateListCache(): Promise<void> {
    const invalidated = await this.redisService.deleteByPattern(
      ProductCacheKey.listPattern(),
    );

    if (invalidated) {
      this.logger.log(ProductsCacheLogMessage.InvalidatedListEntries);
      return;
    }

    if (!this.redisService.isAvailable) {
      this.logger.warn(ProductsCacheLogMessage.InvalidationSkipped);
    }
  }

  private delay(milliseconds: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }
}
