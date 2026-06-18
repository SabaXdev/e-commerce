import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { ProductValidation } from '../../../common/enums/product-validation.enum';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(ProductValidation.NameMaxLength)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber({ maxDecimalPlaces: ProductValidation.PriceMaxDecimalPlaces })
  @Min(0)
  price: number;

  @IsInt()
  @Min(0)
  stockQuantity: number;
}
