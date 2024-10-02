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
import "../styles/ExpenseSummary.css"; // Updated path to the component-specific CSS

// Register required Chart.js components
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
 * This component provides a visual summary of the user's expenses using a pie chart.
 * It also displays the total expenses, remaining balance, and the percentage of the budget used.
 *
 * @param {Array} expenses - List of expense objects.
 * @param {number} budgetLimit - The budget limit set by the user.
 * @param {number} totalExpenses - The total sum of all expenses.
 * @param {number} balance - The remaining balance after expenses are deducted from income.
 */
const ExpenseSummary = ({
  expenses,
  budgetLimit,
  totalExpenses = 0,
  balance = 0,
}) => {
  // Format the total expenses and balance to two decimal places for display
  const formattedTotalExpenses = Number(totalExpenses).toFixed(2);
  const formattedBalance = Number(balance).toFixed(2);

  // Extract unique categories from the list of expenses for labeling the pie chart
  const categories = [...new Set(expenses.map((expense) => expense.category))];

  // Chart data: calculates the total expense for each category
  const data = {
    labels: categories, // Pie chart labels
    datasets: [
      {
        label: "Expenses by Category",
        // Sum expenses for each category
        data: categories.map((category) =>
          expenses
            .filter((expense) => expense.category === category)
            .reduce((acc, curr) => acc + curr.amount, 0)
        ),
        // Assign different colors for each category
        backgroundColor: [
          "#dc3545",
          "#0056b3",
          "#28a745",
          "#36A2EB",
          "#8B4513",
          "#FF6384",
          "#9966FF",
          "#4BC0C0",
          "#FF9F40",
          "#C71585",
          "#FFD700",
          "#FF69B4",
          "#FF8C00",
          "#FF1493",
        ],
      },
    ],
  };

  // Chart options: ensures the chart is responsive and well-positioned
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows for a custom width/height
    plugins: {
      legend: {
        position: "top", // Position the legend at the top of the chart
      },
    },
  };

  // Calculate the percentage of the budget used for expenses
  const expensePercentage = Math.min(
    ((totalExpenses / budgetLimit) * 100).toFixed(2),
    100 // Ensure the percentage does not exceed 100%
  );

  // Determine the progress bar and warning message class based on the percentage used
  let progressBarClass = "progress-green"; // Default is green
  let warningMessageClass = ""; // Default has no warning

  if (expensePercentage >= 100) {
    progressBarClass = "progress-red"; // If the user reaches 100% or more, make it red
    warningMessageClass = "warning-red"; // Apply the red warning class
  } else if (expensePercentage >= 75) {
    progressBarClass = "progress-orange"; // If the user is over 75% but less than 100%, make it orange
    warningMessageClass = "warning-orange"; // Apply the orange warning class
  }

  return (
    <div className="expense-summary">
      <h2>Expense Summary</h2>

      {/* Pie chart displaying the breakdown of expenses by category */}
      <div className="chart-container">
        <Pie data={data} options={options} />
      </div>

      {/* Display budget-related information */}
      <div className="budget-info">
        <h3>Budget Limit: ${Number(budgetLimit).toFixed(2)}</h3>

        {/* Progress bar showing the percentage of the budget used */}
        <progress
          value={totalExpenses}
          max={budgetLimit}
          className={`budget-progress ${progressBarClass}`}
        ></progress>

        {/* Warning message for nearing or exceeding budget */}
        {expensePercentage >= 75 && (
          <p className={`warning-message ${warningMessageClass}`}>
            {expensePercentage >= 100
              ? "You have reached your budget limit!"
              : "Warning: You are nearing your budget limit!"}
          </p>
        )}

        {/* Display the percentage of the budget spent */}
        <p>{expensePercentage}% of your budget spent</p>

        {/* Total expenses */}
        <p>Total Expenses: ${formattedTotalExpenses}</p>
      </div>

      {/* Centered remaining balance */}
      <div className="balance-container">
        <h2>Remaining Balance: ${formattedBalance}</h2>
      </div>
    </div>
  );
};

export default ExpenseSummary;
