import { useState, useEffect } from "react";

const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("http://localhost:5003/api/transactions");
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error al obtener las transacciones:", error);
      }
    };

    fetchTransactions();
  }, []);

  return transactions;
};

export default useTransactions;
