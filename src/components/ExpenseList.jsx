import React, { useState } from "react";
import "../styles/ExpenseList.css";

/**
 * ExpenseList Component
 *
 * This component displays a list of expenses, with options to filter by category,
 * sort by amount, and edit or delete individual expenses. It also provides buttons
 * to export the expense data to CSV, PDF, or DOCX formats.
 *
 * Props:
 * - expenses: Array of expense objects to display.
 * - onEditExpense: Function to handle editing an expense.
 * - onDeleteExpense: Function to handle deleting an expense.
 * - exportToCSV: Function to export expenses to CSV.
 * - exportToPDF: Function to export expenses to PDF.
 * - exportToDOCX: Function to export expenses to DOCX.
 */
const ExpenseList = ({
  expenses,
  onEditExpense,
  onDeleteExpense,
  exportToCSV,
  exportToPDF,
  exportToDOCX,
}) => {
  // State to manage the selected category for filtering and sort order
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc");

  // State to manage the index of the expense being edited and its updated amount
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedAmount, setEditedAmount] = useState("");

  /**
   * Sort the expenses based on the selected sort order (ascending or descending by amount).
   */
  const sortedExpenses = [...expenses].sort((a, b) => {
    return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
  });

  /**
   * Filter the sorted expenses based on the selected category.
   * If "All" is selected, show all expenses.
   */
  const filteredExpenses =
    filterCategory === "All"
      ? sortedExpenses
      : sortedExpenses.filter((expense) => expense.category === filterCategory);

  /**
   * Handles the click event to start editing a specific expense.
   * It sets the editing index to the selected expense's index and pre-fills the amount input with the expense's current amount.
   *
   * @param {number} originalIndex - The index of the expense to edit.
   */
  const handleEditClick = (originalIndex) => {
    setEditingIndex(originalIndex);
    setEditedAmount(expenses[originalIndex].amount);
  };

  /**
   * Handles saving the edited amount for the selected expense.
   * It updates the amount in the expenses array and then clears the editing state.
   *
   * @param {number} originalIndex - The index of the expense to save.
   */
  const handleSaveClick = (originalIndex) => {
    const updatedExpense = {
      ...expenses[originalIndex],
      amount: parseFloat(editedAmount),
    };
    onEditExpense(originalIndex, updatedExpense);
    setEditingIndex(null); // Exit edit mode after saving
  };

  return (
    <div className="expense-list">
      <h2>Expenses</h2>

      {/* Filter and sort options for expenses */}
      <div className="filter-sort-container">
        {/* Filter by category dropdown */}
        <div>
          <label>Filter by Category:</label>
          <select onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="All">All</option>
            {Array.from(
              new Set(expenses.map((expense) => expense.category))
            ).map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Sort by amount dropdown */}
        <div>
          <label>Sort by Amount:</label>
          <select onChange={(e) => setSortOrder(e.target.value)}>
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>

      {/* List of filtered and sorted expenses */}
      <ul>
        {filteredExpenses.map((expense, displayIndex) => {
          // Find the original index of the expense in the full array
          const originalIndex = expenses.findIndex((exp) => exp === expense);

          return (
            <li key={originalIndex}>
              <span>
                {expense.date} - {expense.category}: $
                {/* If the expense is being edited, show an input field for the amount */}
                {editingIndex === originalIndex ? (
                  <input
                    type="number"
                    value={editedAmount}
                    onChange={(e) => setEditedAmount(e.target.value)}
                  />
                ) : (
                  expense.amount.toFixed(2)
                )}
              </span>

              {/* Show Save or Edit button depending on whether the expense is being edited */}
              {editingIndex === originalIndex ? (
                <button onClick={() => handleSaveClick(originalIndex)}>
                  Save
                </button>
              ) : (
                <button onClick={() => handleEditClick(originalIndex)}>
                  Edit
                </button>
              )}

              {/* Delete button for each expense */}
              <button onClick={() => onDeleteExpense(originalIndex)}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>

      {/* Export buttons for CSV, PDF, and DOCX formats */}
      <div className="export-buttons">
        <button onClick={exportToCSV}>Export to CSV</button>
        <button onClick={exportToPDF}>Export to PDF</button>
        <button onClick={exportToDOCX}>Export to DOCX</button>
      </div>
    </div>
  );
};

export default ExpenseList;
