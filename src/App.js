import { Provider } from "mobx-react";
import React from "react";
import { HashRouter as Router } from "react-router-dom";

import Layout from "./layout";
import Routes from "./routes";
import rootStore from "./stores/rootStore";

const basePath = process.env.BASE_PATH || "/";

const App = () => {
  return (
    <Router basename={basePath}>
      <Provider store={rootStore}>
        <Layout>
          <Routes />
        </Layout>
      </Provider>
    </Router>
  );
};

export default App;
