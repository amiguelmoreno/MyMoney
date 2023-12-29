export const formatCurrency = (value) =>
  new Intl.NumberFormat("es", { style: "currency", currency: "EUR" }).format(
    value
  );

export function filterTransactionsByDate(transactions, daysAgo) {
  const fromDate = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
  return transactions.filter(
    (transaction) => new Date(transaction.date) > fromDate
  );
}

export function filterTransactionsByMonth(transactions) {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  return transactions.filter(
    (transaction) => new Date(transaction.date) >= startOfMonth
  );
}
