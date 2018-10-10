import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

//components
import BookList from "./components/BookList";

//apollo client setup
const GQL_URL = "http://localhost:4000/graphql"; //the endpoint we're gonna make requests to
const client = new ApolloClient({
  uri: GQL_URL
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>The Graphql's Library</h1>
          <BookList />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
