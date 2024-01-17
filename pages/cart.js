import React, { useState, useContext } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Card, CardText, CardTitle } from 'reactstrap';
import { useRouter } from 'next/router';
import AppContext from "../components/context";


function Checkout(args) {
  const {isAuthenticated} = useContext(AppContext);
  const [modal, setModal] = useState(false);
  const router = useRouter();

  const goToOrders = () => {
    router.push('/orders');
    toggle();
  };

  const goToHome = () => {
    router.push('/');
    toggle();
  };

  const toggle = () => setModal(!modal);

  return (
    <div className="container">
      <div class="mb-4">
          <Row className="mb-8" >
        <Col>
          <Card body>
            <CardText>
              Shopping Cart
            </CardText>
          </Card>
        </Col>
      </Row>
      </div>
<Row className="bottom-row">
  <Col sm="8">
    <Card body style={{ height: '300px' }}>
      <CardTitle tag="h5">
        Cart
      </CardTitle>
    </Card>
  </Col>
  <Col sm="4">
    <Card body style={{ height: '300px' }}>
      <CardTitle tag="h5">
        Total
      </CardTitle>
      <CardText>
       amount
      </CardText>
      <Button color="primary" onClick={toggle}>
        Order
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          Success message! Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
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
    </Card>
  </Col>
</Row>
<style jsx>{`
        .container {
          padding-top: 20px;
        }
      `}</style>
      </div>
    
  );
}

export default Checkout;