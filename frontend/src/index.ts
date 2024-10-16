const userAmount = document.getElementsByClassName(
  "userExpenses"
) as HTMLCollectionOf<HTMLInputElement>;

const addButton = document.getElementById("addBtn") as HTMLButtonElement;

const div = document.getElementById("form") as HTMLDivElement;

const submitButton = document.getElementById("submitBtn") as HTMLButtonElement;

const income = document.getElementById("income") as HTMLInputElement;

const totalOfExpenses: number[] = [];

const incomeDisplay = document.getElementById(
  "incomeDisplay"
) as HTMLInputElement;

const expensesList = document.getElementById("expensesList") as HTMLDivElement;

const totalOfSpendingDisplay = document.getElementById(
  "totalOfSpendingDisplay"
) as HTMLDivElement;

const remainingBudgetDisplay = document.getElementById(
  "remainingBudgetDisplay"
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

  for (let i = 0; i < userAmount.length; i++) {
    totalOfExpenses.push(Number(userAmount[i].value));
  }
  try {
    const response = await fetch("http://localhost:3000/count", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        budget: income.value,
        expenses: totalOfExpenses,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send request.");
    }
    const data = await response.json();
    incomeDisplay.textContent = `Your income is: ${data.budget}`;
    remainingBudgetDisplay.textContent = `Remaining budget: ${data.remainings}`;
    console.log(data);
  } catch (e) {
    console.error(e);
  }
}

async function getExpenses() {
  try {
    const response = await fetch("http://localhost:3000/expenses");
    if (!response.ok) {
      throw new Error("Failed to fetch transactions.");
    }
    const data = await response.json();

    expensesList.innerHTML = "";

    for (let i = 0; i < data.expenses.length; i++) {
      const transaction = document.createElement("p");
      transaction.textContent = `Transaction ${i + 1}: ${data.expenses[i]}`;
      expensesList.appendChild(transaction);
    }
  } catch (e) {
    console.error(e);
  } finally {
    income.value = "";
    income.placeholder = "Enter your income";
    for (let i = 0; i < userAmount.length; i++) {
      userAmount[i].value = "";
      userAmount[i].placeholder = "Enter Expenses";
    }
    submitButton.disabled = true;
    submitButton.textContent = "submit";
  }
}

async function getTotalOfSpending() {
  try {
    const response = await fetch("http://localhost:3000/TotalOfSpending");
    if (!response.ok) {
      throw new Error("Failed to fetch total of spending.");
    }
    const data = await response.json();
    totalOfSpendingDisplay.textContent = `Total of spending: ${data.total}`;
  } catch (e) {
    console.error(e);
  }
}

function validateBudgetInputs(): boolean {
  if (
    !income.value ||
    isNaN(Number(income.value)) ||
    Number(income.value) <= 0
  ) {
    alert("Invalid input, try again!");
    return false;
  }

  for (let i = 0; i < userAmount.length; i++) {
    if (
      !userAmount[i].value ||
      isNaN(Number(userAmount[i].value)) ||
      Number(userAmount[i].value) <= 0
    ) {
      alert("Invalid input, try again!");
      return false;
    }
  }
  return true;
}

if (submitButton) {
  submitButton.onclick = () => {
    if (validateBudgetInputs()) {
      submitButton.disabled = true;
      submitButton.textContent = "Submitting...";
      sendBudget();
      getExpenses();
      getTotalOfSpending();
    }
  };
}
