import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvKey } from './common/enums/env-key.enum';
import { AuthModule } from './modules/auth/auth.module';
import { Order } from './modules/orders/entities/order.entity';
import { OrderItem } from './modules/orders/entities/order-item.entity';
import { OrdersModule } from './modules/orders/orders.module';
import { Product } from './modules/products/entities/product.entity';
import { ProductsModule } from './modules/products/products.module';
import { User } from './modules/users/entities/user.entity';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow<string>(EnvKey.DbHost),
        port: configService.get<number>(EnvKey.DbPort, 5432),
        username: configService.getOrThrow<string>(EnvKey.DbUser),
        password: configService.getOrThrow<string>(EnvKey.DbPassword),
        database: configService.getOrThrow<string>(EnvKey.DbName),
        entities: [User, Product, Order, OrderItem],
        synchronize: false,
      }),
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
