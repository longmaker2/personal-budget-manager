import React, { useState, useEffect } from "react";
import "../styles/ExpenseForm.css";

/**
 * ExpenseForm Component
 *
 * This component handles the form to add or edit expenses. It includes fields for amount, date, category,
 * and allows adding new categories. It also checks for category budget limits and displays error messages accordingly.
 *
 * Props:
 * - setExpenses: Function to update the list of expenses.
 * - categories: Array of categories to choose from.
 * - addCategory: Function to add a new category.
 * - expenseToEdit: Object representing the expense being edited (if any).
 * - updateExpense: Function to update an existing expense.
 * - handleCategoryLimitReached: Function to handle actions when category budget limit is reached.
 * - categoryBudgets: Object storing budget limits for each category.
 * - categoryTotals: Object storing total expenses for each category.
 */
const ExpenseForm = ({
  setExpenses,
  categories,
  addCategory,
  expenseToEdit,
  updateExpense,
  handleCategoryLimitReached,
  categoryBudgets,
  categoryTotals,
}) => {
  // States to manage form inputs and error message
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * useEffect to populate the form fields with data when editing an expense.
   * It updates the state variables (amount, date, category) when an expense to edit is passed as a prop.
   */
  useEffect(() => {
    if (expenseToEdit) {
      setAmount(expenseToEdit.amount);
      setDate(expenseToEdit.date);
      setCategory(expenseToEdit.category);
    }
  }, [expenseToEdit]);

  /**
   * Handles form submission for adding or editing an expense.
   * It checks the category budget limits before adding a new expense.
   *
   * @param {Object} e - The form submission event
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    const categoryBudget = categoryBudgets[category] || 100; // Default budget is 100 if not set
    const categorySpent = categoryTotals[category] || 0;
    const newExpenseAmount = parseFloat(amount);

    // Check if the new expense exceeds the category budget
    if (categorySpent + newExpenseAmount > categoryBudget) {
      setErrorMessage(
        `You cannot add more expenses to ${category} category, limit reached.`
      );
      handleCategoryLimitReached(category);
      return;
    }

    // Create a new expense object
    const newExpense = { amount: newExpenseAmount, date, category };

    // Update an existing expense if in edit mode, otherwise add a new one
    if (expenseToEdit) {
      updateExpense(newExpense, expenseToEdit.index);
    } else {
      setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    }

    // Clear form fields and error message after submission
    setAmount("");
    setDate("");
    setCategory("");
    setErrorMessage("");
  };

  /**
   * Adds a new category to the list when the "Add Category" button is clicked.
   * It clears the newCategory state after adding the category.
   */
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
            {/* Input for amount */}
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

            {/* Input for date */}
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

          {/* Select dropdown for category */}
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

          {/* Input field and button for adding a new category */}
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

        {/* Display error message when category budget is exceeded */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* Submit button to add or update expense */}
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
