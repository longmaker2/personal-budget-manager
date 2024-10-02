import React, { useState } from "react";
import "../App.css";

/**
 * ExpenseList Component
 *
 * This component displays a list of expenses and provides options to filter, sort, edit, and delete expenses.
 * It allows users to edit the amount of an expense directly in the list and save the changes.
 *
 * @param {Array} expenses - The list of expense objects to be displayed.
 * @param {Function} onEditExpense - Function to handle editing an expense.
 * @param {Function} onDeleteExpense - Function to handle deleting an expense.
 */
const ExpenseList = ({ expenses, onEditExpense, onDeleteExpense }) => {
  // State to manage filtering, sorting, and inline editing
  const [filterCategory, setFilterCategory] = useState("All"); // Stores the selected category filter
  const [sortOrder, setSortOrder] = useState("desc"); // Stores the sort order (ascending/descending)
  const [editingIndex, setEditingIndex] = useState(null); // Index of the expense currently being edited
  const [editedAmount, setEditedAmount] = useState(""); // Stores the edited amount for the inline editing

  /**
   * Sorts expenses based on the selected sort order (ascending or descending).
   */
  const sortedExpenses = [...expenses].sort((a, b) => {
    return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
  });

  /**
   * Filters expenses based on the selected category.
   * If "All" is selected, all expenses are shown; otherwise, only expenses from the selected category are displayed.
   */
  const filteredExpenses =
    filterCategory === "All"
      ? sortedExpenses
      : sortedExpenses.filter((expense) => expense.category === filterCategory);

  /**
   * handleEditClick Function
   *
   * When the "Edit" button is clicked, this function sets the current index for inline editing and pre-populates
   * the amount field with the current value.
   *
   * @param {Number} index - The index of the expense to be edited.
   */
  const handleEditClick = (index) => {
    setEditingIndex(index); // Set the index of the expense being edited
    setEditedAmount(expenses[index].amount); // Pre-populate the amount input with the existing value
  };

  /**
   * handleSaveClick Function
   *
   * When the "Save" button is clicked, this function updates the expense with the new amount and clears the editing state.
   *
   * @param {Number} index - The index of the expense to be updated.
   */
  const handleSaveClick = (index) => {
    const updatedExpense = {
      ...expenses[index], // Copy the existing expense data
      amount: parseFloat(editedAmount), // Update the amount with the new value
    };
    onEditExpense(index, updatedExpense); // Call the parent function to save the updated expense
    setEditingIndex(null); // Exit the editing mode
  };

  return (
    <div className="expense-list">
      <h2>Expenses</h2>

      {/* Filter and Sort Options */}
      <div className="filter-sort-container">
        <div>
          <label>Filter by Category:</label>
          <select onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="All">All</option>
            {/* Dynamically generate filter options based on unique categories from the expenses list */}
            {Array.from(
              new Set(expenses.map((expense) => expense.category))
            ).map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Sort by Amount:</label>
          <select onChange={(e) => setSortOrder(e.target.value)}>
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>

      {/* Expense List */}
      <ul>
        {filteredExpenses.map((expense, index) => (
          <li key={index}>
            <span>
              {expense.date} - {expense.category}: $
              {/* If the current item is being edited, show the input field, otherwise show the amount */}
              {editingIndex === index ? (
                <input
                  type="number"
                  value={editedAmount}
                  onChange={(e) => setEditedAmount(e.target.value)}
                />
              ) : (
                expense.amount.toFixed(2) // Format the amount to two decimal places
              )}
            </span>
            {/* If the current item is being edited, show the "Save" button, otherwise show the "Edit" button */}
            {editingIndex === index ? (
              <button onClick={() => handleSaveClick(index)}>Save</button>
            ) : (
              <button onClick={() => handleEditClick(index)}>Edit</button>
            )}
            {/* Delete button */}
            <button onClick={() => onDeleteExpense(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
