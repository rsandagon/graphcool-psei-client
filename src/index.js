//import './assets/css/main.css';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { Route, BrowserRouter } from 'react-router-dom';
import App from './App';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { createHttpLink } from "apollo-link-http";
import { CachePersistor } from "apollo-cache-persist"
import { defaults, resolvers } from './graphql/UI';


const cache = new InMemoryCache({
  logger: console.log,
  loggerEnabled: true,
});

const persistor = new CachePersistor({
  cache,
  storage: window.sessionStorage,
  debug: true,
})

const stateLink = withClientState({ resolvers, cache, defaults });
const httpLink = createHttpLink({ uri: "https://api.graph.cool/simple/v1/cjflunf0n3ndi010089cphl2g" });

const link = ApolloLink.from([
  stateLink,
  httpLink
]);

const client = new ApolloClient({ cache, link })

class Root extends Component {
  constructor(props) {
    super(props)
    this.restoreState = this.restoreState.bind(this)
    this.state = {
      restored: false,
    }
  }

  restoreState(){
    this.setState({ restored: true })
  }

  componentDidMount() {
    persistor.restore()
      .then(this.restoreState())
  }

  render() {
    let content = null
    if (!this.state.restored) {
      content = <div>Loading</div>
    } else {
      content = (
        <ApolloProvider client={client}>
          <BrowserRouter>
            <Route path="" component={App} />
          </BrowserRouter>
        </ApolloProvider>
      )
    }

    return content
  }
}

ReactDOM.render(
  <Root />,
  document.getElementById("root"),
)
