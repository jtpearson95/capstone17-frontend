import React, { useState, useContext, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Card, CardText, CardTitle } from 'reactstrap';
import { useRouter } from 'next/router';
import MyContext from "../components/context";
import Cart from "../components/cart";
import CheckoutForm from "../components/checkoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";


function Checkout(args) {
  const { cart, setCart } = useContext(MyContext);
  const { isAuthenticated } = useContext(MyContext);
  const [modal, setModal] = useState(false);
  const router = useRouter();

  const stripePromise = loadStripe(
    "pk_test_51OPXMbIpCo7yP5rrWYblVHuKccpGqqxoIoJTIy9uhGPNVGbcmO6Ttftk3WgRNjSyF2JxLeICAMguY33zYysfBxQS00TjQpyPVo"
  )

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to the login/register page if not authenticated
      router.push('/register'); // Change 'login' to the actual route for login/register
    }
  }, [isAuthenticated]);

  const goToOrders = () => {
    router.push('/account');
    toggle();
  };

  const goToHome = () => {
    router.push('/');
    toggle();
  };

  const toggle = () => setModal(!modal);

  return (
    <div className="container">
      {isAuthenticated ? (
      <div className="mb-4">
         <Row className="top-row">
  <Col>
    <CardTitle tag="h5" style={{ color: 'rgb(203, 24, 0)', fontSize: '4rem', fontFamily: 'CHEESE PIZZA, sans-serif', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
    Checkout Here . . . 
    </CardTitle>
  </Col>
</Row>
      </div>
      ) : (
         <p>You are not authenticated. Please log in or register.</p>
         )}
<Row className="bottom-row">
  <Col sm="5">
      <Cart body style={{ height: '300px' }}/>
  </Col>
  <Col sm="7">
  <div >
      <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>

      <Button color="primary" onClick={toggle}>
        Order
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Success Message!</ModalHeader>
        <ModalBody>
          Thank you! Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={goToOrders}>
            Go to My Orders
          </Button>{' '}
          <Button color="secondary" onClick={goToHome}>
            Go to Home
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  </Col>
</Row>
<style jsx>{`
        .container {
          padding-top: 20px;
        }
      `}</style>
      <style jsx global>{`
  body {
    background-color: #e7f1fc; /* Set your desired background color here */
    margin: 0; /* Reset margin */
    font-family: 'Arial', sans-serif; /* Set your desired font family */
  }

  .container {
    padding-top: 20px;
  }
`}</style>
      </div>
    
  );
}

export default Checkout;