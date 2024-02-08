import React, { useState, useContext, useEffect } from "react";
import { FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CardSection from "./cardSection";
import Cookies from "js-cookie";
import MyContext from "./context";
import axios from "axios";

function CheckoutForm() {
  const [data, setData] = useState({
    address: "",
    city: "",
    state: "",
  });
  const [error, setError] = useState("");
  const { cart } = useContext(MyContext);
  const { email } = useContext(MyContext);
  const stripe = useStripe();
  const elements = useElements();
  console.log("Cart ", cart);
  const [formValid, setFormValid] = useState(false)

  ///////////////////////////////
  const [submitted, setSubmitted] = useState(false);
  
  const [errors, setErrors] = useState({
    address: "",
    city: "",
    state: "",
  });

  useEffect(() => {
    validateForm();
  }, [data]); 

  function onChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log("Data after change:", data);
    validateForm();
  }

  const validateForm = () => {
    const errorsCopy = { ...errors };
    errorsCopy.address = data.address.trim() === "" ? "Address is required" : "";
    errorsCopy.city = data.city.trim() === "" ? "City is required" : "";
    errorsCopy.state = data.state.trim() === "" ? "State is required" : "";

    setErrors(errorsCopy);

    const isValid = Object.values(errorsCopy).every((error) => error === "");
    setFormValid(isValid);
  }

  async function submitOrder(formData) {
    // e.preventDefault();
    const cardElement = elements.getElement(CardElement);
    console.log("Form Data:", formData);
    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
    const stripeToken = await stripe.createToken(cardElement);
    console.log('STRIPE TOKEN HERE: '+ JSON.stringify(stripeToken));

    /////////////////////////
    setSubmitted(true);

    if (formValid && cardElement) {
      const userToken = Cookies.get("token");

      console.log("User Token:", userToken);
      console.log("STRIPE Token:", stripeToken);

      const requestBody = {
        data: {
          amount: Number(Math.round(cart.totalAmount + "e2") + "e-2"),
          dishes: cart.items,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          email: email,
          token: stripeToken.token.id
        },
      };

      console.log("Form requestBody", JSON.stringify(requestBody));

      try {
        console.log("userToken:", userToken);

        const response = await axios.post(
          `${STRAPI_URL}/api/orders`,
          requestBody,
          {
            headers: userToken
              ? {
                  Authorization: `Bearer ${userToken}`,
                  "Content-Type": "application/json",
                }
              : {},
            withCredentials: true,
          }
        );
        console.log("Response data:", response.data);
        // Handle the response
        Cookies.set("response token", response.data.jwt);
        console.log("Request Body:", requestBody);

      } catch (error) {
        console.error("Error submitting order:", error);
        if (error.response && error.response.data) {
          console.log("Response data:", error.response.data);
        }
      } 
    }
  }

  return (
    <div className="paper">
      <h5 style={{ fontWeight: "bold" }}>Your information:</h5>
      <FormGroup style={{ display: "flex" }}>
        <div
          style={{
            flex: "1",
            marginRight: 0,
            marginBottom: "-15px",
            marginTop: "10px",
          }}
        >
          <Label style={{ marginRight: 10, marginBottom: "-15px" }}>
            Address
          </Label>
          <Input name="address" onChange={onChange} invalid={submitted && !!errors.address} />
          <FormFeedback style={{ fontSize: '14px', marginTop: '-15px' }}>{submitted && errors.address}</FormFeedback>
        </div>
      </FormGroup>
      <FormGroup style={{ display: "flex" }}>
        <div style={{ flex: "0.65", marginRight: "6%" }}>
          <Label style={{ marginRight: 10, marginBottom: "-15px" }}>City</Label>
          <Input name="city" onChange={onChange} invalid={submitted && !!errors.city}/>
          <FormFeedback style={{ fontSize: '14px', marginTop: '-15px' }}>{submitted && errors.city}</FormFeedback>
        </div>
        <div style={{ flex: "0.23", marginRight: 0 }}>
          <Label
            style={{ flex: "0.90", marginRight: 10, marginBottom: "-15px" }}
          >
            State
          </Label>
          <Input name="state" onChange={onChange} invalid={submitted && !!errors.state}/>
          <FormFeedback style={{ fontSize: '14px', marginTop: '-15px' }}>{submitted && errors.state}</FormFeedback>
        </div>
      </FormGroup>

      <CardSection data={data} stripeError={error} submitOrder={submitOrder} formValid={formValid} />

      <style jsx global>
        {`
          .paper {
            border: 1px solid lightgray;
            box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
              0px 1px 1px 0px rgba(0, 0, 0, 0.14),
              0px 2px 1px -1px rgba(0, 0, 0, 0.12);
            height: 500px;
            padding: 30px;
            background: #fff;
            border-radius: 6px;
          }
          .form-half {
            flex: 0.5;
          }
          * {
            box-sizing: border-box;
          }
          body,
          html {
            background-color: #f6f9fc;
            font-size: 18px;
            font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
          }
          .Checkout {
            margin: 0 auto;
            max-width: 800px;
            box-sizing: border-box;
            padding: 0 5px;
          }
          label {
            color: #6b7c93;
            font-weight: 300;
            letter-spacing: 0.025em;
          }
          form {
            margin-bottom: 40px;
            padding-bottom: 40px;
            border-bottom: 3px solid #e6ebf1;
          }
          input,
          .StripeElement {
            display: block;
            background-color: #f8f9fa !important;
            margin: 10px 0 20px 0;
            max-width: 500px;
            padding: 5px 14px;
            font-size: 1em;
            font-family: "Source Code Pro", monospace;
            box-shadow: rgba(50, 50, 93, 0.14902) 0px 1px 3px,
              rgba(0, 0, 0, 0.0196078) 0px 1px 0px;
            border: 0;
            outline: 0;
            border-radius: 4px;
            background: white;
          }
          input::placeholder {
            color: #aab7c4;
          }
          input:focus,
          .StripeElement--focus {
            box-shadow: rgba(50, 50, 93, 0.109804) 0px 4px 6px,
              rgba(0, 0, 0, 0.0784314) 0px 1px 3px;
            -webkit-transition: all 150ms ease;
            transition: all 150ms ease;
          }
          .StripeElement.IdealBankElement,
          .StripeElement.PaymentRequestButton {
            padding: 0;
          }
        `}
      </style>
    </div>
  );
}

export default CheckoutForm;
