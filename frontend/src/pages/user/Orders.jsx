import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "../../context/Auth";
import moment from "moment";

const Orders = () => {
  const [auth, setAuth] = useAuth();

  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/orders`,
        {
          headers: {
            Authorization: auth.token,
          },
        }
      );
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Ordders</h1>
            {orders?.map((order, idx) => {
              return (
                <div className="border shadow">
                  <table className="table">
                    <thead>
                      <tr>
                        <td scope="col">#</td>
                        <td scope="col">Status</td>
                        <td scope="col">Buyer</td>
                        <td scope="col">Date</td>
                        <td scope="col">Payment</td>
                        <td scope="col">Quantity</td>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <th>{idx + 1}</th>
                        <th>{order?.status}</th>
                        <th>{order?.buyer?.name}</th>
                        <th>{moment(order?.createAt).fromNow()}</th>
                        <th>{order?.payment.success ? "Success" : "Failed"}</th>
                        <th>{order?.products?.length}</th>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {order?.products?.map((p, i) => (
                      <div className="row mb-2 p-3 card flex-row">
                        <div className="col-md-4">
                          <img
                            src={`${
                              import.meta.env.VITE_API_URL
                            }/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                          />
                        </div>
                        <div className="col-md-8">
                          <h6>{p.name}</h6>
                          <p>{p.description}</p>
                          {/* .substring(0, 30)}... */}
                          <p>Price : ₹ {p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
