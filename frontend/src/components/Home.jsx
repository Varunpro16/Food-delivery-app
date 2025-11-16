import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { BiFoodMenu } from "react-icons/bi";
import "../components/css/App.css";
import MainContent from "./MainContent";
import Cart from "./Cart";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from 'axios'
import Orders from "./Orders.jsx";


const Home = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const { id } = useParams();
  const [user, setUser] = useState(null)

  const [navhead,setNavhead] = useState('dashboard')
  useEffect(()=>{
    console.log(navhead)
  },[navhead])
  useEffect(()=>{
    const fetchUser = async (id) => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${id}`
        );
        console.log(response.data);
        
        setUser(response.data);
      } catch (err) {
        console.error(err);
        // setError("Failed to fetch user details");
      }
    }
    fetchUser(id)
  },[id])

  // useEffect(() => {
  //   console.log("Token: ", cookies.token);
  //   if (!cookies.token) {
  //     navigate("/login");
  //   }
  // }, [cookies, navigate]);

  const [userData, setUserData] = useState(null);

  return (
    <Container fluid className="app-container">
      <Row>
        {/* Sidebar */}
        <Col md={2} className="sidebar p-4">
          <h3 className="logo">GoMeal.</h3>
          <ul className="nav flex-column">
            <li
              className={`nav-item ${navhead == "dashboard" ? "active" : ""}`}
              onClick={() => setNavhead("dashboard")}
            >
              <BiFoodMenu /> Dashboard
            </li>
            <li
              className={`nav-item ${navhead == "orders" ? "active" : ""}`}
              onClick={() => setNavhead("orders")}
            >
              <BiFoodMenu /> Orders
            </li>
            <li
              className={`nav-item ${navhead == "cart" ? "active" : ""}`}
              onClick={() => setNavhead("cart")}
            >
              <BiFoodMenu /> Cart
            </li>
            <li className="nav-item">
              <BiFoodMenu /> Messages
            </li>
            <li className="nav-item">
              <BiFoodMenu /> Order History
            </li>
            <li className="nav-item">
              <BiFoodMenu /> Bills
            </li>
            <li className="nav-item">
              <BiFoodMenu /> Settings
            </li>
          </ul>
          <div className="upgrade-box p-3 mt-3">
            <p>Upgrade your Account to Get Free Voucher</p>
            <Button variant="warning">Upgrade</Button>
          </div>
        </Col>

        {/* Main Content */}
        {navhead == "dashboard" && <MainContent userData={user} />}
        {navhead == "cart" && <Cart userData={user} />}
        {navhead == "orders" && <Orders userData={user} />}
      </Row>
    </Container>
  );
};

export default Home;
