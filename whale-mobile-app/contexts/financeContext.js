// contexts/FinanceContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import {
  getFinanceData,
  addExpense,
  addIncome,
  updateTransaction,
  deleteTransaction,
} from "../services/financeService";
import { useAuth } from "./AuthContext";

const FinanceContext = createContext(null);

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    profitMargin: 0,
  });

  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      loadFinanceData();
    }
  }, [isAuthenticated]);

  const loadFinanceData = async () => {
    if (!isAuthenticated) return;

    setLoading(true);
    try {
      const data = await getFinanceData();
      setTransactions(data.transactions || []);

      // Calcular estatísticas
      calculateStats(data.transactions);

      setError(null);
    } catch (err) {
      setError("Falha ao carregar dados financeiros");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (transactionList) => {
    if (!transactionList || transactionList.length === 0) {
      setStats({
        totalIncome: 0,
        totalExpenses: 0,
        profitMargin: 0,
      });
      return;
    }

    const income = transactionList
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactionList
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const margin = income > 0 ? ((income - expenses) / income) * 100 : 0;

    setStats({
      totalIncome: income,
      totalExpenses: expenses,
      profitMargin: margin,
    });
  };

  const addNewExpense = async (expenseData) => {
    setLoading(true);
    try {
      const newExpense = await addExpense(expenseData);
      setTransactions([...transactions, newExpense]);
      calculateStats([...transactions, newExpense]);
      return { success: true, expense: newExpense };
    } catch (err) {
      setError("Falha ao adicionar despesa");
      console.error(err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const addNewIncome = async (incomeData) => {
    setLoading(true);
    try {
      const newIncome = await addIncome(incomeData);
      setTransactions([...transactions, newIncome]);
      calculateStats([...transactions, newIncome]);
      return { success: true, income: newIncome };
    } catch (err) {
      setError("Falha ao adicionar receita");
      console.error(err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const updateTransactionItem = async (id, transactionData) => {
    setLoading(true);
    try {
      const updated = await updateTransaction(id, transactionData);
      const updatedList = transactions.map((t) => (t._id === id ? updated : t));
      setTransactions(updatedList);
      calculateStats(updatedList);
      return { success: true, transaction: updated };
    } catch (err) {
      setError("Falha ao atualizar transação");
      console.error(err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteTransactionItem = async (id) => {
    setLoading(true);
    try {
      await deleteTransaction(id);
      const updatedList = transactions.filter((t) => t._id !== id);
      setTransactions(updatedList);
      calculateStats(updatedList);
      return { success: true };
    } catch (err) {
      setError("Falha ao excluir transação");
      console.error(err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        stats,
        loading,
        error,
        loadFinanceData,
        addExpense: addNewExpense,
        addIncome: addNewIncome,
        updateTransaction: updateTransactionItem,
        deleteTransaction: deleteTransactionItem,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);
