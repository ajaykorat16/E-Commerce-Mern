import mongoose from "mongoose";

const wishListSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.ObjectId,
      ref: "users",
      required: true,
    },
    products: [
      {
        type: mongoose.ObjectId,
        ref: "Products",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("WishList", wishListSchema);
