document.addEventListener("DOMContentLoaded", displayCart);

// ---------------Récupérattion des données dans le local storage------------------//
let cart = [];
let productsCart = Storage.getProducts();
cart = productsCart;

function displayCart() {
	// ------------Affichage des produits----------//
	cart.forEach((product) => {
		displayRow(product);
	});

	// ---------Gestion des quantites----------//
	let quantityInputs = document.getElementsByClassName("cart-quantity-input");
	for (let i = 0; i < quantityInputs.length; i++) {
		let input = quantityInputs[i];
		input.addEventListener("change", quantityChanged);
	}

	// ---------------------- REMOVE EVENT------------------------//
	let removeCartItemButtons = Array.from(document.querySelectorAll(".btn-remove"));
	for (let i = 0; i < removeCartItemButtons.length; i++) {
		let button = removeCartItemButtons[i];
		button.addEventListener("click", removeCartItem);
	}
}

function displayRow(product) {
	const row = document.createElement("tr");
	row.classList.add("cart-row");
	row.innerHTML += `
		<td class="cart-name">${product.name}</td>
    	<td>
			<img class="img-thumbnail  style="height=100px, width=100px";"  src=${product.imageUrl}>
		</td>
    	<td class="cart-price">${product.price / 100}€</td>
    	<td>
			<input id="productQuantity" class="cart-quantity-input" value="${
				product.qty
			}" type="number"  min="1" max="10" required id-data=${product.qty}>
    		<button class="btn-remove btn btn-danger btn-sm "  type="button">REMOVE</button>
		</td>
		<td class="text-center total-row ">€</td>
		`;
	const list = document.querySelector("#item-list");
	// ajout de l'element
	list.appendChild(row);
	updateCartTotal();
	// ecoute des evenements sur l'element
	row.getElementsByClassName("btn-danger")[0].addEventListener("click", removeCartItem);
	row.getElementsByClassName("cart-quantity-input")[0].addEventListener("change", quantityChanged);
}

function quantityChanged(event) {
	let input = event.target;
	if (isNaN(input.value) || input.value <= 0) {
		input.value = 1;
	}
	updateCartTotal();
}

function removeCartItem(event) {
	// removeCartItem(i);
	const buttonClicked = event.target;
	if (confirm("Voulez-vous enlever ce produit?")) {
		buttonClicked.parentElement.parentElement.remove();

		// récupération du nom pour comparaison avec le local storage et supression dans le local
		const productName =
			event.target.parentElement.parentElement.firstChild.nextElementSibling.innerHTML;
		// Suppression de l'item dans le local Storage
		cart.forEach((item, index) => {
			if (item.name === productName) {
				cart.splice(index, 1);
			}
		});
		localStorage.setItem("productsCart", JSON.stringify(cart));
		updateCartTotal();
	} else {
		alert("Produit toujours dans le panier");
	}
}
function updateCartTotal() {
	const cartRows = document.getElementsByClassName("cart-row");
	const totalPriceElt = document.getElementById("total-price");
	let totalPrice = 0;
	for (let i = 0; i < cartRows.length; i++) {
		let cartRow = cartRows[i];
		const priceElt = cartRow.querySelector(".cart-price");
		price = parseFloat(priceElt.innerText.replace("€", ""));
		const qtyElt = cartRow.querySelector(".cart-quantity-input");
		quantity = qtyElt.value;
		const totalRowElt = cartRow.querySelector(".total-row");
		totalRow = price * quantity;
		totalRowElt.innerText = totalRow + "€";
		totalPrice = totalPrice + totalRow;
	}
	totalPriceElt.innerText = totalPrice + "€";
	localStorage.setItem("totalOrder", JSON.stringify(totalPrice));
}
// // *******************************************FORM******************************************

// // ********************************check********************************
//  déclaration des variables
const form = document.getElementById("form");
const btnSubmit = document.getElementById("confirm");

const lastName = document.querySelector("#last-name");
const firstName = document.querySelector("#first-name");
const address = document.querySelector("#address");
const zipCode = document.querySelector("#zip-code");
const city = document.querySelector("#city");
const email = document.querySelector("#email");

form.addEventListener("submit", (e) => {
	e.preventDefault();
	// console.log("clicked");
	checkInputs();
	send();
});
//  Cette partie peut être traitée avec l'API Validation
function checkInputs() {
	// 	// get the values from the imputs
	const firstNameValue = firstName.value.trim();
	const lastNameValue = lastName.value.trim();
	const addressValue = address.value;
	const zipCodeValue = zipCode.value.trim();
	const cityValue = city.value;
	const emailValue = email.value;

	if (firstNameValue === "") {
		setErrorFor(firstName, "Veuillez remplir le champ");
	} else if (!isFirstName(firstNameValue)) {
		setErrorFor(firstName, "Veuillez entrer un prénom valide");
	} else {
		setSuccessFor(firstName);
	}

	if (lastNameValue === "") {
		setErrorFor(lastName, "Veuillez remplir le champ");
	} else if (!isLastName(lastNameValue)) {
		setErrorFor(lastName, "Veuillez entrer un nom valide");
	} else {
		setSuccessFor(lastName);
	}

	if (addressValue === "") {
		setErrorFor(address, "Veuillez remplir le champ");
	} else {
		setSuccessFor(address);
	}

	if (zipCodeValue === "") {
		setErrorFor(zipCode, "Veuillez remplir le champ");
	} else if (!isZipCode(zipCodeValue)) {
		setErrorFor(zipCode, "Veuillez entrer un code postal valide");
	} else {
		setSuccessFor(zipCode);
	}
	if (cityValue === "") {
		setErrorFor(city, "Veuillez remplir le champ");
	} else {
		setSuccessFor(city);
	}
	const contact = {
		lastName: lastNameValue,
		firstName: firstNameValue,
		address: addressValue,
		zipCode: zipCodeValue,
		city: cityValue,
		email: emailValue,
	};
	localStorage.setItem("contact", JSON.stringify(contact));
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = "form-control success";
}
function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector("small");
	// add error message inside small
	small.innerText = message;
	formControl.className = "form-control error";
}

function isFirstName(firstName) {
	return /^[A-Za-z]{3,20}$/.test(firstName);
}
function isLastName(lastName) {
	return /^[A-Za-z]{3,20}$/.test(lastName);
}
function isAddress(address) {
	return /^[0-9a-zA-Z]+$/.test(address);
}
function isZipCode(zipCode) {
	return /^[0-9]+$/.test(zipCode);
}
function isCity(city) {
	return /^[0-9a-zA-Z]+$/.test(city);
}
function isEmail(email) {
	return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
		email
	);
}

function send() {
	products = JSON.parse(localStorage.getItem("productsCart"));
	products = Object.values(products).map((product) => {
		return product._id;
	});
	console.log(products);
	contact = JSON.parse(localStorage.getItem("contact"));
	const order = { contact, products };
	console.log(order);

	fetch("http://localhost:3000/api/teddies/order", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ contact, products }),
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			console.log(data.orderId);
			let orderId = data.orderId;
			localStorage.setItem("orderConfirmation", orderId);
			window.location.href = "confirmation.html";
		});
}
