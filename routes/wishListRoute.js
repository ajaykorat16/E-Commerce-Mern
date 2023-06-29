import express from "express";
import {
  createWishListController,
  deleteAllProducts,
  deleteProduct,
  getWishListProducts,
} from "../controllers/wishListController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

//create wishList
router.post("/create-wishList", requireSignIn, createWishListController);
router.get("/get-wishList-products", requireSignIn, getWishListProducts);
router.delete("/delete-product", requireSignIn, deleteProduct);
router.delete("/delete-all-products", requireSignIn, deleteAllProducts);

export default router;
