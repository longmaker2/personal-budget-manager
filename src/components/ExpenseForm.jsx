import React, { useState, useEffect } from "react";
import "../styles/ExpenseForm.css";

const ExpenseForm = ({
  setExpenses,
  categories,
  addCategory,
  expenseToEdit,
  updateExpense,
  handleCategoryLimitReached, // New prop for category limit handling
  categoryBudgets,
  categoryTotals,
}) => {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // New state for error message

  useEffect(() => {
    if (expenseToEdit) {
      setAmount(expenseToEdit.amount);
      setDate(expenseToEdit.date);
      setCategory(expenseToEdit.category);
    }
  }, [expenseToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const categoryBudget = categoryBudgets[category] || 100;
    const categorySpent = categoryTotals[category] || 0;
    const newExpenseAmount = parseFloat(amount);

    // Check if the category has reached its limit
    if (categorySpent + newExpenseAmount > categoryBudget) {
      setErrorMessage(
        `You cannot add more expenses to ${category} category, limit reached.`
      );
      handleCategoryLimitReached(category);
      return;
    }

    const newExpense = { amount: newExpenseAmount, date, category };

    if (expenseToEdit) {
      updateExpense(newExpense, expenseToEdit.index);
    } else {
      setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    }

    setAmount("");
    setDate("");
    setCategory("");
    setErrorMessage(""); // Clear any previous error message
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      addCategory(newCategory);
      setNewCategory("");
    }
  };

  return (
    <div className="expense-form">
      <form onSubmit={handleSubmit}>
        <h2>{expenseToEdit ? "Edit Expense" : "Add New Expense"}</h2>
        <div className="form-row">
          <div className="form-row-inline">
            <div className="form-group">
              <label>Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="$ Enter amount"
                required
              />
            </div>

            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Category</label>
            <div className="category-select">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="new-category-container">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="New Category"
            />
            <button type="button" onClick={handleAddCategory}>
              Add Category
            </button>
          </div>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}{" "}
        {/* Error Message Display */}
        <div className="form-footer">
          <button type="submit">
            {expenseToEdit ? "Update Expense" : "Add Expense"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
