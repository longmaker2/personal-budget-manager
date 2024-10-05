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
 * It includes a pie chart showing the distribution of expenses by category, and
 * details such as total expenses, remaining balance, and budget usage.
 *
 * @param {Array} expenses - Array of expense objects.
 * @param {number} budgetLimit - The total budget limit.
 * @param {number} totalExpenses - The total amount of expenses.
 * @param {number} balance - The remaining balance after expenses.
 */
const ExpenseSummary = ({
  expenses,
  budgetLimit,
  totalExpenses = 0,
  balance = 0,
}) => {
  const formattedTotalExpenses = Number(totalExpenses).toFixed(2);
  const formattedBalance = Number(balance).toFixed(2);

  const categories = [...new Set(expenses.map((expense) => expense.category))];

  const data = {
    labels: categories,
    datasets: [
      {
        label: "Expenses by Category",
        data: categories.map((category) =>
          expenses
            .filter((expense) => expense.category === category)
            .reduce((acc, curr) => acc + curr.amount, 0)
        ),
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

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const expensePercentage = Math.min(
    ((totalExpenses / budgetLimit) * 100).toFixed(2),
    100
  );

  let progressBarClass = "progress-green";
  let warningMessageClass = "";

  if (expensePercentage >= 100) {
    progressBarClass = "progress-red";
    warningMessageClass = "warning-red";
  } else if (expensePercentage >= 75) {
    progressBarClass = "progress-orange";
    warningMessageClass = "warning-orange";
  }

  return (
    <div className="expense-summary">
      <h2>Expense Summary</h2>

      <div className="chart-container">
        <Pie data={data} options={options} />
      </div>

      <div className="budget-info">
        <h3>Budget Limit: ${Number(budgetLimit).toFixed(2)}</h3>

        <progress
          value={totalExpenses}
          max={budgetLimit}
          className={`budget-progress ${progressBarClass}`}
        ></progress>

        {expensePercentage >= 75 && (
          <p className={`warning-message ${warningMessageClass}`}>
            {expensePercentage >= 100
              ? "You have reached your budget limit!"
              : "Warning: You are nearing your budget limit!"}
          </p>
        )}

        <p>{expensePercentage}% of your budget spent</p>
        <p>Total Expenses: ${formattedTotalExpenses}</p>
      </div>

      <div className="balance-container">
        <h2>Remaining Balance: ${formattedBalance}</h2>
      </div>
    </div>
  );
};

export default ExpenseSummary;
