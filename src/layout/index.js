import React from "react";
import { Button } from "react-bootstrap";
import Loader from "react-loader-spinner";
import { useWindowSize } from "react-use";
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
  padding: 1rem 0;
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

const UserChildrenWrapper = styled.div`
  margin-top: 1rem;
`;

const Layout = ({ children }) => {
  const loading = useIsUserLoading();
  const isAuth = useIsAuthorized();
  const store = useStore();
  const { width } = useWindowSize();

  const type = store.userStore.user ? store.userStore.user.type : null;
  const name = store.userStore.user ? store.userStore.user.name : null;

  if (width < 768) {
    return <div>Dimesões inferiores a suportada! </div>;
  }

  if (loading) {
    return <Loader type="Puff" color="#00BFFF" height={100} width={100} />;
  }

  if (!isAuth) {
    return <React.Fragment>{children}</React.Fragment>;
  }

  return (
    <React.Fragment>
      <Navbar>
        <StyledContainer>
          <Wrapper>
            <NameText>{name}</NameText>
            <ButtonWrapper>
              <ButtonLink
                variant="primary"
                label="Meus Pacientes"
                to={`/${type}`}
              />
              <Button
                variant="primary"
                onClick={() => {
                  store.userStore.logout();
                }}
              >
                Sair
              </Button>
            </ButtonWrapper>
          </Wrapper>
        </StyledContainer>
      </Navbar>
      <UserChildrenWrapper>{children}</UserChildrenWrapper>
    </React.Fragment>
  );
};

export default Layout;
