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
import "../App.css";

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

  return (
    <div className="expense-summary">
      <h2>Expense Summary</h2>

      {/* Pie chart displaying the breakdown of expenses by category */}
      <div style={{ width: "400px", height: "400px", margin: "0 auto" }}>
        <Pie data={data} options={options} />
      </div>

      {/* Display budget-related information */}
      <div>
        <h3>Budget Limit: ${Number(budgetLimit).toFixed(2)}</h3>

        {/* Progress bar showing the percentage of the budget used */}
        <progress value={totalExpenses} max={budgetLimit}></progress>

        {/* Display the percentage of the budget spent */}
        <p>{expensePercentage}% of your budget spent</p>

        {/* Total expenses and remaining balance */}
        <p>Total Expenses: ${formattedTotalExpenses}</p>
        <p>Remaining Balance: ${formattedBalance}</p>
      </div>
    </div>
  );
};

export default ExpenseSummary;
