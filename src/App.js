import React, { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseSummary from "./components/ExpenseSummary";
import jsPDF from "jspdf"; // Import jsPDF for PDF export
import { saveAs } from "file-saver"; // Import saveAs for DOCX export
import { Document, Packer, Paragraph } from "docx"; // Import docx tools for DOCX export
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const [budgetLimit, setBudgetLimit] = useState(() => {
    const savedBudgetLimit = localStorage.getItem("budgetLimit");
    return savedBudgetLimit ? parseFloat(savedBudgetLimit) : 500;
  });

  const [categoryBudgets, setCategoryBudgets] = useState(() => {
    const savedCategoryBudgets = localStorage.getItem("categoryBudgets");
    return savedCategoryBudgets ? JSON.parse(savedCategoryBudgets) : {};
  });

  const [income, setIncome] = useState(() => {
    const savedIncome = localStorage.getItem("income");
    return savedIncome ? parseFloat(savedIncome) : 1000;
  });

  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem("categories");
    return savedCategories
      ? JSON.parse(savedCategories)
      : ["Food", "Transport", "Rent"];
  });

  const [expenseToEdit, setExpenseToEdit] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editedCategoryLimit, setEditedCategoryLimit] = useState("");
  const [categoryWarnings, setCategoryWarnings] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    return storedAuth ? JSON.parse(storedAuth) : false;
  });
  const [loggedInUser, setLoggedInUser] = useState(() => {
    return localStorage.getItem("loggedInUser") || "";
  });
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("budgetLimit", budgetLimit);
  }, [budgetLimit]);

  useEffect(() => {
    localStorage.setItem("income", income);
  }, [income]);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem("categoryBudgets", JSON.stringify(categoryBudgets));
  }, [categoryBudgets]);

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  const handleLogin = (identifier, password) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = storedUsers.find(
      (user) =>
        (user.username === identifier || user.email === identifier) &&
        user.password === password
    );
    if (userExists) {
      setIsAuthenticated(true);
      setLoggedInUser(userExists.username); // Store the username of the logged-in user
      localStorage.setItem("loggedInUser", userExists.username); // Persist it to localStorage
    } else {
      alert("Invalid username/email or password");
    }
  };

  const handleRegister = (username, email, password) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = storedUsers.find(
      (user) => user.username === username || user.email === email
    );

    if (!userExists) {
      const newUser = { username, email, password };
      storedUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(storedUsers));
      setIsLogin(true);
      alert("Registration successful! Please log in.");
    } else {
      alert("Username or email already exists");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoggedInUser("");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("loggedInUser");
  };

  const totalExpenses = expenses.reduce(
    (acc, expense) => acc + parseFloat(expense.amount || 0),
    0
  );
  const balance = income - totalExpenses;

  const categoryTotals = categories.reduce((totals, category) => {
    totals[category] = expenses
      .filter((expense) => expense.category === category)
      .reduce((acc, expense) => acc + parseFloat(expense.amount || 0), 0);
    return totals;
  }, {});

  const alertMessage =
    totalExpenses >= budgetLimit
      ? "Warning: You have reached or exceeded your overall budget limit!"
      : "";

  const handleEditExpense = (index, updatedExpense) => {
    const updatedExpenses = expenses.map((expense, i) =>
      i === index ? updatedExpense : expense
    );
    setExpenses(updatedExpenses);
  };

  const handleDeleteExpense = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
  };

  const updateExpense = (updatedExpense, index) => {
    const updatedExpenses = expenses.map((expense, i) =>
      i === index ? updatedExpense : expense
    );
    setExpenses(updatedExpenses);
    setExpenseToEdit(null);
  };

  const handleBudgetChange = (e) => {
    setBudgetLimit(parseFloat(e.target.value) || 0);
  };

  const handleIncomeChange = (e) => {
    setIncome(parseFloat(e.target.value) || 0);
  };

  const addCategory = (newCategory) => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
    }
  };

  const deleteCategory = (categoryToDelete) => {
    const updatedCategories = categories.filter(
      (category) => category !== categoryToDelete
    );
    setCategories(updatedCategories);

    const updatedCategoryBudgets = { ...categoryBudgets };
    delete updatedCategoryBudgets[categoryToDelete];
    setCategoryBudgets(updatedCategoryBudgets);

    const updatedExpenses = expenses.filter(
      (expense) => expense.category !== categoryToDelete
    );
    setExpenses(updatedExpenses);
  };

  const handleCategoryBudgetSubmit = (category) => {
    setCategoryBudgets((prevBudgets) => ({
      ...prevBudgets,
      [category]: parseFloat(editedCategoryLimit),
    }));
    setEditingCategory(null);
    setEditedCategoryLimit("");
  };

  const getProgressBarClass = (percentage) => {
    if (percentage >= 100) return "progress-red";
    if (percentage >= 75) return "progress-orange";
    return "progress-green";
  };

  const getWarningMessageClass = (percentage) => {
    if (percentage >= 100) return "warning-red";
    if (percentage >= 75) return "warning-orange";
    return "warning-green";
  };

  const handleCategoryLimitReached = (category) => {
    setCategoryWarnings((prevWarnings) => ({
      ...prevWarnings,
      [category]: `You have reached your limit for ${category}. Please do not add more expenses!`,
    }));
  };

  const exportToCSV = () => {
    const csvContent = `data:text/csv;charset=utf-8,Date,Category,Amount\n${expenses
      .map((expense) => `${expense.date},${expense.category},${expense.amount}`)
      .join("\n")}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Expense List", 10, 10);
    let y = 20;
    expenses.forEach((expense, index) => {
      doc.text(
        `${index + 1}. Date: ${expense.date}, Category: ${
          expense.category
        }, Amount: $${expense.amount}`,
        10,
        y
      );
      y += 10;
    });
    doc.save("expenses.pdf");
  };

  const exportToDOCX = async () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              text: "Expense List",
              heading: "Title",
            }),
            ...expenses.map(
              (expense, index) =>
                new Paragraph({
                  text: `${index + 1}. Date: ${expense.date}, Category: ${
                    expense.category
                  }, Amount: $${expense.amount}`,
                })
            ),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "expenses.docx");
  };

  if (!isAuthenticated) {
    return isLogin ? (
      <Login onLogin={handleLogin} toggleView={() => setIsLogin(false)} />
    ) : (
      <Register
        onRegister={handleRegister}
        toggleView={() => setIsLogin(true)}
      />
    );
  }

  return (
    <div className="app">
      <div className="header">
        <h1>Personal Budget Manager</h1>
        <div className="user-info">
          <span>Welcome, {loggedInUser}!</span>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>

      {alertMessage && <div className="alert">{alertMessage}</div>}

      <div className="budget-container">
        <div>
          <label>Set Income: </label>
          <input
            type="number"
            value={income}
            onChange={handleIncomeChange}
            min="0"
            placeholder="$"
          />
        </div>

        <div>
          <label>Set Overall Budget Limit: </label>
          <input
            type="number"
            value={budgetLimit}
            onChange={handleBudgetChange}
            min="0"
            placeholder="$"
          />
        </div>
      </div>

      {categories.map((category) => {
        const categorySpent = categoryTotals[category];
        const categoryBudget = categoryBudgets[category] || 100;
        const categoryPercentage = Math.min(
          ((categorySpent / categoryBudget) * 100).toFixed(2),
          100
        );

        return (
          <div key={category} className="category-budget">
            <div className="category-header">
              <h4>{category} Budget</h4>
              {editingCategory === category ? (
                <button onClick={() => handleCategoryBudgetSubmit(category)}>
                  Save
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setEditingCategory(category);
                      setEditedCategoryLimit(categoryBudgets[category] || "");
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => deleteCategory(category)}
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
            <p>
              ${categorySpent} /{" "}
              {editingCategory === category ? (
                <input
                  type="number"
                  value={editedCategoryLimit}
                  onChange={(e) => setEditedCategoryLimit(e.target.value)}
                  placeholder={categoryBudget}
                />
              ) : (
                `$${categoryBudget}`
              )}{" "}
              ({categoryPercentage}%)
            </p>
            <progress
              value={categorySpent}
              max={categoryBudget}
              className={`budget-progress ${getProgressBarClass(
                categoryPercentage
              )}`}
            ></progress>

            {categoryPercentage >= 75 && (
              <p
                className={`warning-message ${getWarningMessageClass(
                  categoryPercentage
                )}`}
              >
                {categoryPercentage >= 100
                  ? `You have reached your limit for ${category}!`
                  : `Warning: You are nearing the limit for ${category}!`}
              </p>
            )}

            {categoryWarnings[category] && (
              <p className="category-warning">{categoryWarnings[category]}</p>
            )}
          </div>
        );
      })}

      <ExpenseForm
        setExpenses={setExpenses}
        categories={categories}
        addCategory={addCategory}
        expenseToEdit={expenseToEdit}
        updateExpense={updateExpense}
        handleCategoryLimitReached={handleCategoryLimitReached}
        categoryBudgets={categoryBudgets}
        categoryTotals={categoryTotals}
      />
      <ExpenseList
        expenses={expenses}
        onEditExpense={handleEditExpense}
        onDeleteExpense={handleDeleteExpense}
        exportToCSV={exportToCSV}
        exportToPDF={exportToPDF}
        exportToDOCX={exportToDOCX}
      />
      <ExpenseSummary
        expenses={expenses}
        budgetLimit={budgetLimit}
        totalExpenses={totalExpenses}
        balance={balance}
        categoryBudgets={categoryBudgets}
        categoryTotals={categoryTotals}
      />
    </div>
  );
}

export default App;
