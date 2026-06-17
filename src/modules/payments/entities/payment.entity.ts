import { PaymentStatus } from '../../../common/enums';

export class Payment {
  id: string;
  orderId: string;
  amount: string;
  status: PaymentStatus;
  createdAt: Date;
}
