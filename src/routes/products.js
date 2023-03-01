// ************ Require's ***********
const  router= require('express').Router();
// ************ Controller Require ************
const productsController = require('../controllers/productsController');

const uploadProductImage = require("../middlewares/upload");




/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id/', productsController.detail); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', productsController.create); 
router.post('/',  uploadProductImage.single('product-image') , productsController.store); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id/', productsController.edit); 
router.put('/edit/:id', uploadProductImage.single('product-image') , productsController.update); 

/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.destroy); 


module.exports = router;
