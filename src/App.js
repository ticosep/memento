import { Provider } from "mobx-react";
import React from "react";
import { HashRouter as Router } from "react-router-dom";

import Routes from "./routes";
import rootStore from "./stores/rootStore";

const basePath = process.env.BASE_PATH || "/";

const App = () => {
  return (
    <Router basename={basePath}>
      <Provider store={rootStore}>
        <Routes />
      </Provider>
    </Router>
  );
};

export default App;
