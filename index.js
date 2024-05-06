const port = 4000;
import express from "express";
const app = express();
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config.js";
import {
  forgotPassword,
  handleFetchUser,
  handleLogin,
  handleSignUp,
  resetPassword,
} from "./controllers/user.js";
import { fetchuser } from "./middleware/fetchUser.js";
import {
  addToCart,
  decreaseItemQuantity,
  getAllProducts,
  getCartItems,
  increaseItemQuantity,
  removeFromCart,
} from "./controllers/product.js";
import { createOrder, getOrders } from "./controllers/order.js";
import { checkoutSession } from "./controllers/checkout.js";

// import Stripe from "stripe";
// const stripe = Stripe(`${process.env.STRIPE_SECRET_KEY}`);

app.use(express.json());
app.use(cors());

// Database Connection With MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB."))
  .catch(error => console.log(error.message));

// ROUTES
app.post("/api/login", handleLogin);
app.post("/api/signup", handleSignUp);
app.post("/api/cart", fetchuser, addToCart);
app.post("/api/orders", fetchuser, createOrder);
app.post("/api/checkout-session", fetchuser, checkoutSession);
app.post("/api/forgot-password", forgotPassword);
app.get("/api/me", fetchuser, handleFetchUser);
app.get("/api/products", getAllProducts);
app.get("/api/orders", fetchuser, getOrders);
app.delete("/api/removefromcart/:itemId", fetchuser, removeFromCart);
app.put("/api/cart/:itemId/increase", fetchuser, increaseItemQuantity);
app.put("/api/cart/:itemId/decrease", fetchuser, decreaseItemQuantity);
app.put("/api/reset-password/:token", resetPassword);
app.get("/api/cart", fetchuser, getCartItems);

app.listen(port, error => {
  if (!error) console.log("Server Running on port " + port);
  else console.log("Error : ", error);
});
