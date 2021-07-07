class Storage {
	static getProducts() {
		let productsCart;
		if (localStorage.getItem("productsCart") === null) {
			productsCart = [];
			alert("Votre panier est vide");
		} else {
			productsCart = JSON.parse(localStorage.getItem("productsCart"));
		}
		return productsCart;
	}
}
