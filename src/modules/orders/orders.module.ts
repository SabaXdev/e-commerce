import { Module } from '@nestjs/common';
import { RolesGuard } from '../../common/guards/roles.guard';
import { AuthModule } from '../auth/auth.module';
import { ProductsModule } from '../products/products.module';
import { ORDERS_REPOSITORY } from './orders.constants';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { InMemoryOrdersRepository } from './repositories/in-memory-orders.repository';

@Module({
  imports: [ProductsModule, AuthModule],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    RolesGuard,
    {
      provide: ORDERS_REPOSITORY,
      useClass: InMemoryOrdersRepository,
    },
  ],
  exports: [OrdersService],
})
export class OrdersModule {}
