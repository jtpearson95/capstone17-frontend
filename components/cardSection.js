import React, { useContext, useState } from "react";
import { CardElement } from "@stripe/react-stripe-js";
import MyContext from "./context";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { useRouter } from 'next/router';

function CardSection(props) {
  const { cart, setCart } = useContext(MyContext);
  const [ modal, setModal ] = useState(false);
  const router = useRouter();

  const toggle = () => setModal(!modal);

  const clearCart = () => {
    setCart([]);
  };

  const handleOrder = async () => {
    try {
      await props.submitOrder(props.data);

      clearCart();
      toggle();
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  const goToOrders = () => {
    router.push('/account');
    toggle();
  };

  const goToHome = () => {
    router.push('/');
    toggle();
  };

  return (
    <div>
      <div>
        <label htmlFor="card-element">Credit or debit card</label>

        <div>
          <fieldset style={{ border: "none" }}>
            <div className="form-row">
              <div id="card-element" style={{ width: "100%" }}>
              <CardElement
                  options={{
                    style: { width: "100%", base: { fontSize: "18px" } },
                  }}
                />
              </div>
              <br />
              <div className="order-button-wrapper">
                {/* <button onClick={() => props.submitOrder(props.data)}>Confirm order</button> */}
                <button onClick={handleOrder}>Confirm order</button>
              </div>
              <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Success Message!</ModalHeader>
        <ModalBody>
          Thank you for your order! You will be notified once your order is ready and on its way. Bon appetit!
        </ModalBody>
        <ModalFooter>
          <Button color="dark" onClick={goToOrders}>
            Go to My Orders
          </Button>{' '}
          <Button color="dark" onClick={goToHome}>
            Go to Home
          </Button>
        </ModalFooter>
      </Modal>
              {props.stripeError ? (
                <div>{props.stripeError.toString()}</div>
              ) : null}
              <div id="card-errors" role="alert" />
            </div>
          </fieldset>
        </div>
      </div>
      <style jsx>
        {`
         .order-button-wrapper {
          display: flex;
          width: 100%;
          align-items: flex-end;
          justify-content: center; /* Change this line to center the button to the left */
        }
        `}
      </style>
    </div>
  );
}
export default CardSection;