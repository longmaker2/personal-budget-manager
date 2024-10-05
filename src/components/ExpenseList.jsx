import React, { useState } from "react";
import "../styles/ExpenseList.css";

const ExpenseList = ({
  expenses,
  onEditExpense,
  onDeleteExpense,
  exportToCSV,
  exportToPDF,
  exportToDOCX,
}) => {
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedAmount, setEditedAmount] = useState("");

  const sortedExpenses = [...expenses].sort((a, b) => {
    return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
  });

  const filteredExpenses =
    filterCategory === "All"
      ? sortedExpenses
      : sortedExpenses.filter((expense) => expense.category === filterCategory);

  const handleEditClick = (originalIndex) => {
    setEditingIndex(originalIndex);
    setEditedAmount(expenses[originalIndex].amount);
  };

  const handleSaveClick = (originalIndex) => {
    const updatedExpense = {
      ...expenses[originalIndex],
      amount: parseFloat(editedAmount),
    };
    onEditExpense(originalIndex, updatedExpense);
    setEditingIndex(null);
  };

  return (
    <div className="expense-list">
      <h2>Expenses</h2>

      <div className="filter-sort-container">
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

        <div>
          <label>Sort by Amount:</label>
          <select onChange={(e) => setSortOrder(e.target.value)}>
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>

      <ul>
        {filteredExpenses.map((expense, displayIndex) => {
          const originalIndex = expenses.findIndex((exp) => exp === expense);

          return (
            <li key={originalIndex}>
              <span>
                {expense.date} - {expense.category}: $
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
              {editingIndex === originalIndex ? (
                <button onClick={() => handleSaveClick(originalIndex)}>
                  Save
                </button>
              ) : (
                <button onClick={() => handleEditClick(originalIndex)}>
                  Edit
                </button>
              )}
              <button onClick={() => onDeleteExpense(originalIndex)}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>

      <div className="export-buttons">
        <button onClick={exportToCSV}>Export to CSV</button>
        <button onClick={exportToPDF}>Export to PDF</button>
        <button onClick={exportToDOCX}>Export to DOCX</button>
      </div>
    </div>
  );
};

export default ExpenseList;
