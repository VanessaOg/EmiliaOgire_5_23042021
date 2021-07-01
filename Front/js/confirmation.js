let confirmationId = document.getElementById("confirmationId");
console.log(confirmationId);
let orderConfirmation = localStorage.getItem("orderConfirmation");
console.log(orderConfirmation);
confirmationId.textContent = "" + orderConfirmation;
let totalOrder = document.getElementById("totalOrder");
totalOrder.textContent = "" + JSON.parse(localStorage.getItem("totalOrder")) + "€";

localStorage.removeItem("productsCart");
