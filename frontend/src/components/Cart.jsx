import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import axios from 'axios'
import './css/Cart.css'


const Cart = ({ userData }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cartData");
    return savedCart
      ? JSON.parse(savedCart).map((item) => ({
          ...item,
          quantity: Number(item.quantity),
          price: Number(item.price),
        }))
      : [];
  });

  const [coupon, setCoupon] = useState("");
  const discount = coupon === "SAVE10" ? 10 : 0;

  useEffect(() => {
    localStorage.setItem(
      "cartData",
      JSON.stringify(
        cart.map((item) => ({
          ...item,
          quantity: Number(item.quantity),
          price: Number(item.price),
        }))
      )
    );
  }, [cart]);

  const updateQty = (name, amount) => {
    setCart((prev) =>
      prev.map((item) =>
        item.name === name
          ? { ...item, quantity: Math.max(1, Number(item.quantity) + amount) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const total = subtotal - discount;

  const loadRazorpay = async () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };
 

  const handlePayment = async () => {
    const isLoaded = await loadRazorpay();
    if (!isLoaded) {
      alert("Failed to load payment gateway!");
      return;
    }

    try {
      // Create an order on the backend
      const response = await fetch("http://localhost:5000/create-order", {
        method: "POST",
        body: JSON.stringify({
          amount: total * 100, // Razorpay takes amount in paise
          currency: "INR",
          cartDetails: cart,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const order = await response.json();
      if (!order.id) {
        alert("Failed to create order!");
        return;
      }

      const options = {
        key: "rzp_test_i5KJt0JAzXNsyV", // Razorpay Test Key
        amount: order.amount,
        currency: "INR",
        name: "Web Dev Matrix",
        description: "Shopping Cart Payment",
        order_id: order.id,
        handler: async function (paymentResponse) {
          // Validate the payment with backend
          const validateRes = await fetch(
            "http://localhost:5000/validate-payment",
            {
              method: "POST",
              body: JSON.stringify({ ...paymentResponse, cartDetails: cart }),
              headers: { "Content-Type": "application/json" },
            }
          );

          const jsonRes = await validateRes.json();
          console.log("json: ", jsonRes);

          if (jsonRes.msg == "success") {
            alert("Payment Successful! Order Confirmed.");
            const responseOnPayment = await axios.post(
              "http://localhost:5000/orderSuccess",
              {
                orderId: jsonRes.orderId,
                paymentId: jsonRes.paymentId,
                userId: userData._id,
                cart:cart,
                price:total
              }
            );
            console.log("order payment: ",responseOnPayment.data);
            
            alert(`Order Id: ${responseOnPayment.data.OrderId}`);
            setCart([]); // Clear cart after successful payment
            localStorage.removeItem("cartData");
          } else {
            alert("Payment failed! Please try again.");
          }
        },
        prefill: {
          name: userData?.name || "Customer",
          email: userData?.email || "customer@example.com",
          contact: userData?.contact || "9000000000",
        },
        theme: { color: "#3399cc" },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment failed!");
    }
  };

  return (
    <Col md={10} className="main-content p-4">
      <Container className="shopping-cart mt-4">
        <h2 className="text-center mb-4">{userData?.username}'s Shopping Cart</h2>
        <Row>
          <Col md={8}>
            <div className="cart-items">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="cart-item d-flex align-items-center justify-content-between p-3 mb-3 border rounded"
                >
                  <div className="d-flex align-items-center">
                   
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-img me-3"
                    />
                    <div>
                      <div className="cart-item-name">{item.name}</div>
                      <small>{item.weight}</small>
                    </div>
                  </div>
                  <div className="cart-item-price">
                    &#8377;{item.price.toFixed(2)}
                  </div>
                  <div className="cart-item-qty d-flex align-items-center">
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      onClick={() => updateQty(item.name, -1)}
                    >
                      <FaMinus />
                    </Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      onClick={() => updateQty(item.name, 1)}
                    >
                      <FaPlus />
                    </Button>
                  </div>
                  <div className="cart-item-subtotal">
                    &#8377;{(item.price * item.quantity).toFixed(2)}
                  </div>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                  >
                    <FaTrash />
                  </Button>
                </div>
              ))}
            </div>
          </Col>
          <Col md={4}>
            <div className="order-summary p-3">
              <h5>Order Summary</h5>
              <p>Items: {cart.reduce((acc, item) => acc + item.quantity, 0)}</p>
              <p>Sub Total: &#8377;{subtotal.toFixed(2)}</p>
              <p>Coupon Discount: &#8377;{discount.toFixed(2)}</p>
              <h5>Total: &#8377;{total.toFixed(2)}</h5>
              <Form.Group controlId="coupon">
                <Form.Control
                  type="text"
                  placeholder="Coupon Code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
              </Form.Group>
              <Button
                className="mt-2 w-100"
                variant="success"
                onClick={handlePayment}
              >
                Proceed to Checkout
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </Col>
  );
};

export default Cart;
