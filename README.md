# Personal Budget Manager

A **Personal Budget Manager** built with React to track expenses, manage budgets, and display an overview of the user's spending. The application allows users to add, edit, and delete expenses, categorize their spending, and view a visual summary of their expenses against their set budget limit.

## Features

- **Add/Edit/Delete Expenses:** Users can add new expenses, update existing ones, or delete them.
- **Category Management:** Users can select a category for each expense and add new categories as needed.
- **Budget Limit:** Set a budget limit and get notified if your total expenses exceed the limit.
- **Visual Expense Summary:** A visual bar chart displays the breakdown of expenses by category.
- **Responsive Design:** The app is fully responsive and works well on both desktop and mobile devices.

## Tech Stack

- **React**: Frontend library for building user interfaces.
- **Chart.js**: Used to create visual expense summaries.
- **CSS3**: For styling the application.
- **LocalStorage**: To store expenses, income, and categories data locally on the user's browser.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/personal-budget-manager.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd personal-budget-manager
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Start the development server:**

   ```bash
   npm start
   ```

5. **Open the application in the browser:**

   ```bash
   localhost:3000
   ```

## Usage

- **Add an expense:** Select the category, enter the amount, and add the expense.
- **Edit an expense:** Update the amount and save the changes.
- **Delete an expense:** Delete the expense.
- **Budget limit:** Set a budget limit and get notified if your total expenses exceed the limit.
- **View expense summary:** View a visual summary of your expenses against your budget limit.

## Project Structure

```bash
├── public
│   ├── index.html
│   └── ...
├── src
│   ├── components
│   │   ├── ExpenseForm.jsx
│   │   ├── ExpenseList.jsx
│   │   └── ExpenseSummary.jsx
│   ├── styles
│   │   ├── ExpenseForm.css
│   │   ├── ExpenseList.css
│   │   └── ExpenseSummary.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Dependencies

- [Chart.js](https://www.npmjs.com/package/chart.js)
- [React](https://www.npmjs.com/package/react)
- [React Chart.js 2](https://www.npmjs.com/package/react-chartjs-2)
- [Poppins](https://fonts.google.com/specimen/Poppins)

## Acknowoledgements

- [React Chart.js 2](https://www.npmjs.com/package/react-chartjs-2)
- [Chart.js](https://www.chartjs.org/)
- [Poppins](https://fonts.google.com/specimen/Poppins)

## Author

- [Long Maker Long Deng](https://github.com/longmaker2)
