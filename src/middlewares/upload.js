const multer = require("multer");
const path = require("path")

const storeProductImage = multer.diskStorage({
    destination : function (req, file, cb){
        cb(null, 'public/images/products')
    },
    filename : function (req, file, cb){
        cb(null, `${Date.now()}_product_${path.extname(file.originalname)}`)
    }
});

const uploadProductImage = multer({
    storage : storeProductImage
});

module.exports = {
    uploadProductImage
}