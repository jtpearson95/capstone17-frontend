import {
  Button,
  Row,
  Col,
  Card,
  CardTitle,
  CardBody,
  List,
  Table,
} from "reactstrap";
import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import MyContext from "../components/context";
// import { GET_ORDERS } from "../graphql/queries";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { logoutUser } from "../components/auth";
import styles from '../styles/Home.module.css';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";

const User = ({allOrders}) => {
  console.log('All Orders ', allOrders);
  const router = useRouter();
  const { user, setUser } = useContext(MyContext);
  const { email, setEmail } = useContext(MyContext);
  const { isAuthenticated, setIsAuthenticated } = useContext(MyContext);

  const filteredOrders = allOrders.filter(order => order.attributes.email === email);
  console.log('Filtered Orders:', filteredOrders);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to the login/register page if not authenticated
      router.push('/register'); // Change 'login' to the actual route for login/register
    }
  }, [isAuthenticated]);

  const goToRegister = () => {
    setUser(null);
  setEmail(null);
  setIsAuthenticated(false);
    router.push("/register");
  };

  //if user exists and is = allUsers.username, return that allUsers.username and email

  return (
    <div className="container">
      {isAuthenticated ? (
      <div className="mb-4">
        <Row className="top-row">
  <Col>
    <CardTitle tag="h5" style={{ color: 'white', fontSize: '4rem', fontFamily: 'CHEESE PIZZA, sans-serif', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    eat fresh . . . eat local . . . eat deliciously 
    </CardTitle>
  </Col>
</Row>
      </div>
      ) : (
        // Render a message or redirect to another page for non-authenticated users
        <p>You are not authenticated. Please log in or register.</p>
        )}
      <Row className="bottom-row">
        <Col sm="4">
          <Card body style={{ height: "300px",  }}>
          <CardTitle tag="h5" style={{ color: 'rgb(203, 24, 0)', fontSize: '2rem', fontFamily: 'CHEESE PIZZA, sans-serif' }}>🍕 Account Information</CardTitle>
            <List type="unstyled">
              <li style={{ marginBottom: '10px' }}><b>name:</b> {user}</li>
              <li><b>email:</b> {email}</li>
            </List>
            <hr />
            <List type="unstyled">
              <li><b>password:</b> ********</li>
            </List>
            <Button color="dark" style={{ width: '150px', margin: 'auto',  }} onClick={() => { goToRegister(); logoutUser(); }}>
              Log Out
            </Button>
          </Card>
        </Col>
        <Col sm="8">
          <Card body style={{ height: "300px" }}>
          <CardBody style={{ overflowY: 'auto' }}>
          <CardTitle tag="h5" style={{ color: 'rgb(203, 24, 0)', fontSize: '2rem', fontFamily: 'CHEESE PIZZA, sans-serif' }}>🍕 Order history</CardTitle>
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                {filteredOrders.map((order, index) => (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{formatDate(order.attributes.createdAt)}</td>
            <td>${(order.attributes.amount / 100).toFixed(2)}</td>
          </tr>
        ))}
                </tbody>
              </Table>
              </CardBody>
          </Card>
        </Col>
      </Row>
      <style jsx>{`
        .container {
          padding-top: 5px;
        }
      `}</style>
      <style jsx global>{`
  body {
    background-color: #e7f1fc; /* Set your desired background color here */
    margin: 0; /* Reset margin */
    font-family: 'Arial', sans-serif; /* Set your desired font family */
    background-image: url('restaurant_vegetables.jpg');
    background-size: cover; /* Adjust to cover the entire container */
    background-position: center;
  }

  .container {
    padding-top: 20px;
  }
`}</style>
    </div>
  );
};

export default User;

const GET_ORDERS = gql`
query {
  orders (sort: "createdAt:desc", pagination: { limit: 100 }) {
    data {
      id
      attributes {
        email
        amount
        createdAt
        dishes
      }
    }
  }
}
`
// export const dynamic = 'force-dynamic';
//export const revalidate = 1; //revalidate api every 1 second
export async function getStaticProps(context) {

  try {
    const client = new ApolloClient({
      uri: `${STRAPI_URL}/graphql`,
      cache: new InMemoryCache({ resultCaching: false }),
    });

    const { data } = await client.query({
      query: GET_ORDERS,
    });

    return {
      props: {
        allOrders: data.orders.data,
      },
      revalidate: 1,
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return {
      props: {
        allOrders: [],
      },
      revalidate: 1,
    };
  }
}
