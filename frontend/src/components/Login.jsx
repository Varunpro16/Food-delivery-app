import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Login = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies([]);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  // useEffect(() => {
  //   console.log("Token: ", cookies.token);
  //   if (cookies.token) {
  //     console.log("found");
  //     navigate("/home");
  //   }
  // }, [cookies, navigate]);

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/login",
        formData,
        {
          withCredentials: true,
        }
      );
      setMessage(res.data.message);
      // Token is stored in a cookie by the backend
      console.log("login sucess");
      
      navigate(`/home/${res.data.user._id}`);
    } catch (err) {
      console.error(err);
      setMessage(err.response.data.message || "Something went wrong!");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <div className="w-50">
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            name="username"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Login
        </button>
      </div>
      <p className="mt-3">{message}</p>
    </div>
  );
};

export default Login;
