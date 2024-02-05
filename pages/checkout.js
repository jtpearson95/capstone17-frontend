import React, { useState, useContext, useEffect } from 'react';
import { Button, Row, Col, CardTitle } from 'reactstrap';
import MyContext from "../components/context";
import Cart from "../components/cart";
import CheckoutForm from "../components/checkoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useRouter } from "next/router";

function Checkout(args) {
  const { isAuthenticated } = useContext(MyContext);
  const router = useRouter();

  // const STRIPE_KEY_PK = process.env.STRIPE_KEY_PK

  const stripePromise = loadStripe("pk_test_51OPXMbIpCo7yP5rrWYblVHuKccpGqqxoIoJTIy9uhGPNVGbcmO6Ttftk3WgRNjSyF2JxLeICAMguY33zYysfBxQS00TjQpyPVo");
  // const stripePromise = loadStripe(`${STRIPE_KEY_PK}`);
  // console.log('stripe promise', stripePromise);
  // console.log('stripe key', STRIPE_KEY_PK)

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to the login/register page if not authenticated
      router.push('/register'); // Change 'login' to the actual route for login/register
    }
  }, [isAuthenticated]);

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