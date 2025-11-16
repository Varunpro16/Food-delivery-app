import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { FaSearch, FaPlus, FaMinus, FaStar } from "react-icons/fa";
import burger from "../assests/burger.jpg";
import bakery from "../assests/burger.jpg";
import beverage from "../assests/burger.jpg";
import chicken from "../assests/burger.jpg";
import pizza from "../assests/burger.jpg";
import seafood from "../assests/burger.jpg";

const categories = [
  { name: "Bakery", icon: "🍞" },
  { name: "Burger", icon: "🍔" },
  { name: "Beverage", icon: "🥤" },
  { name: "Chicken", icon: "🍗" },
  { name: "Pizza", icon: "🍕" },
  { name: "Seafood", icon: "🦐" },
];

const popularDishes = [
  { name: "Fish Burger", price: 150, image: burger, discount: "15%" },
  { name: "Beef Burger", price: 180, image: burger, discount: "18%" },
  { name: "Cheese Burger", price: 130, image: burger, discount: "15%" },
  { name: "Veg Burger", price: 100, image: burger, discount: "16%" },
];

const bakeryDishes = [
  { name: "Croissant", price: 40, image: bakery, discount: "10%" },
  { name: "Whole Wheat Bread", price: 50, image: bakery, discount: "12%" },
  { name: "Baguette", price: 60, image: bakery, discount: "8%" },
  { name: "Chocolate Chip Cookies", price: 80, image: bakery, discount: "15%" },
  { name: "Blueberry Muffin", price: 90, image: bakery, discount: "10%" },
  { name: "Cheesecake Slice", price: 120, image: bakery, discount: "18%" },
  { name: "Black Forest Cake", price: 350, image: bakery, discount: "20%" },
  { name: "Glazed Donut", price: 45, image: bakery, discount: "12%" },
];

const burgerDishes = [
  { name: "Classic Beef Burger", price: 150, image: burger, discount: "15%" },
  { name: "Chicken Cheese Burger", price: 140, image: burger, discount: "12%" },
  { name: "Double Patty Burger", price: 200, image: burger, discount: "18%" },
  { name: "BBQ Bacon Burger", price: 180, image: burger, discount: "15%" },
  { name: "Veggie Delight Burger", price: 120, image: burger, discount: "14%" },
  { name: "Spicy Paneer Burger", price: 130, image: burger, discount: "10%" },
  { name: "Fish Fillet Burger", price: 170, image: burger, discount: "16%" },
  { name: "Mushroom Swiss Burger", price: 160, image: burger, discount: "13%" },
];

const beverageDishes = [
  { name: "Coke", price: 50, image: beverage, discount: "5%" },
  { name: "Fresh Orange Juice", price: 90, image: beverage, discount: "10%" },
  { name: "Cappuccino", price: 120, image: beverage, discount: "12%" },
  { name: "Green Tea", price: 70, image: beverage, discount: "8%" },
  { name: "Cold Coffee", price: 130, image: beverage, discount: "15%" },
  { name: "Mango Smoothie", price: 140, image: beverage, discount: "18%" },
  { name: "Lemon Iced Tea", price: 80, image: beverage, discount: "10%" },
  {
    name: "Strawberry Milkshake",
    price: 150,
    image: beverage,
    discount: "20%",
  },
];

const chickenDishes = [
  {
    name: "Fried Chicken (2 pcs)",
    price: 180,
    image: chicken,
    discount: "12%",
  },
  {
    name: "Grilled Chicken Breast",
    price: 220,
    image: chicken,
    discount: "10%",
  },
  {
    name: "Chicken Nuggets (6 pcs)",
    price: 140,
    image: chicken,
    discount: "15%",
  },
  {
    name: "Spicy Chicken Wings (5 pcs)",
    price: 200,
    image: chicken,
    discount: "18%",
  },
  { name: "Chicken Kebab", price: 160, image: chicken, discount: "12%" },
  { name: "Butter Chicken", price: 250, image: chicken, discount: "20%" },
  { name: "Chicken Popcorn", price: 120, image: chicken, discount: "10%" },
  {
    name: "BBQ Chicken Drumstick",
    price: 190,
    image: chicken,
    discount: "14%",
  },
];

const pizzaDishes = [
  { name: "Margherita Pizza", price: 180, image: pizza, discount: "12%" },
  { name: "Pepperoni Pizza", price: 250, image: pizza, discount: "15%" },
  { name: "BBQ Chicken Pizza", price: 270, image: pizza, discount: "18%" },
  { name: "Veggie Supreme Pizza", price: 200, image: pizza, discount: "10%" },
  { name: "Paneer Tikka Pizza", price: 220, image: pizza, discount: "12%" },
  { name: "Four Cheese Pizza", price: 260, image: pizza, discount: "14%" },
  { name: "Hawaiian Pizza", price: 230, image: pizza, discount: "16%" },
  { name: "Spicy Jalapeño Pizza", price: 210, image: pizza, discount: "10%" },
];

