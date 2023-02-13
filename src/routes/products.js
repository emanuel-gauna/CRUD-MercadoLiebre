// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/* CRUD 2 -Multer- */
const multer = require("multer");

const storage = multer.diskStorage({
    /* destination dnd se va a guardar */
   destination: (req, file, cb)=>{
       cb(null, path.join(__dirname, "../../public/images/products"))
   },
   /* nombre del archivo de subida */
   filename: (req, file, cb)=>{
       /* se va a llamar group+el date exacto+elnombre original del archivo  */
       const newFilename = "product-" + Date.now() + path.extname(file.originalname) ;
       cb(null, newFilename);
   }
});
/* variable upload  dnd se ejecuta multer con la configuracion de el storage*/
const upload = multer({storage});

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
 router.get('/create/', productsController.create); 
 /* en el sigle va el nombre q va en el name: del formulario */
 router.post('/', upload.single("product-img") , productsController.store)
  

/*** GET ONE PRODUCT ***/ 
/* product seria el indice entonces ponemos http://localhost:3000/products/:id */
router.get('/:id/', productsController.detail);  

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id/', productsController.edit); 
router.put('/:id', productsController.update);  


/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.destroy); 

module.exports = router;
