import { ApolloClient, InMemoryCache } from "@apollo/client";
import React from "react";
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

const STRAPI_URL = process.env.STRAPI_URL || "https://capstone17-3fc1d2cfc034.herokuapp.com";
console.log(`URL: ${STRAPI_URL}`);

const client = new ApolloClient({
  uri: `${STRAPI_URL}/graphql`,
  cache: new InMemoryCache(),
});

export default function RestaurantDishes({ restaurant }) {
  return (
    <div>Hello </div>
  )};
//     <div>
//       <h1>{restaurant.name}</h1>
//       <Row>
//         {restaurant.dishes.map((dish, index) => (
//           <Col key={index} xs="6" sm="4">
//             <Card>
//               <CardBody>
//                 <CardTitle>{dish.name}</CardTitle>
//                 <CardText>${dish.price}</CardText>
//                 <CardText>{dish.description}</CardText>
//                 <CardImg
//                   top={true}
//                   style={{ height: 200 }}
//                   src={`${STRAPI_URL}${dish.image}`}
//                 />
//                 <Button>Add to Cart</Button>
//               </CardBody>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </div>
//   );
// }

export async function getStaticPaths() {
  const { data } = await client.query({ query: GET_ALL_SLUGS });

  const paths = data.restaurants.data.map((restaurant) => {
    return { params: { slug: restaurant.attributes.urlSlug } };
  });

  return {
    paths,
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
        name: attrs.name,
        dishes,
      },
    },
  };
}
