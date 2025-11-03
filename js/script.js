//Script for registering account, save user data locally
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById
        ('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        // Saving user data in local storage (for demo purposes only)
        localStorage.setItem('registeredUsername', username);
        localStorage.setItem('registeredEmail', email);
        localStorage.setItem('registeredPassword', password);

        alert('Registration successful! You can now log in.');
        // Redirect to login page
        window.location.href = 'login-page.html';
    });
}

//Script for logging in, check user data locally
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(event) {                                      
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        // User authentication, check account from local storage (for demo purposes only)
        const registeredUsername = localStorage.getItem('registeredUsername');
        const registeredPassword = localStorage.getItem('registeredPassword');
        if (username === registeredUsername && password === registeredPassword) {
            alert('Login successful! Welcome back, ' + username + '!');
            // Redirect to dashboard page
            window.location.href = 'index.html';
        } else {
            alert('Invalid username or password!');
        }                                           
    });
}

//Script for changing welcome text on dashboard
const welcomeText = document.getElementById('welcomeText');
if (welcomeText) {
    const registeredUsername = localStorage.getItem('registeredUsername');
    if (registeredUsername) {
        welcomeText.textContent = 'Welcome back, ' + registeredUsername + '!';
    }  
}

//Script to change the navbar header if user is logged in
const navHeader = document.getElementById('navHeader');
if (navHeader) {
    const registeredUsername = localStorage.getItem('registeredUsername');
    if (registeredUsername) {
        navHeader.textContent = 'Expense Tracker - ' + registeredUsername;
    }
}

// --- CURRENCY SWITCHER ---
const currencySelect = document.getElementById('currencySelect');
const totalAmount = document.getElementById('totalAmount');
const expenseTableBody = document.getElementById('expenseTableBody');

// Default or last selected currency
let currentCurrency = localStorage.getItem('selectedCurrency') || 'IDR';

// Example exchange rates (dummy values)
const exchangeRates = {
  IDR: { IDR: 1, USD: 0.000064, EUR: 0.000059 },
  USD: { IDR: 15600, USD: 1, EUR: 0.93 },
  EUR: { IDR: 17000, USD: 1.08, EUR: 1 },
};

// Function to convert currency
function convertCurrency(amount, from, to) {
  return amount * exchangeRates[from][to];
}

// Function to display all expenses
function displayExpenses() {
  const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  const baseCurrency = 'IDR'; // stored as IDR
  expenseTableBody.innerHTML = '';

  let total = 0;

  expenses.forEach((exp) => {
    const convertedAmount = convertCurrency(parseFloat(exp.amount), baseCurrency, currentCurrency);
    total += convertedAmount;

    const formattedAmount = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currentCurrency,
    }).format(convertedAmount);

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${exp.date}</td>
      <td>${exp.description}</td>
      <td>${formattedAmount}</td>
    `;
    expenseTableBody.appendChild(row);
  });

  // Update total
  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currentCurrency,
  }).format(total);
  totalAmount.textContent = formattedTotal;
}

// Run once at start
displayExpenses();

// When user changes currency
if (currencySelect) {
  currencySelect.value = currentCurrency;
  currencySelect.addEventListener('change', () => {
    currentCurrency = currencySelect.value;
    localStorage.setItem('selectedCurrency', currentCurrency);
    displayExpenses();
  });
}

//Add Expense Toggle Form
const addExpenseBtn = document.getElementById('addExpenseBtn');
const expenseFormContainer = document.getElementById('expenseFormContainer');
if (addExpenseBtn && expenseFormContainer) {
    addExpenseBtn.addEventListener('click', function() {
        if (expenseFormContainer.style.display === 'none' || expenseFormContainer.style.display === '') {
            expenseFormContainer.style.display = 'block';
        } else {
            expenseFormContainer.style.display = 'none';
        }

        // Save expense to local storage (for demo purposes only)
        const expenseForm = document.getElementById('expenseForm');
        expenseForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const expenseAmount = document.getElementById('expenseAmount').value;
            const expenseDate = document.getElementById('expenseDate').value;
            const expenseDescription = document.getElementById('expenseDescription').value;

            const expense = {
                date: expenseDate,
                description: expenseDescription,
                amount: expenseAmount
            };
            let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
            expenses.push(expense);
            localStorage.setItem('expenses', JSON.stringify(expenses));
            alert('Expense added successfully!');
            expenseForm.reset();
            expenseFormContainer.style.display = 'none';

            //Refresh the page to show the new expense in the table
            location.reload();
        });
    });
}

// Load expenses from local storage and display them in table from index.html
// Add currency symbol to the amount based on selected currency
// const expenseTableBody = document.getElementById('expenseTableBody');
// if (expenseTableBody) {
//     const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
//     const selectedCurrency = currencySelect ? currencySelect.value : 'IDR';
//     let currencySymbol = 'Rp ';
//     if (selectedCurrency === 'USD') {
//         currencySymbol = '$ ';
//     } else if (selectedCurrency === 'EUR') {
//         currencySymbol = '€ ';
//     }
//     expenses.forEach(function(expense) {
//         const row = document.createElement('tr');
//         const amountCell = document.createElement('td');
//         amountCell.textContent = currencySymbol + parseFloat(expense.amount).toFixed(2);
//         const dateCell = document.createElement('td');
//         dateCell.textContent = expense.date;
//         const descriptionCell = document.createElement('td');
//         descriptionCell.textContent = expense.description;
//         row.appendChild(dateCell);
//         row.appendChild(descriptionCell);
//         row.appendChild(amountCell);
//         expenseTableBody.appendChild(row);
//     });
//     // Automatically calculate total expenses from the list and display it
//     const totalAmount = document.getElementById('totalAmount');
//     let total = 0;
//     expenses.forEach(function(expense) {
//         total += parseFloat(expense.amount);
//     });
//     totalAmount.textContent = currencySymbol + total.toFixed(2);
// }
    