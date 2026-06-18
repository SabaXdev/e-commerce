export enum OrderErrorMessage {
  NotFound = 'Order not found',
  Forbidden = 'You do not have access to this order',
  InvalidStatusTransition = 'Invalid order status transition',
  DuplicateProducts = 'Order cannot contain duplicate products',
  InsufficientStock = 'Insufficient stock for one or more products',
  TerminalStatus = 'Order status cannot be changed once delivered or cancelled',
}
