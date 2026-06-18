export enum RedisStringSetting {
  DefaultHost = 'localhost',
}

export enum RedisNumericSetting {
  DefaultPort = 6379,
  DefaultTtlSeconds = 300,
  LockTtlSeconds = 10,
  TtlJitterMaxSeconds = 30,
  ScanCount = 100,
  StampedeRetryDelayMs = 50,
  ConnectionTimeoutMs = 5000,
}

export enum RedisLogMessage {
  ConnectionError = 'Redis connection error — cache operations will fall back to the database',
  ConnectionReady = 'Redis connection established',
  OperationFailed = 'Redis operation failed — falling back gracefully',
}
