import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(false);

  const getOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/auth/orders");
      // console.log(data);
      setLoading(false);
      setOrders(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid p-3 m-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          {loading ? (
            <div className="container col-md-3 d-flex justify-content-center align-items-center">
              <h2 className="text-center">Loading... </h2>
              <div className="spinner-border" role="status"></div>
            </div>
          ) : (
            <div className="col-md-9">
              <h1 className="text-center">All orders</h1>
              {orders?.map((order, index) => {
                return (
                  <div className="border shadow" key={order._id}>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Status</th>
                          <th scope="col">Buyer</th>
                          <th scope="col">Date</th>
                          <th scope="col">Payment</th>
                          <th scope="col">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{order?.status}</td>
                          <td>{order?.buyer?.name}</td>
                          <td>{moment(order?.createAt).fromNow()}</td>
                          <td>
                            {order?.payment.success ? "Success" : "Failed"}
                          </td>
                          <td>{order?.products?.length}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="container">
                      {order?.products?.map((product, index) => (
                        <div
                          className="row mb-2 p-3 card flex-row"
                          key={product._id._id}
                        >
                          <div className="col-md-3">
                            <img
                              src={`/api/v1/product/product-photo/${product._id._id}`}
                              className="card-img-top"
                              alt={product._id.name}
                              width="50px"
                              height="150px"
                            />
                          </div>
                          <div className="col-md-8">
                            <p>{product._id.name}</p>
                            <p>
                              {product._id.description
                                ? product._id.description.substring(0, 30)
                                : ""}
                            </p>
                            <p>Price : {product._id.price}</p>
                            <p>Quantity : {product.quantity}</p>
                            {/* {console.log(product.price)} */}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
