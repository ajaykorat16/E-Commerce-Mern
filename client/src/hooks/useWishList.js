import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/auth";

export default function useWishList() {
  const [wishList, setWishList] = useState([]);
  //   const [loading, setLoading] = useState(false);
  const [auth] = useAuth();

  //get wishList
  const getWishListProducts = async () => {
    try {
      const { data } = await axios.get(
        "/api/v1/wishList/get-wishList-products"
      );
      setWishList(data?.wishList[0]?.products);
      localStorage.setItem(
        "wishListProducts",
        JSON.stringify(data?.wishList[0]?.products)
      );
      // console.log(data?.wishList[0]?.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getWishListProducts();
  }, [auth?.token]);

  return wishList;
}
