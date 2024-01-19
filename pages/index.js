"use client";
import styles from '../styles/Home.module.css';
import React, {useState, useContext} from "react";
import { HttpLink, InMemoryCache, ApolloProvider, ApolloClient } from "@apollo/client";
import MyContext from '../components/context';
import { useRouter } from 'next/router';
import { Button } from 'reactstrap';

function Home() {

const STRAPI_URL = process.env.STRAPI_URL || "https://capstone17-3fc1d2cfc034.herokuapp.com/";
console.log(`URL: ${STRAPI_URL}`);

const [query, setQuery] = useState("");
const link = new HttpLink({ uri: `${STRAPI_URL}/graphql`})
const cache = new InMemoryCache()
const client = new ApolloClient({link,cache});

const { user, setUser } = useContext(MyContext);
const router = useRouter();

const goToUser = () => {
  router.push('/user');
  //toggle();
};

  return (
    <ApolloProvider client={client}>
      <Button color="primary" onClick={goToUser}>
    User
  </Button>
      <div>{user}</div>
         <div className={styles.container}>

      <main>
        <h1 className={styles.title}>
          Welcome to <a>Restaurant App!</a>
        </h1>

        <p className={styles.description}>
          Get started by checking out these <code>restaurants</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Restaurant 1 &rarr;</h3>
            <p>Check out their dishes here, indian food</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Restaurant 2 &rarr;</h3>
            <p>Check out their dishes here, italian food</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h3>Restaurant 3 &rarr;</h3>
            <p>Discover their seafood here</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Restaurant 4 &rarr;</h3>
            <p>
              Discover their food here
            </p>
          </a>
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family:
            Menlo,
            Monaco,
            Lucida Console,
            Liberation Mono,
            DejaVu Sans Mono,
            Bitstream Vera Sans Mono,
            Courier New,
            monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
    </ApolloProvider>
  );
}

export default Home;