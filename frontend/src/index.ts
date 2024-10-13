const userAmopunt = document.getElementsByClassName(
  "userExpenses"
) as HTMLCollectionOf<HTMLInputElement>;

const addButton = document.getElementById("addBtn") as HTMLButtonElement;

const div = document.getElementById("form") as HTMLDivElement;

const submitButton = document.getElementById("submitBtn") as HTMLButtonElement;

const income = document.getElementById("income") as HTMLInputElement;

const totalOfExpenses: number[] = [];

const userIncome = document.getElementById("userIncome") as HTMLInputElement;

const expensesList = document.getElementById("expensesList") as HTMLDivElement;

const totalOfSpending = document.getElementById(
  "expensesText"
) as HTMLDivElement;

const remainingBudget = document.getElementById(
  "remainingIncom"
) as HTMLDivElement;

document.addEventListener("DOMContentLoaded", () => {
  if (addButton) {
    addButton.addEventListener("click", () => {
      const newTextField = document.createElement("input");
      newTextField.type = "text";
      newTextField.className = "userExpenses";
      newTextField.placeholder = "Enter Expenses";
      div.appendChild(newTextField);
    });
  } else {
    console.error("Button not found.");
  }
});

async function sendBudget() {
  //empty the array before adding a new value
  totalOfExpenses.length = 0;

  for (let i = 0; i < userAmopunt.length; i++) {
    totalOfExpenses.push(Number(userAmopunt[i].value));
  }
  try {
    const reposnse = await fetch("http://localhost:3000/count", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        budget: income.value,
        transactions: totalOfExpenses,
      }),
    });
    if (!reposnse.ok) {
      throw new Error("Failed to send request.");
    }
    const data = await reposnse.json();
    console.log(data);
  } catch (e) {
    console.error(e);
  }
}

async function getTransactions() {
  try {
    const response = await fetch("http://localhost:3000/transactions");
    if (!response.ok) {
      throw new Error("Failed to fetch transactions.");
    }
    const data = await response.json();

    for (let i = 0; i < data.transactions.length; i++) {
      const transaction = document.createElement("p");
      transaction.textContent = `Transaction ${i + 1}: ${data.transactions[i]}`;
      expensesList.appendChild(transaction);
    }
  } catch (e) {
    console.error(e);
  }
}
async function getIncome() {
  try {
    const response = await fetch("http://localhost:3000/income");
    if (!response.ok) {
      throw new Error("Failed to fetch income.");
    }
    const data = await response.json();
    userIncome.textContent = `Your income is: ${data.budget}`;
  } catch (e) {
    console.error(e);
  }
}

async function getTotalOfSpending() {
  try {
    const response = await fetch("http://localhost:3000/TotalOfSpending");
    if (!response.ok) {
      throw new Error("Failed to fetch total of spending.");
    }
    const data = await response.json();
    totalOfSpending.textContent = `Total of spending: ${data.total}`;
    console.log(data);
  } catch (e) {
    console.error(e);
  }
}

async function getRemainingBudget() {
  try {
    const response = await fetch("http://localhost:3000/remaining");
    if (!response.ok) {
      throw new Error("Failed to fetch remaining budget.");
    }
    const data = await response.json();
    remainingBudget.textContent = `Remaining budget: ${data.remaining}`;
    console.log(data);
  } catch (e) {
    console.error(e);
  }
}

if (submitButton) {
  submitButton.onclick = () => {
    sendBudget();
    userIncome.textContent = `Your income is: ${income.value}`;
    getTransactions();
    getIncome();
    getTotalOfSpending();
    getRemainingBudget();
  };
}
