import React, { useState, useContext } from "react";
import { Card, CardBody, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { registerUser, loginUser } from "../components/auth";
import MyContext from '../components/context';


const Register = () => {
  const [data, setData] = useState({ email: "", username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const { user, setUser } = useContext(MyContext);
  
    return (
    <div className="container">
      <main>
        <div className="content">
        <h1>
          Welcome to <a href="https://nextjs.org">Restaurant App!</a>
        </h1>
        <p >
          welcome and make an account for this cool new app where you can order food from local restaurants
        </p>
        </div>
      </main>

      <Card
        className="my-2"
        color="primary"
        inverse
        style={{
          width: '18rem'
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
  </FormGroup>
  {' '}
  <Button  
  color="info"
  disabled={loading}
  onClick={() => {
    console.log(data.username, data.email, data.password)
    setLoading(true);
    registerUser(data.username, data.email, data.password)
      .then((res) => {
        // set authed user in global context object
        setLoading(false);
        console.log(`registered user: ${JSON.stringify(res.data)}`)
      })
      .catch((error) => {
        console.log(`error in register: ${error}`)
        //setError(error.response.data);
        setLoading(false);
      });
  }}
  >
    {loading ? "Loading.." : "Submit"}
  </Button>
  <Button
  style={{ float: "right", width: 120 }}
                      color="primary"
                      onClick={() => {
                        setLoading(true);
                        console.log("getting ready to log in")
                        loginUser("merlin@merlin.com", data.password)
                          .then((res) => {
                            console.log("Back from login")
                            setLoading(false);
                            // set authed User in global context to update header/app state
                            const user = res.data.user.username;
                            setUser(user);
                            console.log("user " + user)
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
          padding: 8rem 1rem;
        }

        main {
          flex: 1;
        }

        .content {
          max-width: 600px;
        }
      `}</style>
      </div>
    );
};

export default Register;