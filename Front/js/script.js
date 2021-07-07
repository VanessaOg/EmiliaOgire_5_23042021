const productslist = document.getElementById("productslist");
displayProducts();

function displayProducts() {
	return fetch("http://localhost:3000/api/teddies")
		.then((res) => res.json())
		.then((teddies) => {
			displayCards(teddies);
		})
		.catch((err) => console.log("Erreur:" + err));
}

function displayCards(teddies) {
	for (teddy in teddies) {
		const product = teddies[teddy];
		productslist.innerHTML += `
			<div class="card-group p-4 col-sm-6 ">
				<div class="col ">
					<div class="card h-100">
						<a href="./product.html?id=${product._id}" class="text-decoration-none"><img src="${
			product.imageUrl
		}" class="card-img-top" alt='Ours en peluche fait main ${product.name}'/></a>
						<div class="card-body d-flex justify-content-between">
							<h5 class="card-title">${product.name}</h5>
							<h5 class="card-price">${product.price / 100} €</h5>
						</div>
						<div class="card-footer">
							<p class="card-text">${product.description}
							</p>
						</div>
					</div>
				</div>	
			</div>`;
	}
}
