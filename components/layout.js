import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarText,
  Container,
} from "reactstrap";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar color="secondary" fixed="top" dark expand={true}>
        <Nav className="me-auto" navbar>
        <NavItem>
            <Link href="/" legacyBehavior>
              <a className="nav-link">Home</a>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/account" legacyBehavior>
              <a className="nav-link">Account</a>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/orders" legacyBehavior>
              <a className="nav-link">Orders</a>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/cart" legacyBehavior>
              <a className="nav-link">Cart</a>
            </Link>
          </NavItem>
        </Nav>
        <NavbarText>Restaurant App</NavbarText>
      </Navbar>
      <Container style={{ marginTop: "60px" }}>{children}</Container>
    </div>
  );
};

export default Layout;