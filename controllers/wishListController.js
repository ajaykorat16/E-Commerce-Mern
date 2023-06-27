import wishListModel from "../models/wishListModel.js";

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

// const wishListProduct = async (req, res) => {
//   try {
//       const { user, product } = req.body

//       const userData = await Wish.findOne({ user: user })

//       if (userData) {
//           const isProductLiked = userData.products.some((p) => p._id == product);
//           if (isProductLiked) {
//               return res.status(200).send({
//                   error: false,
//                   message: 'Product already liked',
//               });
//           }
//           const addProduct = await Wish.findByIdAndUpdate({ _id: userData._id }, { $push: { products: product } }, { new: true })

//           return res.status(201).send({
//               success: true,
//               addProduct,
//               message: "Use Wish Product add Successfully"
//           })

//       } else {
//           const wishProducts = await new Wish({
//               user, products: product
//           }).save()

//           return res.status(200).send({
//               success: true,
//               wishProducts,
//               message: "Use Wish Product"
//           })
//       }
//   } catch (error) {
//       res.status(500).send({
//           success: false,
//           message: "Error In WishList",
//           error: error.message
//       })
//   }
// }

// const getWishListProduct = async (req, res) => {

//   try {
//       const { user } = req.params

//       const getData = await Wish.findOne({ user: user })

//       const products = await Product.find({ "_id": { "$in": getData.products } }).select('-photo')

//       res.status(200).send({
//           success: false,
//           message: "get In WishList product",
//           products
//       })

//   } catch (error) {
//       res.status(500).send({
//           success: false,
//           message: "Error In getWishList",
//           error: error.message
//       })
//   }
// }
