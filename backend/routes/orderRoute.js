
const express = require("express");
const router = express.Router();

const { isAuthenticationUser,authorizeRoles } = require("../middleware/auth");
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrders } = require("../controllers/orderController");


router.post("/order/new",isAuthenticationUser,newOrder);
router.get("/order/:id",isAuthenticationUser,authorizeRoles("admin"),getSingleOrder);
router.get("/orders/me",isAuthenticationUser,myOrders);

router.get("/admin/orders",isAuthenticationUser,authorizeRoles("admin"),getAllOrders);
router.put("/admin/order/:id",isAuthenticationUser,authorizeRoles("admin"),updateOrder);
router.delete("/admin/order/:id",isAuthenticationUser,authorizeRoles("admin"),deleteOrders);

module.exports =router;

