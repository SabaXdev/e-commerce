import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { OrderPagination } from '../orders.constants';

export class OrderQueryParamsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(OrderPagination.MinPage)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(OrderPagination.MinLimit)
  @Max(OrderPagination.MaxLimit)
  limit?: number;
}
