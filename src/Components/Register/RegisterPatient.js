import React, { Component } from "react";
import { FormControl, FormGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { withRouter } from "react-router";

import { app, database } from "../../services/firebase";

class RegisterPatient extends Component {
  constructor(props) {
    super(props);

    this.state = {
      birthday: "",
      name: "",
      cpf: "",
      weight: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { birthday, name, cpf, weight } = this.state;

    try {
    } catch (error) {
      alert(error);
    }
  };

  handleControl = (e) => {
    const { value, id } = e.target;
    this.setState({ [id]: value });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <FormControl
            type="name"
            id="name"
            placeholder="Jose da Silva"
            onChange={this.handleControl}
            onClick={this.handleControl}
            required={true}
          ></FormControl>
        </FormGroup>
        <FormGroup>
          <FormControl
            type="text"
            id="weight"
            placeholder="peso"
            onChange={this.handleControl}
            onClick={this.handleControl}
            required={true}
          ></FormControl>
        </FormGroup>
        <FormGroup>
          <FormControl
            type="text"
            id="cpf"
            placeholder="CPF"
            onChange={this.handleControl}
            onClick={this.handleControl}
            required={true}
          ></FormControl>
        </FormGroup>
        <FormGroup>
          <FormControl
            type="date"
            id="birthday"
            placeholder="Data nascimento"
            onChange={this.handleControl}
            onClick={this.handleControl}
            required={true}
          ></FormControl>
        </FormGroup>

        <Button type="submit"> Cadastar </Button>
      </Form>
    );
  }
}

export default withRouter(RegisterPatient);
