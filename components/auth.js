import { useEffect } from "react";
import Router from "next/router";
import Cookie from "js-cookie";
import axios from "axios";

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";


export const registerUser = (username, email, password) => {
    console.log(username, email, password)

    if (typeof window === "undefined") {
        return;
    }
    return new Promise((resolve, reject) => {
        axios
        .post(`${STRAPI_URL}/api/auth/local/register`, { username, email, password})
        .then((res) => {
            Cookie.set("token", res.data.jwt);

            resolve(res);

            Router.push("/");
        })
        .catch((error) => {
            reject(error);
        });
    });
};

export const loginUser = ( identifier, password) => {
    console.log("inside login user")
    //prevent function from being ran on the server
    if (typeof window === "undefined") {
      return;
    }
  
    return new Promise((resolve, reject) => {
      axios
        .post(`${STRAPI_URL}/api/auth/local/`, { identifier, password })
        .then((res) => {
          //set token response from Strapi for server validation
          Cookie.set("token", res.data.jwt);
  
          //resolve the promise to set loading to false in SignUp form
          resolve(res);
          //redirect back to home page for restaurance selection
          Router.push("/");
        })
        .catch((error) => {
          //reject the promise and pass the error object back to the form
          reject(error);
        });
    });
  };

