import React from "react";
import { FormControl, FormGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import Loader from "react-loader-spinner";
import { useHistory, withRouter } from "react-router";
import styled from "styled-components";

import { app, database } from "../../services/firebase";
import { Container } from "../_shared/Container";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledForm = styled(Form)`
  min-width: 300px;
  padding: 1rem;

  display: flex;
  flex-direction: column;

  background-color: #007bff;
  box-shadow: 0 0 1em gray;
  color: white;
  border-radius: 0.5rem;
`;

const Register = () => {
  const { handleSubmit, register } = useForm();
  const history = useHistory();
  const [isRegister, setIsRegister] = React.useState(false);

  const onSubmit = async (data) => {
    const { email, password, birthday, name, cpf, type } = data;
    setIsRegister(true);
    //Try to push data to the firebase after it creates a user by the default google createUser's
    try {
      const authUser = await app
        .auth()
        .createUserWithEmailAndPassword(email, password);

      // Create a user in your Firebase realtime database
      await database.ref("users/" + authUser.user.uid).set({
        name,
        email,
        birthday,
        cpf,
        type,
      });

      setIsRegister(false);

      history.push("/");
    } catch (error) {
      alert(error);
    }
  };

  if (isRegister) {
    return <Loader type="Puff" color="#00BFFF" height={100} width={100} />;
  }

  return (
    <Container>
      <Wrapper>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Form.Label>Email</Form.Label>
            <FormControl
              type="email"
              autoComplete="email"
              id="email"
              name="email"
              placeholder="name@example.com"
              ref={register}
              required={true}
            ></FormControl>
          </FormGroup>
          <FormGroup>
            <Form.Label>Senha</Form.Label>
            <FormControl
              type="password"
              id="password"
              name="password"
              placeholder="senha"
              ref={register}
              required={true}
            ></FormControl>
          </FormGroup>
          <FormGroup>
            <Form.Label>Nome</Form.Label>
            <FormControl
              type="name"
              id="name"
              name="name"
              placeholder="Nome"
              ref={register}
              required={true}
            ></FormControl>
          </FormGroup>
          <FormGroup>
            <Form.Label>CPF</Form.Label>
            <FormControl
              type="text"
              id="cpf"
              name="cpf"
              placeholder="CPF"
              ref={register}
              required={true}
            ></FormControl>
          </FormGroup>
          <FormGroup>
            <Form.Label>Data nascimento </Form.Label>
            <FormControl
              type="date"
              id="birthday"
              name="birthday"
              placeholder="Data nascimento"
              ref={register}
              required={true}
            ></FormControl>
          </FormGroup>
          <FormGroup>
            <Form.Label>Tipo de usuario</Form.Label>
            <FormControl
              as="select"
              id="type"
              name="type"
              ref={register}
              required={true}
              defaultValue="Medico"
            >
              <option>Medico</option>
              <option>Cuidador</option>
            </FormControl>
          </FormGroup>
          <Button type="submit"> Cadastar </Button>
        </StyledForm>
      </Wrapper>
    </Container>
  );
};

export default withRouter(Register);
