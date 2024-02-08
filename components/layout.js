import React, { useContext } from "react";
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
import { useRouter } from 'next/router';
import { ShoppingCart, Home, CircleUserRound } from 'lucide-react';
import styles from '../styles/Home.module.css';
import MyContext from './context';

const Layout = ({ children }) => {
  const router = useRouter();
  const isRegisterPage = router.pathname === '/register';
  const { user, cart } = useContext(MyContext);
  console.log(cart);

  const cartQuantity = cart.items ? cart.items.reduce((total, item) => total + item.quantity, 0) : 0;
  

  return (
    <div>
      {!isRegisterPage && (
      <Navbar color="light" fixed="top" dark expand={true}>
        <Nav className="me-auto" navbar>
        <NavItem>
            <Link href="/" legacyBehavior>
            <div className={styles.shoppingCartIcon}>
                <Home size={30} />
              </div>
            </Link>
          </NavItem>
          </Nav>
        <Nav className="ms-auto" navbar>
          <NavbarText style={{ fontSize: '1.3rem', fontFamily: 'Arial', color: '#090101', fontWeight: 'bold', }}>welcome, {user}!</NavbarText>
          <NavItem>
            <Link href="/account" legacyBehavior>
              {/* <a className="nav-link">Account</a> */}
              <div className={styles.shoppingCartIcon}>
                <CircleUserRound size={30} />
              </div>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/checkout" legacyBehavior>
            <div className={styles.shoppingCartIcon}>
                <ShoppingCart size={30} /> 
                {cart.items && cart.items.length > 0 && <div className="cart-badge">{cartQuantity}</div>}
              </div>
              {/* <a className="nav-link">Checkout</a> */}
            </Link>
          </NavItem>
        </Nav>
      </Navbar>
      )}
      <Container style={{ marginTop: "60px" }}>{children}</Container>
      <style jsx>{`
  .cart-icon-container {
    position: relative;
    margin-right: 20px; /* Adjust margin as needed */
  }

  .cart-badge {
    position: absolute;
    top: 14px; /* Adjust top position as needed */
    right: 10px; /* Adjust right position as needed */
    background-color: rgb(203, 24, 0); /* Set background color */
    color: white; /* Set text color */
    border-radius: 50%; /* Make it circular */
    width: 20px; /* Set width and height */
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px; /* Adjust font size */
  }
`}</style>
    </div>
  );
};

export default Layout;