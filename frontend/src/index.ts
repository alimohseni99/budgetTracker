document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("addBtn") as HTMLButtonElement;
  const div = document.getElementById("form") as HTMLDivElement;
  const submitBtn = document.getElementById("submitBtn") as HTMLButtonElement;

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
