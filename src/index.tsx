import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./styles/styles.css"
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
} from "@apollo/client";
import {client} from "./apollo";
import {HelmetProvider} from "react-helmet-async";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <ApolloProvider client={client}>
          <HelmetProvider>
          <App />
          </HelmetProvider>{" "}
      </ApolloProvider>
  </React.StrictMode>
);
