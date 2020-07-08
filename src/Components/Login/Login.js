import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { withRouter } from "react-router";

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
      history.push(`${store.userStore.type}`);
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
    return (
      <div className="Login">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="email">
            <Form.Control
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Control
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </Form.Group>
          <Button
            className="btn btn-primary"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
          <Button className="btn btn-primary" onClick={this.routeChange}>
            Cadastrar
          </Button>
        </Form>
      </div>
    );
  }
}

export default withRouter(inject("store")(observer(Login)));
