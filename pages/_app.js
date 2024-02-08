import Layout from "../components/layout"
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
