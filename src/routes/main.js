// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController');

/*ruta raiz del index del controladorMain su mmetodo (index)  */
router.get('/', mainController.index); 
/* router.???('/search', mainController.search);  */

module.exports = router;