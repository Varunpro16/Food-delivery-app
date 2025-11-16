import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Form, Badge, Row, Col } from "react-bootstrap";
import { FaSearch, FaDownload, FaPlus } from "react-icons/fa";
import "./Orders.css";

const Orders = ({userData}) => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      if(userData!=null){
        console.log("userid: ", userData._id);
        const response = await axios.get(
          `http://localhost:5000/orders/${userData._id}`
        );
        console.log("orders: ",response.data.orders);
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
   const convertToIST = (isoString) => {
     const date = new Date(isoString);
     return date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
   };

  const getStatusVariant = (status) => {
    switch (status.toLowerCase()) {
      case "processing":
        return "warning";
      case "deliver":
        return "success";
      case "shipping":
        return "info";
      default:
        return "secondary";
    }
  };

  return (
    <Col md={10} className="main-content p-4">
      <div className="orders-page p-4 mx-auto">
        <h4 className="mb-4">Orders</h4>
        <Row className="mb-3 align-items-center">
          <Col md={4}>
            <Form.Control
              placeholder="Search Orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Col>
          <Col md="auto">
            <Button variant="light">
              <FaSearch />
            </Button>
          </Col>
          <Col className="text-end">
            <Button variant="outline-primary" className="me-2">
              <FaDownload /> Export CSV
            </Button>
            <Button variant="primary">
              <FaPlus /> Add Order
            </Button>
          </Col>
        </Row>

        <div className="table-responsive">
          <Table hover bordered className="orders-table">
            <thead className="table-light">
              <tr>
                <th>#ID</th>
                <th>OrderID</th>
                <th>PaymentID</th>
                <th>Date</th>
                <th>TotalCost</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{order.id}</td>
                  <td>{order.orderId}</td>
                  <td>{order.paymentId}</td>
                  <td>{convertToIST(order.createdAt)}</td>
                  <td>{order.totalAmount}</td>
                  <td>
                    <Badge bg={getStatusVariant(order.orderStatus)}>
                      {order.orderStatus}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </Col>
  );
};

export default Orders;
