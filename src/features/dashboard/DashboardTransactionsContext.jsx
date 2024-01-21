import { createContext, useContext, useState } from "react";

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  const updateTransactions = (newTransactions) => {
    setTransactions(newTransactions);
  };

  return (
    <TransactionContext.Provider value={{ transactions, updateTransactions }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useDashTransactionContext = () => useContext(TransactionContext);
