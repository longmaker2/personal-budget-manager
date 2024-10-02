import React, { useState, useEffect } from "react";
import "../App.css";

/**
 * ExpenseForm Component
 *
 * This component handles adding and editing expenses. It contains input fields for
 * entering the amount, date, and category of the expense. It also allows users to add
 * a new category dynamically.
 *
 * @param {Function} setExpenses - Function to update the list of expenses.
 * @param {Array} categories - Array of existing categories to choose from.
 * @param {Function} addCategory - Function to add a new category to the list.
 * @param {Object|null} expenseToEdit - If an expense is being edited, this contains the
 *                                     details of the expense. Otherwise, it's null.
 * @param {Function} updateExpense - Function to update an existing expense in the list.
 */
const ExpenseForm = ({
  setExpenses,
  categories,
  addCategory,
  expenseToEdit,
  updateExpense,
}) => {
  // State variables to hold form input values
  const [amount, setAmount] = useState(""); // Stores the expense amount
  const [date, setDate] = useState(""); // Stores the expense date
  const [category, setCategory] = useState(""); // Stores the selected category
  const [newCategory, setNewCategory] = useState(""); // Stores the new category input value

  /**
   * useEffect Hook
   *
   * This hook runs when `expenseToEdit` changes. If an expense is being edited, it pre-populates
   * the form with the existing expense details (amount, date, and category).
   */
  useEffect(() => {
    if (expenseToEdit) {
      setAmount(expenseToEdit.amount); // Set amount to the value of the expense being edited
      setDate(expenseToEdit.date); // Set date to the value of the expense being edited
      setCategory(expenseToEdit.category); // Set category to the value of the expense being edited
    }
  }, [expenseToEdit]); // Only re-run the effect if expenseToEdit changes

  /**
   * handleSubmit Function
   *
   * Handles the form submission. It either adds a new expense or updates an existing one.
   * After submission, the form fields are cleared.
   *
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Create a new expense object from the form values
    const newExpense = { amount: parseFloat(amount), date, category };

    if (expenseToEdit) {
      // If an expense is being edited, update the existing expense
      updateExpense(newExpense, expenseToEdit.index);
    } else {
      // Otherwise, add the new expense to the expenses list
      setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    }

    // Clear the form fields after submission
    setAmount("");
    setDate("");
    setCategory("");
  };

  /**
   * handleAddCategory Function
   *
   * Adds a new category to the list of categories. Clears the input field once the new
   * category is added.
   */
  const handleAddCategory = () => {
    if (newCategory.trim()) {
      // Only add the category if the input is not empty or whitespace
      addCategory(newCategory);
      setNewCategory(""); // Clear the input field after adding the category
    }
  };

  return (
    <div className="expense-form">
      <form onSubmit={handleSubmit}>
        <h2>{expenseToEdit ? "Edit Expense" : "Add New Expense"}</h2>

        {/* Form input fields */}
        <div className="form-row">
          {/* Amount and Date fields, displayed side by side */}
          <div className="form-row-inline">
            <div className="form-group">
              <label>Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)} // Update state when input changes
                placeholder="Enter amount"
                required
              />
            </div>

            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)} // Update state when input changes
                required
              />
            </div>
          </div>

          {/* Category selection field */}
          <div className="form-group">
            <label>Category</label>
            <div className="category-select">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)} // Update state when input changes
                required
              >
                <option value="">Select Category</option>
                {/* Dynamically render categories from the list */}
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* New Category input field and button, displayed side by side */}
          <div className="new-category-container">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)} // Update state when input changes
              placeholder="New Category"
            />
            <button
              type="button"
              style={{ marginTop: "0" }}
              onClick={handleAddCategory} // Handle adding a new category
            >
              Add Category
            </button>
          </div>
        </div>

        {/* Submit button for adding or updating expense */}
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
