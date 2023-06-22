

const express = require("express");
const { getAllProducts,createProduct ,updateProduct,deleteProduct,getProductDetails} = require("../controllers/productController");
const { isAuthenticationUser,authorizeRoles } = require("../middleware/auth");


const router = express.Router();

// router.route("/products").get(getAllProducts);
router.get("/products",getAllProducts);
router.post("/admin/product/new",isAuthenticationUser,authorizeRoles("admin"),createProduct);
router.put("/admin/product/:id",isAuthenticationUser,authorizeRoles("admin"),updateProduct);
router.delete("/admin/product/:id",isAuthenticationUser,authorizeRoles("admin"),deleteProduct);
router.get("/product/:id",getProductDetails);



module.exports= router;