import wishListModel from "../models/wishListModel.js";

export const getWishListProducts = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const wishList = await wishListModel
      .find({ user: userId })
      .populate("products", "-photo");
    res.status(201).send({
      success: true,
      message: "Wish List Products getting successfully by userId",
      wishList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting Wish List Products",
      error: error.message,
    });
  }
};

export const createWishListController = async (req, res) => {
  try {
    const { productId } = req.body;
    const { _id: userId } = req.user;

    const userData = await wishListModel.findOne({ user: userId });

    if (userData) {
      const existingProduct = userData.products.some((p) => p._id == productId);
      if (existingProduct) {
        return res.status(200).send({
          success: false,
          message: "Product Already Exists is Wish List",
        });
      }
      const addProduct = await wishListModel.findByIdAndUpdate(
        { _id: userData._id },
        { $push: { products: productId } },
        { new: true }
      );

      return res.status(201).send({
        success: true,
        addProduct,
        message: "Use Wish Product add Successfully",
      });
    } else {
      const wishProducts = await new wishListModel({
        user: userId,
        products: productId,
      }).save();

      return res.status(200).send({
        success: true,
        wishProducts,
        message: "Product added in Wish List",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while creating Wish List",
      error: error.message,
    });
  }
};

//remove product
export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const { _id: userId } = req.user;

    const userData = await wishListModel.findOne({ user: userId });

    if (userData) {
      await wishListModel.findByIdAndUpdate(
        { _id: userData._id },
        { $pull: { products: productId } },
        { new: true }
      );

      return res.status(201).send({
        success: true,
        message: "Wish list product deleted successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product from Wish List",
      error: error.message,
    });
  }
};

//remove All Products
export const deleteAllProducts = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const userData = await wishListModel.findOne({ user: userId });

    if (userData) {
      await wishListModel.findByIdAndUpdate(
        { _id: userData._id },
        { $set: { products: [] } },
        { new: true }
      );

      return res.status(201).send({
        success: true,
        message: "All products deleted successfully from the wish list",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting products from Wish List",
      error: error.message,
    });
  }
};
