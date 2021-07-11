let confirmationId = document.getElementById("confirmationId");
let orderConfirmation = localStorage.getItem("orderConfirmation");
confirmationId.textContent = "" + orderConfirmation;
let totalOrder = document.getElementById("totalOrder");
totalOrder.textContent = "" + JSON.parse(localStorage.getItem("totalOrder")) + "€";

localStorage.removeItem("productsCart", "totalOrder", "orderConfirmation");
