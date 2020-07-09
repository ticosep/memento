import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";

import {
  useIsAuthorized,
  useIsUserLoading,
  useStore,
} from "../stores/hooks/useStore";

const Layout = ({ children }) => {
  const loading = useIsUserLoading();
  const isAuth = useIsAuthorized();
  const store = useStore();

  const type = store.userStore.user ? store.userStore.user.type : null;

  if (loading) {
    return <Loader type="Puff" color="#00BFFF" height={100} width={100} />;
  }

  if (!isAuth) {
    return <React.Fragment>{children}</React.Fragment>;
  }

  return (
    <React.Fragment>
      <Navbar bg="primary" sticky="top">
        <Nav className="mr-auto">
          <Link to="/profile">Perfil</Link>
          <Link to={`/${type}`}>Meus Pacientes</Link>
        </Nav>
      </Navbar>
      {children}
    </React.Fragment>
  );
};

export default Layout;
