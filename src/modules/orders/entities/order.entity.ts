import { OrderStatus } from '../../../common/enums';

export class Order {
  id: string;
  userId: string;
  status: OrderStatus;
  totalPrice: string;
  createdAt: Date;
}
