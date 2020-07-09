import React from "react";
import Loader from "react-loader-spinner";

import { useIsUserLoading } from "../stores/hooks/useStore";

const Layout = ({ children }) => {
  const loading = useIsUserLoading();

  if (loading) {
    return <Loader type="Puff" color="#00BFFF" height={100} width={100} />;
  }
  return <>{children}</>;
};

export default Layout;
