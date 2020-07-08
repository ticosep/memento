import React from "react";
import { FormControl, FormGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { withRouter } from "react-router";

import { app, database } from "../../services/firebase";

const Register = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password, birthday, name, cpf, type, patients } = this.state;

    //Try to push data to the firebase after it creates a user by the default google createUser's
    try {
      app
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
          // Create a user in your Firebase realtime database
          return database.ref("users/" + authUser.user.uid).set({
            name,
            email,
            birthday,
            cpf,
            type,
            patients,
          });
        });
      this.props.history.push("/");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Form onSubmit={this.handleSubmit}>
      <FormGroup>
        <FormControl
          type="email"
          autoComplete="email"
          id="email"
          placeholder="name@example.com"
          onChange={this.handleControl}
          onClick={this.handleControl}
        ></FormControl>
      </FormGroup>
      <FormGroup>
        <FormControl
          type="password"
          id="password"
          placeholder="senha"
          onChange={this.handleControl}
          onClick={this.handleControl}
        ></FormControl>
      </FormGroup>
      <FormGroup>
        <FormControl
          type="name"
          id="name"
          placeholder="Nome"
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
      <FormGroup>
        <FormControl
          as="select"
          id="type"
          onChange={this.handleControl}
          onClick={this.handleControl}
          defaultValue="Medico"
        >
          <option>Medico</option>
          <option>Cuidador</option>
        </FormControl>
      </FormGroup>
      <Button type="submit"> Cadastar </Button>
    </Form>
  );
};

export default withRouter(Register);
