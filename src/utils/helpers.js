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

export function generateUniqueID() {
  return Date.now().toString();
}

export function formatDateDifference(dateString) {
  const transactionDate = new Date(dateString);
  const currentDate = new Date();

  const differenceInMilliseconds = currentDate - transactionDate;
  const differenceInDays = Math.floor(
    differenceInMilliseconds / (24 * 60 * 60 * 1000)
  );

  if (differenceInDays === 0) {
    return "Today";
  } else if (differenceInDays === 1) {
    return "Yesterday";
  } else {
    return `${differenceInDays} days ago`;
  }
}

export function arraysEqual(arr1, arr2) {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
}
