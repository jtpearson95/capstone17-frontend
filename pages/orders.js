import { ApolloClient, InMemoryCache } from "@apollo/client";
import Head from "next/head";
import Link from "next/link";
import { GET_RESTAURANTS } from "../graphql/queries";
import styles from "../styles/Home.module.css";
import { Col, CardImg, Row } from "reactstrap";

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";

export default function Home({ restaurants }) {
  console.log(restaurants);
  return (
    <div>
      <Head>
        <title>My blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Welcome to the Restaurant!</h1>
      <Row>
        {restaurants.map((val, i) => {
          return (
            <Col key={i} xs="6" sm="4">
              <Link key={i} href={val.attributes.urlSlug} legacyBehavior>
                <div>
                  <a>
                    <CardImg
                      top={true}
                      style={{ height: 200 }}
                      src={`${STRAPI_URL}${val.attributes.image.data.attributes.url}`}
                    />
                    <h3>{val.attributes.name}</h3>
                    <p>{val.attributes.description}</p>
                  </a>
                </div>
              </Link>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: `${STRAPI_URL}/graphql`,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: GET_RESTAURANTS,
  });

  return {
    props: {
      restaurants: data.restaurants.data,
    },
  };
}
