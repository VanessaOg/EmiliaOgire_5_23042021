class Storage {
	static getProducts() {
		let productsCart;
		if (localStorage.getItem("productsCart") === null) {
			productsCart = [];
		} else {
			productsCart = JSON.parse(localStorage.getItem("productsCart"));
		}
		return productsCart;
	}
}
