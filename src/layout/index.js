import React from "react";
import Loader from "react-loader-spinner";
import styled from "styled-components";

import ButtonLink from "../Components/_shared/ButtonLink";
import { Container } from "../Components/_shared/Container";
import {
  useIsAuthorized,
  useIsUserLoading,
  useStore,
} from "../stores/hooks/useStore";

const Navbar = styled.div`
  width: 100vw;
  position: sticky;

  background-color: #007bff;
`;
const StyledContainer = styled(Container)`
  padding: 0.3rem 0;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;

  justify-content: space-between;
  align-items: center;
  color: white;
`;

const ButtonWrapper = styled.div`
  display: flex;

  align-items: center;
`;

const NameText = styled.span`
  display: inline-block;

  font-weight: bold;
  white-space: nowrap;
`;

const Layout = ({ children }) => {
  const loading = useIsUserLoading();
  const isAuth = useIsAuthorized();
  const store = useStore();

  const type = store.userStore.user ? store.userStore.user.type : null;
  const name = store.userStore.user ? store.userStore.user.name : null;

  if (loading) {
    return <Loader type="Puff" color="#00BFFF" height={100} width={100} />;
  }

  if (!isAuth) {
    return <React.Fragment>{children}</React.Fragment>;
  }

  return (
    <React.Fragment>
      <Navbar bg="primary" sticky="top">
        <StyledContainer>
          <Wrapper>
            <NameText>{name}</NameText>
            <ButtonWrapper>
              <ButtonLink variant="primary" label="Perfil" to="/profile" />
              <ButtonLink
                variant="primary"
                label="Meus Pacientes"
                to={`/${type}`}
              />
            </ButtonWrapper>
          </Wrapper>
        </StyledContainer>
      </Navbar>
      {children}
    </React.Fragment>
  );
};

export default Layout;
