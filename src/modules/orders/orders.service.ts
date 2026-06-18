import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrderStatus } from '../../common/enums';
import { AuthenticatedUser } from '../auth/types/auth.types';
import { ProductService } from '../products/product.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderQueryParamsDto } from './dto/order-query-params.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { OrderErrorMessage } from './enums/order-error-message.enum';
import {
  ORDER_STATUS_TRANSITIONS,
  ORDERS_REPOSITORY,
  OrderPagination,
  TERMINAL_ORDER_STATUSES,
} from './orders.constants';
import type {
  OrderWithItems,
  OrdersRepository,
  PaginatedOrders,
} from './orders.repository';

export type PaginatedOrdersResponse = PaginatedOrders & {
  totalPages: number;
};

@Injectable()
export class OrdersService {
  constructor(
    @Inject(ORDERS_REPOSITORY)
    private readonly ordersRepository: OrdersRepository,
    private readonly productService: ProductService,
  ) {}

  async create(
    user: AuthenticatedUser,
    createOrderDto: CreateOrderDto,
  ): Promise<OrderWithItems> {
    this.assertNoDuplicateProducts(createOrderDto);

    const resolvedItems = await Promise.all(
      createOrderDto.items.map(async (item) => {
        const product = await this.productService.findOne(item.productId);

        if (product.stockQuantity < item.quantity) {
          throw new BadRequestException(OrderErrorMessage.InsufficientStock);
        }

        return {
          productId: product.id,
          quantity: item.quantity,
          unitPrice: product.price,
        };
      }),
    );

    const totalPrice = this.calculateTotal(resolvedItems);

    const order = await this.ordersRepository.create({
      userId: user.userId,
      status: OrderStatus.Pending,
      totalPrice,
      items: resolvedItems,
    });

    await Promise.all(
      resolvedItems.map((item) =>
        this.adjustProductStock(item.productId, -item.quantity),
      ),
    );

    return order;
  }

  async findAll(
    user: AuthenticatedUser,
    query: OrderQueryParamsDto,
  ): Promise<PaginatedOrdersResponse> {
    const page = query.page ?? OrderPagination.DefaultPage;
    const limit = query.limit ?? OrderPagination.DefaultLimit;

    const result = await this.ordersRepository.findByUserId(
      user.userId,
      page,
      limit,
    );

    return {
      ...result,
      totalPages: this.calculateTotalPages(result.total, limit),
    };
  }

  async findOne(
    user: AuthenticatedUser,
    id: string,
  ): Promise<OrderWithItems> {
    const order = await this.getOrderOrThrow(id);
    this.assertOrderOwnership(user, order.order.userId);

    return order;
  }

  async updateStatus(
    id: string,
    updateOrderStatusDto: UpdateOrderStatusDto,
  ): Promise<OrderWithItems> {
    const existingOrder = await this.getOrderOrThrow(id);
    const { order, items } = existingOrder;

    this.assertStatusTransition(order.status, updateOrderStatusDto.status);

    const updatedOrder = await this.ordersRepository.updateStatus(
      id,
      updateOrderStatusDto.status,
    );

    if (!updatedOrder) {
      throw new NotFoundException(OrderErrorMessage.NotFound);
    }

    if (updateOrderStatusDto.status === OrderStatus.Cancelled) {
      await this.restoreStock(items);
    }

    return { order: updatedOrder, items };
  }

  private assertNoDuplicateProducts(createOrderDto: CreateOrderDto): void {
    const productIds = createOrderDto.items.map((item) => item.productId);
    const uniqueProductIds = new Set(productIds);

    if (uniqueProductIds.size !== productIds.length) {
      throw new BadRequestException(OrderErrorMessage.DuplicateProducts);
    }
  }

  private assertOrderOwnership(
    user: AuthenticatedUser,
    orderUserId: string,
  ): void {
    if (user.userId !== orderUserId) {
      throw new ForbiddenException(OrderErrorMessage.Forbidden);
    }
  }

  private assertStatusTransition(
    currentStatus: OrderStatus,
    nextStatus: OrderStatus,
  ): void {
    if (currentStatus === nextStatus) {
      return;
    }

    if (TERMINAL_ORDER_STATUSES.includes(currentStatus)) {
      throw new BadRequestException(OrderErrorMessage.TerminalStatus);
    }

    const allowedTransitions = ORDER_STATUS_TRANSITIONS[currentStatus];

    if (!allowedTransitions.includes(nextStatus)) {
      throw new BadRequestException(OrderErrorMessage.InvalidStatusTransition);
    }
  }

  private async getOrderOrThrow(id: string): Promise<OrderWithItems> {
    const order = await this.ordersRepository.findById(id);

    if (!order) {
      throw new NotFoundException(OrderErrorMessage.NotFound);
    }

    return order;
  }

  private calculateTotal(
    items: Array<{ quantity: number; unitPrice: string }>,
  ): string {
    const total = items.reduce(
      (sum, item) => sum + Number(item.unitPrice) * item.quantity,
      0,
    );

    return total.toFixed(2);
  }

  private calculateTotalPages(total: number, limit: number): number {
    return Math.ceil(total / limit) || 0;
  }

  private async adjustProductStock(
    productId: string,
    quantityDelta: number,
  ): Promise<void> {
    const product = await this.productService.findOne(productId);

    await this.productService.update(productId, {
      stockQuantity: product.stockQuantity + quantityDelta,
    });
  }

  private async restoreStock(
    items: Array<{ productId: string; quantity: number }>,
  ): Promise<void> {
    await Promise.all(
      items.map((item) =>
        this.adjustProductStock(item.productId, item.quantity),
      ),
    );
  }
}
