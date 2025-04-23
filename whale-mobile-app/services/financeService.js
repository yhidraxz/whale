import api from "./api";

export const getFinanceSummary = async () => {
  try {
    const response = await api.get("/finance/summary");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getFinanceProjection = async (startDate, endDate) => {
  try {
    const response = await api.get("/finance/projection", {
      params: { startDate, endDate },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const addExpense = async (expenseData) => {
  try {
    const response = await api.post("/finance/expenses", expenseData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const addRevenue = async (revenueData) => {
  try {
    const response = await api.post("/finance/revenues", revenueData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
