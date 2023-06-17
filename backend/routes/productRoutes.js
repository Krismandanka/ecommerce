

const express = require("express");
const { getAllProducts,createProduct ,updateProduct,deleteProduct,getProductDetails} = require("../controllers/productController");
const { isAuthenticationUser,authorizeRoles } = require("../middleware/auth");


const router = express.Router();

// router.route("/products").get(getAllProducts);
router.get("/products",getAllProducts);
router.post("/product/new",isAuthenticationUser,authorizeRoles("admin"),createProduct);
router.put("/product/:id",isAuthenticationUser,authorizeRoles("admin"),updateProduct);
router.delete("/product/:id",isAuthenticationUser,authorizeRoles("admin"),deleteProduct);
router.get("/product/:id",getProductDetails);



module.exports= router;