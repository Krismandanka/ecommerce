const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// crete new order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });
  
 
  res.status(201).json({
    success: true,
    order,
  });
});

// get Single Order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// get logged in user  Orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders
  });
});


// get all orders

exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  
  const orders = await Order.find();

  let totlAmount =0;
  orders.forEach((order)=>{
    totlAmount += order.totalPrice;
  });



  res.status(200).json({
    success: true,
    orders,
    totlAmount
  });
});


// updateOrder status
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  
  const order = await Order.findById(req.params.id);
  if(order.orderStatus ==="Delivered"){
    return next(new ErrorHandler("you have already delivered this product",404));
  }
  order.orderItems.forEach(async(order)=>{
    await updateStock(order.product,order.quantity);
  })

  order.orderStatus = req.body.status;
  if(req.body.status === "Delivered"){
    order.deliveredAt = Date.now();

  }
  await order.save({validateBeforeSave:false});
  res.status(200).json({
    success: true,
    
  });
});

async function updateStock(id,quantity){
  const product = await Product.findById(id);
  product.Stock=product.Stock-quantity;
  await product.save({validateBeforeSave:false});
}

// delete order

exports.deleteOrders = catchAsyncErrors(async (req, res, next) => {
  
  const order = await Order.findById(req.params.id);

  

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }
  await Order.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    
  });
});



