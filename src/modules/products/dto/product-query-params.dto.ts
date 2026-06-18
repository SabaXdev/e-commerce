import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { ProductPagination } from '../products.constants';

export class ProductQueryParamsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(ProductPagination.MinPage)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(ProductPagination.MinLimit)
  @Max(ProductPagination.MaxLimit)
  limit?: number;
}
