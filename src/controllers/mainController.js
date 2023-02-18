const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		let productsVisited = products.filter(product => product.category === 'visited');
		let productsInSale = products.filter(product => product.category === 'in-sale');
		//atrib render de metodo res, acepta 1 string y 1 objeto
		res.render('index', {
			productsVisited,
			productsInSale,
			toThousand,
		});
	},
	search: (req, res) => {
		// Do the magic
		const {keywords} = req.query;
	
		let results = [];
		
		products.forEach(product => {
			if(product.name.toLowerCase().includes(keywords.toLowerCase())){
				results.push(product)
			}
		});
		res.render("results", {
			keywords,
			results, 
			toThousand
		});
	
	},
};

module.exports = controller;
