import React, { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseSummary from "./components/ExpenseSummary";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const [budgetLimit, setBudgetLimit] = useState(() => {
    const savedBudgetLimit = localStorage.getItem("budgetLimit");
    return savedBudgetLimit ? parseFloat(savedBudgetLimit) : 500;
  });

  const [income, setIncome] = useState(() => {
    const savedIncome = localStorage.getItem("income");
    return savedIncome ? parseFloat(savedIncome) : 1000;
  });

  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem("categories");
    return savedCategories
      ? JSON.parse(savedCategories)
      : ["Food", "Transport", "Rent"];
  });

  const [expenseToEdit, setExpenseToEdit] = useState(null);

  const totalExpenses = expenses.reduce(
    (acc, expense) => acc + parseFloat(expense.amount || 0),
    0
  );
  const balance = income - totalExpenses;

  const alertMessage =
    totalExpenses >= budgetLimit
      ? "Warning: You have reached or exceeded your budget limit!"
      : "";

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("budgetLimit", budgetLimit);
  }, [budgetLimit]);

  useEffect(() => {
    localStorage.setItem("income", income);
  }, [income]);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const handleEditExpense = (index, updatedExpense) => {
    const updatedExpenses = expenses.map((expense, i) =>
      i === index ? updatedExpense : expense
    );
    setExpenses(updatedExpenses);
  };

  const handleDeleteExpense = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
  };

  const updateExpense = (updatedExpense, index) => {
    const updatedExpenses = expenses.map((expense, i) =>
      i === index ? updatedExpense : expense
    );
    setExpenses(updatedExpenses);
    setExpenseToEdit(null);
  };

  const handleBudgetChange = (e) => {
    setBudgetLimit(parseFloat(e.target.value) || 0);
  };

  const handleIncomeChange = (e) => {
    setIncome(parseFloat(e.target.value) || 0);
  };

  const addCategory = (newCategory) => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
    }
  };

  return (
    <div className="app">
      <h1>Personal Budget Manager</h1>

      {alertMessage && <div className="alert">{alertMessage}</div>}

      <div className="budget-container">
        <div>
          <label>Set Income: </label>
          <input
            type="number"
            value={income}
            onChange={handleIncomeChange}
            min="0"
          />
        </div>

        <div>
          <label>Set Budget Limit: </label>
          <input
            type="number"
            value={budgetLimit}
            onChange={handleBudgetChange}
            min="0"
          />
        </div>
      </div>

      <ExpenseForm
        setExpenses={setExpenses}
        categories={categories}
        addCategory={addCategory}
        expenseToEdit={expenseToEdit}
        updateExpense={updateExpense}
      />
      <ExpenseList
        expenses={expenses}
        onEditExpense={handleEditExpense}
        onDeleteExpense={handleDeleteExpense}
      />
      <ExpenseSummary
        expenses={expenses}
        budgetLimit={budgetLimit}
        totalExpenses={totalExpenses}
        balance={balance}
      />
      <div>
        <h2>Balance: ${balance.toFixed(2)}</h2>
      </div>
    </div>
  );
}

export default App;
