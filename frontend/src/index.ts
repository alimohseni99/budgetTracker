const amount = document.getElementsByClassName(
  "expenses"
) as HTMLCollectionOf<HTMLInputElement>;

const addButton = document.getElementById("addBtn") as HTMLButtonElement;

const div = document.getElementById("form") as HTMLDivElement;

const submitButton = document.getElementById("submitBtn") as HTMLButtonElement;

const income = document.getElementById("income") as HTMLInputElement;

const totalOfExpenses: number[] = [];

const userIncome = document.getElementById("userIncome") as HTMLInputElement;

document.addEventListener("DOMContentLoaded", () => {
  if (addButton) {
    addButton.addEventListener("click", () => {
      const newTextField = document.createElement("input");
      newTextField.type = "text";
      newTextField.className = "expenses";
      newTextField.placeholder = "Enter Amount";
      div.appendChild(newTextField);
    });
  } else {
    console.error("Button not found.");
  }
});

async function sendBudget() {
  //empty the array before adding a new value
  totalOfExpenses.length = 0;

  for (let i = 0; i < amount.length; i++) {
    totalOfExpenses.push(Number(amount[i].value));
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

if (submitButton) {
  submitButton.onclick = () => {
    sendBudget();
    userIncome.textContent = `Your income is: ${income.value}`;
  };
}
