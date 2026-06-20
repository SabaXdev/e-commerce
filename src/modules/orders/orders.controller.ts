import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserRole } from '../../common/enums';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import type { AuthenticatedUser } from '../auth/types/auth.types';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderQueryParamsDto } from './dto/order-query-params.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import {
  OrdersService,
  PaginatedOrdersResponse,
} from './orders.service';
import { OrderWithItems } from './orders.repository';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @CurrentUser() user: AuthenticatedUser,
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<OrderWithItems> {
    return this.ordersService.create(user, createOrderDto);
  }

  @Get()
  findAll(
    @CurrentUser() user: AuthenticatedUser,
    @Query() query: OrderQueryParamsDto,
  ): Promise<PaginatedOrdersResponse> {
    return this.ordersService.findAll(user, query);
  }

  @Get(':id')
  findOne(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<OrderWithItems> {
    return this.ordersService.findOne(user, id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ): Promise<OrderWithItems> {
    return this.ordersService.updateStatus(id, updateOrderStatusDto);
  }
}
