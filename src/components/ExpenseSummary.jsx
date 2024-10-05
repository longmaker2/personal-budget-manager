import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title,
} from "chart.js";
import "../styles/ExpenseSummary.css";

// Register the necessary components from Chart.js
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title
);

/**
 * ExpenseSummary Component
 *
 * This component provides a visual and statistical summary of the user's expenses.
 * It includes a pie chart that visualizes the distribution of expenses by category,
 * as well as textual information such as total expenses, remaining balance, and the
 * percentage of the budget used.
 *
 * Props:
 * - expenses: Array of expense objects. Each expense should include 'amount' and 'category'.
 * - budgetLimit: The total budget limit set by the user.
 * - totalExpenses: The sum of all expenses (default: 0).
 * - balance: The remaining balance after expenses are deducted from the income (default: 0).
 */
const ExpenseSummary = ({
  expenses,
  budgetLimit,
  totalExpenses = 0,
  balance = 0,
}) => {
  // Format total expenses and remaining balance to two decimal places
  const formattedTotalExpenses = Number(totalExpenses).toFixed(2);
  const formattedBalance = Number(balance).toFixed(2);

  // Extract unique categories from the expenses array
  const categories = [...new Set(expenses.map((expense) => expense.category))];

  // Data for the pie chart: categories as labels, and amounts for each category
  const data = {
    labels: categories,
    datasets: [
      {
        label: "Expenses by Category",
        data: categories.map(
          (category) =>
            expenses
              .filter((expense) => expense.category === category)
              .reduce((acc, curr) => acc + curr.amount, 0) // Calculate total amount per category
        ),
        backgroundColor: [
          "#dc3545", // Red
          "#0056b3", // Blue
          "#28a745", // Green
          "#36A2EB", // Light Blue
          "#8B4513", // Brown
          "#FF6384", // Pink
          "#9966FF", // Purple
          "#4BC0C0", // Cyan
          "#FF9F40", // Orange
          "#C71585", // MediumVioletRed
          "#FFD700", // Gold
          "#FF69B4", // HotPink
          "#FF8C00", // DarkOrange
          "#FF1493", // DeepPink
        ],
      },
    ],
  };

  // Chart.js options for the pie chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top", // Position the legend at the top of the chart
      },
    },
  };

  // Calculate the percentage of the budget that has been spent
  const expensePercentage = Math.min(
    ((totalExpenses / budgetLimit) * 100).toFixed(2),
    100 // Cap the percentage at 100 to avoid overflow
  );

  // Determine the CSS class for the progress bar and warning message based on the percentage of the budget spent
  let progressBarClass = "progress-green"; // Default to green (safe budget)
  let warningMessageClass = "";

  if (expensePercentage >= 100) {
    progressBarClass = "progress-red"; // Red for exceeded budget
    warningMessageClass = "warning-red";
  } else if (expensePercentage >= 75) {
    progressBarClass = "progress-orange"; // Orange for nearing budget limit
    warningMessageClass = "warning-orange";
  }

  return (
    <div className="expense-summary">
      <h2>Expense Summary</h2>

      {/* Pie chart to visualize expenses by category */}
      <div className="chart-container">
        <Pie data={data} options={options} />
      </div>

      {/* Budget information: Total budget, percentage spent, and warnings if nearing/exceeding the limit */}
      <div className="budget-info">
        <h3>Budget Limit: ${Number(budgetLimit).toFixed(2)}</h3>

        {/* Progress bar showing the percentage of the budget that has been spent */}
        <progress
          value={totalExpenses}
          max={budgetLimit}
          className={`budget-progress ${progressBarClass}`}
        ></progress>

        {/* Warning messages when nearing or exceeding the budget limit */}
        {expensePercentage >= 75 && (
          <p className={`warning-message ${warningMessageClass}`}>
            {expensePercentage >= 100
              ? "You have reached your budget limit!"
              : "Warning: You are nearing your budget limit!"}
          </p>
        )}

        {/* Display the percentage of the budget spent */}
        <p>{expensePercentage}% of your budget spent</p>
        <p>Total Expenses: ${formattedTotalExpenses}</p>
      </div>

      {/* Display the remaining balance */}
      <div className="balance-container">
        <h2>Remaining Balance: ${formattedBalance}</h2>
      </div>
    </div>
  );
};

export default ExpenseSummary;
