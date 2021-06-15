document.addEventListener("DOMContentLoaded", displayCart);

function displayCart() {
	const cart = getProducts();
	console.log(cart);
	cart.forEach((product) => {
		printCart(product);
	});

	//  REMOVE EVENT
	const removeCartItemButtons = document.getElementsByClassName("btn-remove");
	console.log(removeCartItemButtons);
	for (let i = 0; i < removeCartItemButtons.length; i++) {
		let button = removeCartItemButtons[i];
		button.addEventListener("click", removeCartItem);
	}

	// QUANTITY INPUTS
	const quantityInputs = document.getElementsByClassName("cart-quantity-input");
	for (let i = 0; i < quantityInputs.length; i++) {
		let input = quantityInputs[i];
		input.addEventListener("change", quantityChanged);
	}
}

// ************************************* UI FUNCTIONS CALLED**************************************

// Print Cart
function printCart(product) {
	const list = document.getElementById("item-list");
	const row = document.createElement("tr");
	row.classList.add("cart-row");
	row.innerHTML += `
    <td class="cart-name">${product.name}</td>
    <td><img class="img-thumbnail  style="height=100px, width=100px";"  src=${
			product.imageUrl
		}></td>
    <td class="cart-price">${product.price / 100}€</td>
    <td><input id="productQuantity" class="cart-quantity-input item-amount" data-id=${
			product.qty
		} type="number" value="1" min="1" max="10" required>
    <button class="btn-remove btn btn-danger btn-sm"  type="button">REMOVE</button></td>
    <td class="text-center total-row "> €</td>
                  `;
	list.appendChild(row);
}

//Remove item from cart
function removeCartItem(event) {
	const buttonClicked = event.target;
	console.log(buttonClicked);

	if (confirm("Voulez-vous enlever ce produit?")) {
		buttonClicked.parentElement.parentElement.remove();
		console.log(event.target.parentElement.parentElement.firstChild.nextElementSibling.innerText);
		removeProducts(
			event.target.parentElement.parentElement.firstChild.nextElementSibling.innerHTML
		);
	}
	updateCartTotal();
}

// function quantityChanged(event) {
// 	const inputQty = event.target;
// 	updateCartTotal();
// }

// get total price on cart
function updateCartTotal() {
	const cartContainer = document.getElementsByClassName("item-list")[0];
	const cartRows = cartContainer.getElementsByClassName("cart-row");

	for (let i = 0; i < cartRows.length; i++) {
		const cartRow = cartRows[i];
		const priceElement = cartRow.getElementsByClassName("cart-price")[0];
		const quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0];
		const price = parseFloat(priceElement.innerText.replace("€", ""));
		console.log(price);
		const quantity = quantityElement.value;
		totalRow = price * quantity;
		totoal = total + price * quantity;
	}
	document.getElementsByClassName("total-price")[0].innerText = total + "€";
	document.getElementsByClassName("total-row")[0].innerText = totalRow + "€";
}

// *************************************LOCAL STORAGE FUNCTIONS**********************************
// Get products added in Local Storage
function getProducts() {
	let productsCart;
	if (localStorage.getItem("productsCart") === null) {
		productsCart = [];
	} else {
		productsCart = JSON.parse(localStorage.getItem("productsCart"));
	}
	return productsCart;
}

// remove item on localSotrage
function removeProducts(productName) {
	const cart = getProducts();
	cart.forEach((item, index) => {
		if (item.name === productName) {
			cart.splice(index, 1);
		}
	});
	localStorage.setItem("productsCart", JSON.stringify(cart));
}
