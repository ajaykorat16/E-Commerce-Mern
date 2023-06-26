import wishListModel from "../models/wishListModel.js";

export const createWishListController = async (req, res) => {
  try {
    const { productId } = req.body;
    const { _id: userId } = req.user;
    if (!productId) {
      return res.status(401).send({ message: "ProductId is required" });
    }
    const existingProduct = await wishListModel.findOne({
      products: productId,
    });
    if (existingProduct) {
      return res.status(200).send({
        success: false,
        message: "Product Already Exists is Wish List",
      });
    }

    const wishlist = await new wishListModel({
      user: userId,
      products: productId,
    }).save();
    // console.log(userId);
    // console.log(productId);
    res.status(201).send({
      success: true,
      message: "Wishlist created",
      wishlist: wishlist,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while creating Wish List",
      error: error.message,
    });
  }
};
