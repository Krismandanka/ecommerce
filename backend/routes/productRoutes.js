

const express = require("express");
const { getAllProducts,createProduct ,updateProduct,deleteProduct,getProductDetails} = require("../controllers/productController");


const router = express.Router();

// router.route("/products").get(getAllProducts);
router.get("/products",getAllProducts);
router.post("/product/new",createProduct);
router.put("/product/:id",updateProduct);
router.delete("/product/:id",deleteProduct);
router.get("/product/:id",getProductDetails);



module.exports= router;