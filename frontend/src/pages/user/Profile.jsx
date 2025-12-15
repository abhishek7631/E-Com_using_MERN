import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/Auth";
import axios from "axios";
import toast from "react-hot-toast";

const Profile = () => {
  const [auth, setAuth] = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const { name, email, phone, address } = auth?.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
  }, [auth?.user]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/register`,
        { name, email, password, phone, address, answer }
      );
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="form-container">
              <form onSubmit={handleSubmit}>
                <h4 className="title">USER PROFILE</h4>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputName"
                    placeholder="Enter Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputPhone"
                    placeholder="Enter Your Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputAddress"
                    placeholder="Enter Your Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
