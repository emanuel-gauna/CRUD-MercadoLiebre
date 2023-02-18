const fs = require("fs");
const path = require("path");
/* direccion de json */
const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
/* productos parseados */
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
/* productos pasados a json */
const writeJSON = function (products) {
  fs.writeFileSync(productsFilePath, JSON.stringify(products), "utf-8");
};

/* const decimalComma = (n) => n.toString().replace(".", ","); */
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  // Root - Show all products
  index: (req, res) => {
    res.render("products.ejs", {
      products,
      toThousand,
      
    });
  },

  // Detail - Detail from one product
	detail: (req, res) => {
	
		let productId = +req.params.id;
		let product = products.find(product => product.id === productId);

/* /products/:id */
		res.render("detail",{
			product,
			toThousand
		})

	},

  // Create - Form to create
  create: (req, res) => {
    return res.render("product-create-form.ejs");
  },

  // Create -  Method to store
  store: (req, res) => {
    let lastID = products[products.length - 1].id;

    let newProduct = {
      id: lastID + 1,
      name: req.body.name,
      price: req.body.price,
      discount: req.body.discount,
      category: req.body.category,
      description: req.body.description,
      image : req.file ? req.file.filename : null,
    }
    products.push(newProduct);
    writeJSON(products);
    res.redirect(200, '/products');
    
  },

  // Update - Form to edit
  edit: (req, res) => {
    let productToEdit = products.find(
      (producto) => producto.id == +req.params.id
    );

    res.render("product-edit-form.ejs", {
      productToEdit
    });
  },
  // Update - Method to update
  update: (req, res) => {
    let productID = +req.params.id;
    products.forEach((product) => {
      if (product.id === productID) {
        product.name = req.body.name;
        product.description = req.body.description;
        product.price = req.body.price;
        product.discount = req.body.discount;
        product.category = req.body.category;
        product.image = req.file ? req.file.filename : "default-image.png"
      }
    });
    writeJSON(products);
    return res.redirect( 200,'/products');
  },

  // Delete - Delete one product from DB
  destroy: (req, res) => {
    /* let newDB = products.map(product => {
			if (product.id != req.params.id){
				return {
					id: product.id,
					name: product.name,
					description: product.description,
					price: product.price,
					discount: product.discount,
					category: product.category,
					image: product.image,
				};
			};
		}); */
    /* products.forEach(producto => {
			if (producto.id === req.params.id){
				let productToDestroy = products.indexOf(producto);
				products.splice(productToDestroy, 1);
			}
		})
		writeJSON(products); */
    let productId = +req.params.id;

    let newProductsArray = products.filter(
      (product) => product.id !== productId
    );

    // sobreescribo el json con el array de productos modificado
    writeJSON(newProductsArray);
    res.redirect(200,'/products');
  },
};

module.exports = controller;
