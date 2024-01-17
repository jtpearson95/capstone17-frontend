import { Button, Row, Col, Card, CardTitle, CardText, List, Table } from 'reactstrap';
import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
// import AppContext from "../components/context"
import MyContext from '../components/context';


const User = () => {
  const router = useRouter();
  const { user, setUser } = useContext(MyContext);

const goToRegister = () => {
  router.push('/register');
  //toggle();
};

    return (
        
      <div className="container">
        <div className="mb-4">
          <Row className="top-row">
        <Col>
          <Card body>
            <CardText>
              welcome!
            </CardText>
            <div>{user}</div>
          </Card>
        </Col>
      </Row>
      </div>
    <Row className="bottom-row">
  <Col sm="4">
    <Card body style={{ height: '300px' }}>
      <CardTitle tag="h5">
        Account Information
      </CardTitle>
      <List type="unstyled">
  <li>
    Name
  </li>
  <li>
name  </li>
  <li>
    Email
  </li>
  <li>
    email
  </li>
  </List>
  <hr />
  <List type="unstyled">
  <li>
    Password
  </li>
  <li>
********  </li>
  </List>
  <Button color="primary" onClick={goToRegister}>
            Log Out
          </Button>
    </Card>
  </Col>
  <Col sm="8">
    <Card body style={{ height: '300px' }}>
      <CardText>
       <h3>Order history here</h3>
       <Table
>
  <thead>
    <tr>
      <th>
        #
      </th>
      <th>
        Date
      </th>
      <th>
        Amount
      </th>
      <th>
        Restaurant
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">
        1
      </th>
      <td>
        Mark
      </td>
      <td>
        Otto
      </td>
      <td>
        @mdo
      </td>
    </tr>
  </tbody>
</Table>

      </CardText>
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
  };

  export default User;