import { ApolloClient, InMemoryCache } from "@apollo/client";
import React, { useState, useContext } from 'react';
import { GET_ALL_SLUGS, GET_RESTAURANT_DISHES } from "../graphql/queries";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Col,
  Row,
  CardImg,
  Button
} from "reactstrap";
import MyContext from "../components/context";
import styles from "../styles/Home.module.css";

const STRAPI_URL = pprocess.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
console.log(`URL: ${STRAPI_URL}`);

const client = new ApolloClient({
  uri: `${STRAPI_URL}/graphql`,
  cache: new InMemoryCache(),
});

export default function RestaurantDishes({ restaurant }) {
  const { cart, setCart } = useContext(MyContext);

  const addToCart = (dish) => {
    setCart((prevCart) => {
      // const existingCartItemIndex = prevCart.items.findIndex(item => item.name === dish.name);
      const existingCartItemIndex = prevCart.items ? prevCart.items.findIndex(item => item.name === dish.name) : -1;
  
      if (existingCartItemIndex !== -1) {
        // If item already exists in the cart, update the quantity
        const updatedItems = [...(prevCart.items || [])];
        updatedItems[existingCartItemIndex].quantity += 1;
        const updatedTotalAmount = prevCart.totalAmount + dish.price;
  
        const newCart = {
          items: updatedItems,
          totalAmount: updatedTotalAmount,
        };
  
        console.log('After update:', newCart);
        return newCart;
      } else {
        // If item does not exist in the cart, add a new item
        const updatedItems = [...(prevCart.items || []), { name: dish.name, price: dish.price, quantity: 1 }];
        const updatedTotalAmount = prevCart.totalAmount + dish.price;
  
        const newCart = {
          items: updatedItems,
          totalAmount: updatedTotalAmount,
        };
  
        console.log('After update:', newCart);
        return newCart;
      }
    });
  };

  return (
    <div className="container">
      <h1 className={styles.title}>{restaurant.name}</h1>
      <Row>
        {restaurant.dishes.map((dish, index) => (
          <Col key={index} xs="6" sm="4">
            <div className="card" >
            {/* <Card> */}
              <CardBody>
              <CardImg
                  top={true}
                  style={{ height: 200, objectFit: 'cover' }}
                  src={`${STRAPI_URL}${dish.image}`}
                />
                <h3 style={{ fontWeight: 'bold', marginTop: '10px' }}>{dish.name}</h3>
                <p style={{ fontSize: '1.1rem', marginLeft: '0', marginBottom: '5px' }}>{dish.description}</p>
                <div className="price-and-button">
            <CardText style={{ fontSize: '1.5rem', marginLeft: '0', marginBottom: '5px', fontWeight: 'bold' }}>
              ${dish.price}
            </CardText>
            <Button
            color="dark"
              onClick={() => addToCart(dish)}
              style={{ marginLeft: 'auto', display: 'block',}}
            >
              Add to Cart
            </Button>
          </div>
              </CardBody>
            {/* </Card> */}
            </div>
          </Col>
        ))}
      </Row>
      <style jsx>{`
          .container {
            padding-top: 20px;
          }

          .price-and-button {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 10px;
          }


          .card {
            margin: 1rem;
            flex-basis: 45%;
            padding: 1.5rem;
            text-align: left;
            color: inherit;
            text-decoration: none;
            border: 1px solid #eaeaea;
            border-radius: 10px;
            transition:
              color 0.15s ease,
              border-color 0.15s ease;
          }

          .card:hover,
          .card:focus,
          .card:active {
            color: rgb(203, 24, 0);
            border-color: rgb(203, 24, 0);
          }

          .card h3 {
            margin: 0 0 1rem 0;
            font-size: 1.5rem;
          }

          .card p {
            margin: 0;
            font-size: 1.25rem;
            line-height: 1.5;
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


export async function getStaticPaths() {
  const { data } = await client.query({ query: GET_ALL_SLUGS });

  const paths = data.restaurants.data.map((restaurant) => {
    return { params: { slug: restaurant.attributes.urlSlug } };
  });

  return {
    paths: paths || [],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { data } = await client.query({
    query: GET_RESTAURANT_DISHES,
    variables: { slugUrl: params.slug },
  });

  console.log(data);
  const attrs = data.restaurants.data[0].attributes;

  const dishes = attrs.dishes.data.map((dish) => ({
    name: dish.attributes.name,
    price: dish.attributes.price,
    description: dish.attributes.description,
    image: dish.attributes.image.data.attributes.url,
    // Add other dish properties as needed
  }));

  return {
    props: {
      restaurant: {
        name: attrs.name || null,
        dishes: dishes || null,
      },
    },
  };
}