const seafoodDishes = [
  { name: "Grilled Prawns", price: 300, image: seafood, discount: "15%" },
  { name: "Fried Calamari", price: 250, image: seafood, discount: "10%" },
  { name: "Grilled Salmon", price: 400, image: seafood, discount: "18%" },
  { name: "Sushi Platter", price: 500, image: seafood, discount: "20%" },
  { name: "Crab Curry", price: 450, image: seafood, discount: "12%" },
  {
    name: "Butter Garlic Lobster",
    price: 600,
    image: seafood,
    discount: "25%",
  },
  { name: "Spicy Shrimp Pasta", price: 280, image: seafood, discount: "14%" },
  {
    name: "Soft Shell Crab Burger",
    price: 320,
    image: seafood,
    discount: "16%",
  },
];

// export { bakeryDishes, burgerDishes, beverageDishes, chickenDishes, pizzaDishes, seafoodDishes };

const getCartFromLocal = () => {
  const cart = localStorage.getItem("cartData");
  return cart ? JSON.parse(cart) : [];
};

const MainContent = ({ userData }) => {
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState(bakeryDishes);

  // Load cart from local storage on mount
  useEffect(() => {
    setCart(getCartFromLocal());
  }, []);

  const saveCartToLocal = (updatedCart) => {
    localStorage.setItem("cartData", JSON.stringify(updatedCart));
  };

  const addToCart = (dish) => {
    const existingItem = cart.find((item) => item.name === dish.name);
    let updatedCart;

    if (existingItem) {
      updatedCart = cart.map((item) =>
        item.name === dish.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { ...dish, quantity: 1 }];
    }

    setCart(updatedCart);
    saveCartToLocal(updatedCart);
  };

  const removeFromCart = (dish) => {
    let updatedCart = cart
      .map((item) =>
        item.name === dish.name
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0); // Remove items with quantity 0

    setCart(updatedCart);
    saveCartToLocal(updatedCart);
  };
 

  const handleCategory = (cat) => {
    if (cat == "Bakery") {
      setCategory(bakeryDishes);
    } else if (cat == "Burger") {
      setCategory(burgerDishes);
    } else if (cat == "Beverage") {
      setCategory(beverageDishes);
    } else if (cat == "Chicken") {
      setCategory(chickenDishes);
    } else if (cat == "Pizza") {
      setCategory(pizzaDishes);
    } else {
      setCategory(seafoodDishes);
    }
  };

  return (
    <Col md={10} className="main-content p-4">
      <div className="top-bar d-flex justify-content-between align-items-center mb-4">
        <h4>Hello, {userData && userData.username}</h4>
        <Form className="search-bar d-flex">
          <Form.Control
            type="text"
            placeholder="What do you want to eat today..."
          />
          <Button variant="warning">
            <FaSearch />
          </Button>
        </Form>
      </div>
      <Card className="discount-banner text-white p-3 mb-4">
        <Row>
          <Col md={8}>
            <h5>Get Discount Voucher Up To 20%</h5>
            <p>Limited time offer, order now to claim your discount.</p>
          </Col>
          <Col md={4} className="text-end">
            <img src="https://via.placeholder.com/100" alt="Discount" />
          </Col>
        </Row>
      </Card>
      {/* Categories */}
      <h5>Category</h5>
      <Row className="category-list mb-4">
        {categories.map((cat, idx) => (
          <Col
            key={idx}
            className="category-item text-center"
            onClick={() => handleCategory(cat.name)}
          >
            <div className="category-icon">{cat.icon}</div>
            <p>{cat.name}</p>
          </Col>
        ))}
      </Row>

      {/* Popular Dishes */}
      <h5>Popular Dishes</h5>
      <Row>
        {category.map((dish, idx) => {
          const cartItem = cart.find((item) => item.name === dish.name);
          const quantity = cartItem ? cartItem.quantity : 0;

          return (
            <Col md={3} key={idx} style={{marginTop:"20px"}}>
              <Card className="dish-card p-3">
                <span className="discount-badge">{dish.discount} OFF</span>
                <Card.Img
                  variant="top"
                  src={dish.image}
                  style={{ height: "90%" }}
                />
                <Card.Body style={{ marginTop: "-10%", marginBottom:"-5%" }}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="rating">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} color="gold" />
                        ))}
                      </div>
                      <Card.Title className="mb-1">{dish.name}</Card.Title>
                      <p className="mb-0">
                        <span>Price: &#8377;</span>
                        {dish.price}
                      </p>
                    </div>
                    <div className="d-flex align-items-center">
                      {quantity > 0 && (
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => removeFromCart(dish)}
                        >
                          <FaMinus />
                        </Button>
                      )}
                      <span className="mx-2">{quantity}</span>
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => addToCart(dish)}
                      >
                        <FaPlus />
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Col>
  );
};

export default MainContent;
