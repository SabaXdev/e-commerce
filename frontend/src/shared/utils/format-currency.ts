export function formatCurrency(value: string | number, currency = 'USD'): string {
  const amount = typeof value === 'string' ? Number(value) : value;

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}
