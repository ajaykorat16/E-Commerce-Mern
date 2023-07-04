import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import "../styles/WishListProducts.css";
import { useAuth } from "../context/auth";
import axios from "axios";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const WishListProducts = () => {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [wishListProducts, setWishListProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();

  //get wish list products
  const getWishListProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "/api/v1/wishList/get-wishList-products"
      );
      setLoading(false);
      setWishListProducts(data?.wishList[0]?.products);
      // console.log(data?.wishList[0]?.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //remove all products
  const removeAllProducts = async () => {
    try {
      const { data } = await axios.delete(
        "/api/v1/wishList/delete-all-products"
      );
      setWishListProducts([]);
      toast.success(data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  // Remove single product
  const removeProduct = async (productId) => {
    try {
      const { data } = await axios.delete("/api/v1/wishList/delete-product", {
        data: { productId },
      });
      setWishListProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
      toast.success(data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getWishListProducts();
  }, [auth?.token]);

  // console.log(wishListProducts);

  return (
    <Layout title={"Wish-List-Products"}>
      <div className="container-fluid row mt-3 wish-list-products">
        {loading ? (
          <div className="container text-center d-flex justify-content-center align-items-center">
            <h2 className="text-center">Loading... </h2>
            <div className="spinner-border" role="status"></div>
          </div>
        ) : (
          <div>
            <h1 className="text-center">All Products</h1>
            {wishListProducts && wishListProducts.length > 0 ? (
              <div className="text-center">
                <div
                  className="btn btn-dark mb-3 button"
                  onClick={removeAllProducts}
                >
                  REMOVE ALL
                </div>
              </div>
            ) : (
              <div className="text-center">
                <h3>Add product to wishlist</h3>
                <div
                  className="btn btn-dark mb-3 button"
                  onClick={() => navigate("/")}
                >
                  BACK TO HOMEPAGE
                </div>
              </div>
            )}
            <div className="d-flex flex-wrap justify-content-center">
              {wishListProducts?.map((wishListItem) => (
                // {console.log(product)}
                <div className="card m-2" key={wishListItem._id}>
                  <img
                    src={`/api/v1/product/product-photo/${wishListItem._id}`}
                    className="card-img-top"
                    alt={wishListItem.name}
                  />
                  <div className="card-body">
                    <div className="card-name-price">
                      <h5 className="card-title">{wishListItem.name}</h5>
                      <h5 className="card-title card-price">
                        {wishListItem.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </h5>
                    </div>
                    <p className="card-text">
                      {wishListItem.description.substring(0, 30)}...
                    </p>
                    <div className="card-name-price mb-2">
                      <button
                        className="btn btn-info ms-1"
                        onClick={() =>
                          navigate(`/product/${wishListItem.slug}`)
                        }
                      >
                        More Details
                      </button>
                      <button
                        className="btn btn-dark ms-1"
                        onClick={() => {
                          setCart([...cart, wishListItem]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, wishListItem])
                          );
                          toast.success("Item Added to cart");
                        }}
                      >
                        ADD TO CART
                      </button>
                    </div>
                    <div className="text-center">
                      <button
                        className="btn btn-danger"
                        onClick={() => removeProduct(wishListItem._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default WishListProducts;
