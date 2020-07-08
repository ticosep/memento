import React, { Component } from "react";
import { FormControl, FormGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { withRouter } from "react-router";

import { app, database } from "../../services/firebase";

class CadastroPaciente extends Component {
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
    const { history } = this.props;

    try {
      // Get the current user id, then set the new "paciente" to its object in the firebase
      const user = app.auth().currentUser;

      database
        .ref("users/" + user.uid + "/pacientes")
        .push({
          name,
          birthday,
          cpf,
          weight,
        })
        .then((values) => {
          const key = values.key;
          const value = { name, birthday, cpf, weight, cuidador: user.uid };

          database
            .ref("pacientes/")
            .child(key)
            .set(value)
            .then(() => {
              const userValues = localStorage.getItem("user");
              const userValuesObj = JSON.parse(userValues);

              history.push("/" + userValuesObj.tipo);
            });
        });
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
          ></FormControl>
        </FormGroup>
        <FormGroup>
          <FormControl
            type="text"
            id="weight"
            placeholder="peso"
            onChange={this.handleControl}
            onClick={this.handleControl}
          ></FormControl>
        </FormGroup>
        <FormGroup>
          <FormControl
            type="text"
            id="cpf"
            placeholder="CPF"
            onChange={this.handleControl}
            onClick={this.handleControl}
          ></FormControl>
        </FormGroup>
        <FormGroup>
          <FormControl
            type="date"
            id="birthday"
            placeholder="Data nascimento"
            onChange={this.handleControl}
            onClick={this.handleControl}
          ></FormControl>
        </FormGroup>

        <Button type="submit"> Cadastar </Button>
      </Form>
    );
  }
}

export default withRouter(CadastroPaciente);
