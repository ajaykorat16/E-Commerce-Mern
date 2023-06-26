import express from "express";
import { createWishListController } from "../controllers/wishListController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

//create wishList
router.post("/create-wishList", requireSignIn, createWishListController);

export default router;
