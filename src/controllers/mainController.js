const fs = require('fs');
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
		/* filtramos de los productos los de la categy  ("in-sale") */
		let productsInSale = products.filter (product => product.category === "in-sale");
		/* filtramos de los productos los de la categoria ("visitados") */
		let productVisited = products.filter(product => product.category === "visited");
		/* renderizamos la vista index y le mandamos las variables (productsInSales) y (productsVisited) */
		res.render("index", {
            productVisited,
			productsInSale,
			toThousand
		/* vamos y le envebemos codigo js a la vista (index.ejs) */
		})
	},
	search: (req, res) => {
		// Do the magic
	},
};

module.exports = controller;
