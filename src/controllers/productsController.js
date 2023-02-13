const fs = require('fs');
const { join } = require('path');
const path = require('path');

/* (productsFilePath) ubicacion exacta de base de datos */
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
/* (product) leeme el json dnd se encuentre y parsealo a js */
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
/*(writeJson) el array de productos q se encuentra en la direcien pasada, sobreescribilos, y parsealos */
const writeJson = (products) => {
    fs.writeFileSync(productsFilePath, JSON.stringify(products), {encoding:"utf8"})
}
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		res.render("products", {
		    products,
			toThousand
	    })
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let productId = +req.params.id;
		let product = products.find(product => {
			return product.id == productId;
		})
		res.render("detail", {
			product,
			toThousand
			
		})
	},
	// Create - Form to create
	create: (req, res) => {
		res.render("product-create-form");
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let lastId = products[products.length-1].id;

		let newProduct = {
			id: lastId + 1,
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description,
			image: "default-image.png",
		}
		products.push(newProduct);/* agregamos a los productos */
		writeJson(products);/* escribir el json */
		
		res.send("producto agregado recientemente")
	},

	// Update - Form to edit
	edit: (req, res) => {
		let productId = +req.params.id;
	    let productToEdit = products.find(product => product.id === productId);
		res.render("product-edit-form", {
			productToEdit,
		})
	},
	// Update - Method to update
	update: (req, res) => {
		let productId = Number(req.params.id);
		products.forEach(product => {
			if(product.id === productId){
                product.name = req.body.name
                product.price = req.body.price;
                product.category = req.body.category;
                product.description = req.body.description;
                product.discount = req.body.discount;
			}
		});
		writeJson(products);
		res.send("producto editado correctamente")
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let productId = Number(req.params.id);
		let newList = products.filter( product =>  product.id  != productId)

		writeJson(newList);
	
	res.send("el producto fue destruido")
	}
};

module.exports = controller;