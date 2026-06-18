import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, firstValueFrom, from } from 'rxjs';
import { ProductsCacheService } from '../cache/products.cache.service';
import {
  PaginatedProducts,
  ProductPagination,
} from '../products.constants';

@Injectable()
export class ProductCacheInterceptor implements NestInterceptor {
  constructor(private readonly productsCacheService: ProductsCacheService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<PaginatedProducts>,
  ): Observable<PaginatedProducts> {
    const request = context.switchToHttp().getRequest<{
      query: { page?: string; limit?: string };
    }>();

    const page = this.parsePositiveInt(
      request.query.page,
      ProductPagination.DefaultPage,
    );
    const limit = this.parsePositiveInt(
      request.query.limit,
      ProductPagination.DefaultLimit,
    );

    return from(
      this.productsCacheService.resolveList(page, limit, () =>
        firstValueFrom(next.handle()),
      ),
    );
  }

  private parsePositiveInt(value: string | undefined, fallback: number): number {
    const parsed = Number(value);

    if (!Number.isInteger(parsed) || parsed < 1) {
      return fallback;
    }

    return parsed;
  }
}
