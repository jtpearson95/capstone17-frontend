import React, { useState, useContext } from "react";
import { Card, CardBody, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { registerUser, loginUser } from "../components/auth";
import MyContext from '../components/context';
import backgroundImage from '../public/restaurant_vegetables.jpg';
import styles from '../styles/Home.module.css';


const Register = () => {
  const [data, setData] = useState({ email: "", username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const { user, setUser } = useContext(MyContext);
  const { email, setEmail } = useContext(MyContext);
  const { isAuthenticated, setIsAuthenticated } = useContext(MyContext);
  
    return (
      <div className="container">
        <main>
          <div className="content">
          <h1 style={{ color: 'white', fontSize: '5.8rem', fontFamily: 'CHEESE PIZZA, sans-serif' }}>
  The Restaurant App
</h1>
            <p style={{ color: 'powderblue', fontSize: '1.8rem', fontStyle: 'italic' }}>
              welcome and make an account for this cool new app where you can
              order food from local restaurants
            </p>
          </div>
        </main>

        <Card
          className="my-2"
          color="dark"
          inverse
          style={{
            width: "18rem",
          }}
        >
          <CardBody>
            <Form>
              <fieldset disabled={loading}>
                <FormGroup>
                  <Input
                    disabled={loading}
                    id="exampleUserName"
                    name="username"
                    placeholder="username"
                    type="text"
                    onChange={(e) =>
                      setData({ ...data, username: e.target.value })
                    }
                    value={data.username}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    id="exampleEmail"
                    name="email"
                    placeholder="email"
                    type="email"
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                    value={data.email}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    id="examplePassword"
                    name="password"
                    placeholder="password"
                    type="password"
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                    value={data.password}
                  />
                </FormGroup>{" "}
                <Button
                  color="secondary"
                  disabled={loading}
                  onClick={() => {
                    console.log(data.username, data.email, data.password);
                    setLoading(true);
                    registerUser(data.username, data.email, data.password)
                      .then((res) => {
                        // set authed user in global context object
                        setLoading(false);
                        setUser(data.username);
                        setEmail(data.email);
                        setIsAuthenticated(true);
                        console.log(
                          `registered user: ${JSON.stringify(res.data)}`
                        );
                      })
                      .catch((error) => {
                        console.log(`error in register: ${error}`);
                        //setError(error.response.data);
                        setLoading(false);
                      });
                  }}
                >
                  {loading ? "Loading.." : "Register"}
                </Button>
                <Button
                  style={{ float: "right", width: 120 }}
                  color="secondary"
                  onClick={() => {
                    setLoading(true);
                    console.log("getting ready to log in");
                    loginUser(data.email, data.password)
                      .then((res) => {
                        console.log("Back from login");
                        setLoading(false);
                        // set authed User in global context to update header/app state
                        const user = res.data.user.username;
                        const email = res.data.user.email;
                        setUser(user);
                        setEmail(email);
                        setIsAuthenticated(true);
                        console.log("user " + user);
                        console.log("email " + email);
                      })
                      .catch((error) => {
                        //setError(error.response.data);
                        setLoading(false);
                      });
                  }}
                >
                  {loading ? "Loading... " : "Log In"}
                </Button>
              </fieldset>
            </Form>
          </CardBody>
        </Card>
      <style jsx>{`
          .container {
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 5.4rem 1.5rem;
            height: 100%; /* Set container height to 100% of the viewport height */
          }

          main {
            flex: 1;
          }

          body,
          html {
            margin: 0;
            height: 100vh;
            width: 100vw;
          }
          .content {
            max-width: 650px;
          }

        `}</style>
         <style jsx global>{`
  body {
    background-color: #010305;; /* Set your desired background color here */
    background-image: url('restaurant_pizza.jpg');
    background-size: cover; /* Adjust to cover the entire container */
    background-position: center; /* Adjust to position the image */
    margin: 0; /* Reset margin */
    height: 100vh;
            width: 100vw;
  }

  .container {
    padding-top: 20px;
    display: flex,
    justify-content: space-around;
    align-items: center;
    padding: 8rem 1rem;
    height: 100%; /* Set container height to 100% of the viewport height */
    width: 100%;
  }
`}</style>
      </div>
    );
};

export default Register;