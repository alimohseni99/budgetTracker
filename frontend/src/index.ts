document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("addBtn") as HTMLButtonElement;
  const div = document.getElementById("form") as HTMLDivElement;

  if (addButton) {
    addButton.addEventListener("click", () => {
      const newTextField = document.createElement("input");
      newTextField.type = "text";
      newTextField.id = "amount";
      newTextField.placeholder = "Enter Amount";
      div.appendChild(newTextField);
    });
  } else {
    console.error("Button not found.");
  }
});

async function sendBudget() {
  try {
    const reposnse = await fetch("http://localhost:3000/count", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        budget: 1000,
        transactions: [100, 200, 300],
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
