// services/financeService.js
import api from "./api";

export const getFinanceData = async () => {
  const response = await api.get("/finances");
  return response.data;
};

export const addExpense = async (expenseData) => {
  const response = await api.post("/finances/expenses", expenseData);
  return response.data;
};

export const addIncome = async (incomeData) => {
  const response = await api.post("/finances/incomes", incomeData);
  return response.data;
};

export const updateTransaction = async (id, transactionData) => {
  const response = await api.put(
    `/finances/transactions/${id}`,
    transactionData
  );
  return response.data;
};

export const deleteTransaction = async (id) => {
  const response = await api.delete(`/finances/transactions/${id}`);
  return response.data;
};

export const getFinancialProjection = async (startDate, endDate) => {
  const response = await api.get(
    `/finances/projections?startDate=${startDate}&endDate=${endDate}`
  );
  return response.data;
};
