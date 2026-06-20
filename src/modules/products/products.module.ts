import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesGuard } from '../../common/guards/roles.guard';
import { AuthModule } from '../auth/auth.module';
import { ProductsCacheService } from './cache/products.cache.service';
import { Product } from './entities/product.entity';
import { ProductCacheInterceptor } from './interceptors/product-cache.interceptor';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), AuthModule],
  controllers: [ProductController],
  providers: [ProductService, ProductsCacheService, ProductCacheInterceptor, RolesGuard],
  exports: [ProductService],
})
export class ProductsModule {}
