import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Redirect, withRouter } from "react-router";
import styled from "styled-components";

import { Container } from "../_shared/Container";
import Logo from "../Logo";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  flex-direction: column;
`;

const StyledForm = styled(Form)`
  min-width: 500px;
  padding: 1rem;

  display: flex;
  flex-direction: column;

  background-color: #007bff;
  box-shadow: 0 0 1em gray;
  color: white;
  border-radius: 0.5rem;
`;

const ButtonsControl = styled(Form)`
  display: flex;
  justify-content: space-between;
`;

class Login extends Component {
  constructor(props) {
    super(props);

    this.props = props;

    this.state = {
      email: "",
      password: "",
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = this.state;

    const { store, history } = this.props;

    const { response, message } = await store.userStore.login({
      email,
      password,
    });

    if (response) {
      history.push(`${store.userStore.user.type}`);
    }

    if (!response) {
      alert(message);
    }
  };

  routeChange = () => {
    const { history } = this.props;
    history.push("/cadastro");
  };

  render() {
    if (this.props.store.userStore.isAuthorized) {
      return <Redirect to={`/${this.props.store.userStore.user.type}`} />;
    }
    return (
      <Container>
        <Wrapper>
          <StyledForm onSubmit={this.handleSubmit} id="login">
            <Logo />
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                autoFocus
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
              />
            </Form.Group>
            <ButtonsControl>
              <Button
                className="btn btn-primary"
                disabled={!this.validateForm()}
                type="submit"
                form="login"
              >
                Login
              </Button>
              <Button className="btn btn-primary" onClick={this.routeChange}>
                Cadastrar
              </Button>
            </ButtonsControl>
          </StyledForm>
        </Wrapper>
      </Container>
    );
  }
}

export default withRouter(inject("store")(observer(Login)));
