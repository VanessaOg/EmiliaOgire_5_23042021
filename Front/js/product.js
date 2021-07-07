// Declaration de variable
const productId = document.getElementById("product");

// requete API avec Fetch avec parametre de recherche _id
const params = new URLSearchParams(window.location.search);

// params.get('id') récupère l'id de l'objet
fetch("http://localhost:3000/api/teddies/" + params.get("id"))
	.then((res) => res.json())
	.then((product) => {
		// on injecte le code html dans la classe product
		displayProduct(product);

		// colors
		const selectElt = document.getElementById("color");
		// selection des couleurs
		product.colors.forEach((color) => {
			//Colors
			selectElt.innerHTML += `<option value='${color}'> ${color}</option>`;
			selectElt.addEventListener("change", (event) => {
				const productColor = event.target.value;
				console.log(productColor);
			});
		});

		// quantity

		// Add event listeners
		const addButton = document.getElementById("addBtn").addEventListener("click", (event) => {
			event.preventDefault();
			addProductToCart(product);
			// console.log(productCart);
			window.location.href = "cart.html";
		});
	})

	.catch((err) => console.log("Erreur:" + err));

// Functions
function displayProduct(product) {
	productId.innerHTML = `
		<div class="row mt-4 col-sm-6 mx-auto">
				<div class="card rounded-md p-4 bgColor col  mx-auto mt-4 mb-4 overflow-hidden">
					<div class="col rounded-4">
						<a href="product.html?id=${product._id}" id ="article">
							<img class="shop-product-image  rounded-md h-64 w-full object-cover card-img-top " id="shop-item-image" src="${
								product.imageUrl
							}" alt = 'Ours en peluche fait main ${product.name}'/>
						</a>
						<div class="card-body ">
							<div class="shop-product-title d-flex justify-content-between">
								<h4 id="shop-product-name" class="card-title">${product.name}</h4>
								<h5 id="shop-product-price"class="card-price text-end">${product.price / 100} €</h5>
							</div>
							<div>
								<div class ="form-group">
									<label>Couleurs</label>
									<select  id="color" name="colors"></select>
								</div>									
							</div>
                            
							</br>		
							<div class="details">
		                		<p class="card-text">${product.description}</p> 
		                		<input id="addBtn" type="button" class="btn  btn-secondary btn-lg mx-auto"value="Ajouter au panier"></button>	
		            		</div>
						</div>	
					</div>	
				</div>
			</div>
		</div>`;
}
function addProductToCart(product) {
	let productsCart = Storage.getProducts();
	console.log(productsCart);
	//voir si le produit existe en comparant les identifiants
	let productsCartId = productsCart.map((el) => el._id);
	const index = productsCartId.indexOf(product._id);
	console.log(productsCartId);
	console.log(index);
	product.qty = 1;
	console.log(product);
	if (index === -1) {
		productsCart.push(product);

		alert("Votre article a bien été ajouté au panier");
	} else {
		productsCart[index].qty += product.qty;
		alert("Ce produit est déjà dans le panier, Veuillez changer la quantité... Merci");
	}
	// Added product to LocalStorale
	localStorage.setItem("productsCart", JSON.stringify(productsCart));
}
