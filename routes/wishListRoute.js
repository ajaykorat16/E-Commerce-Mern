import express from "express";
import {
  createWishListController,
  getWishListProducts,
} from "../controllers/wishListController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

//create wishList
router.post("/create-wishList", requireSignIn, createWishListController);
router.get("/get-wishList-products", requireSignIn, getWishListProducts);

export default router;
