document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("addBtn") as HTMLButtonElement;
  const div = document.getElementById("form") as HTMLDivElement;

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
  const amount = document.getElementsByClassName(
    "expenses"
  ) as HTMLCollectionOf<HTMLInputElement>;

  const submitButton = document.getElementById(
    "submitBtn"
  ) as HTMLButtonElement;
  const totalOfExpenses: number[] = [];

  submitButton.addEventListener("click", () => {
    //empty the array before adding new values
    totalOfExpenses.length = 0;

    for (let i = 0; i < amount.length; i++) {
      totalOfExpenses.push(Number(amount[i].value));
    }
  });
  try {
    const reposnse = await fetch("http://localhost:3000/count", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        budget: 1000,
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

sendBudget();
