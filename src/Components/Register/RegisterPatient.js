import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { FormControl, FormGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Loader from "react-loader-spinner";
import { withRouter } from "react-router";

class RegisterPatient extends Component {
  constructor(props) {
    super(props);

    this.state = {
      birthday: "",
      name: "",
      cpf: "",
      weight: "",
      loading: false,
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { birthday, name, cpf, weight } = this.state;
    try {
      this.setState({ loading: true });
      await this.props.store.userStore.addPatient({
        birthday,
        name,
        cpf,
        weight,
      });
      this.setState({ loading: false });
    } catch (error) {
      alert(error);
    }
  };

  handleControl = (e) => {
    const { value, id } = e.target;
    this.setState({ [id]: value });
  };

  render() {
    if (this.state.loading) {
      return <Loader type="Puff" color="#00BFFF" height={100} width={100} />;
    }
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Form.Label>Nome</Form.Label>
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
          <Form.Label>Peso</Form.Label>
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
          <Form.Label>CPF</Form.Label>
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
          <Form.Label>Data de nascimento</Form.Label>
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

export default withRouter(inject("store")(observer(RegisterPatient)));
