import React from "react";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";

const NavbarNew = () => {
  const cartItems = 3; // Example cart count (Replace with dynamic state)

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        {/* Logo */}
        <Navbar.Brand href="/">
          <img
            src="https://via.placeholder.com/40" // Replace with your logo URL
            alt="Logo"
            width="40"
            height="40"
            className="d-inline-block align-top"
          />
          {" "} E-Shop
        </Navbar.Brand>

        {/* Toggle Button for Mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Navbar Links */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* Cart Icon with Badge */}
            <Nav.Link href="/cart">
              <FaShoppingCart size={22} />
              {cartItems > 0 && (
                <Badge pill bg="danger" className="ms-1">
                  {cartItems}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarNew;
