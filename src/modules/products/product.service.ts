import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsCacheService } from './cache/products.cache.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductQueryParamsDto } from './dto/product-query-params.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductErrorMessage } from './enums/product-error-message.enum';
import {
  PaginatedProducts,
  ProductPagination,
} from './products.constants';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly productsCacheService: ProductsCacheService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productsRepository.create({
      name: createProductDto.name,
      description: createProductDto.description ?? null,
      price: this.formatPrice(createProductDto.price),
      stockQuantity: createProductDto.stockQuantity,
    });

    const savedProduct = await this.productsRepository.save(product);
    await this.productsCacheService.invalidateListCache();

    return savedProduct;
  }

  async findAll(query: ProductQueryParamsDto): Promise<PaginatedProducts> {
    const page = query.page ?? ProductPagination.DefaultPage;
    const limit = query.limit ?? ProductPagination.DefaultLimit;
    const skip = (page - 1) * limit;

    const [data, total] = await this.productsRepository.findAndCount({
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || ProductPagination.MinPage,
    };
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productsRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(ProductErrorMessage.NotFound);
    }

    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    if (Object.keys(updateProductDto).length === 0) {
      throw new BadRequestException(ProductErrorMessage.EmptyUpdate);
    }

    const product = await this.findOne(id);

    if (updateProductDto.name !== undefined) {
      product.name = updateProductDto.name;
    }

    if (updateProductDto.description !== undefined) {
      product.description = updateProductDto.description;
    }

    if (updateProductDto.price !== undefined) {
      product.price = this.formatPrice(updateProductDto.price);
    }

    if (updateProductDto.stockQuantity !== undefined) {
      product.stockQuantity = updateProductDto.stockQuantity;
    }

    const updatedProduct = await this.productsRepository.save(product);
    await this.productsCacheService.invalidateListCache();

    return updatedProduct;
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    await this.productsRepository.remove(product);
    await this.productsCacheService.invalidateListCache();
  }

  private formatPrice(price: number): string {
    return price.toFixed(2);
  }
}
