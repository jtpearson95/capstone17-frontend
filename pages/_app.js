import { useContext, useState } from "react";
import Head from "next/head";
import Home from "./index"
import Layout from "../components/layout"
import Cookie from "js-cookie"
import { MyProvider } from '../components/myProvider'


function MyApp(props){
  const { Component, pageProps } = props;

  return (
    <MyProvider> 
      <Layout>
          <Component {...pageProps} />
      </Layout>
    </MyProvider>
  );
  
}


export default MyApp;