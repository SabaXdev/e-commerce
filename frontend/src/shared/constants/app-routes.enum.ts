export enum AppRoute {
  Home = '/',
  Login = '/login',
  Register = '/register',
  Products = '/products',
  ProductDetail = '/products/:id',
  Orders = '/orders',
  OrderDetail = '/orders/:id',
  Checkout = '/checkout',
  Account = '/account',
  AdminHome = '/admin',
  AdminProducts = '/admin/products',
  AdminProductNew = '/admin/products/new',
  AdminProductEdit = '/admin/products/:id/edit',
  AdminOrders = '/admin/orders',
  AdminOrderDetail = '/admin/orders/:id',
}

export enum ApiAuthRoute {
  Login = '/api/auth/login',
  Logout = '/api/auth/logout',
}
