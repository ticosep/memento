import React from "react";
import { FormControl, FormGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import Loader from "react-loader-spinner";
import { useHistory, withRouter } from "react-router";

import { app, database } from "../../services/firebase";

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
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <FormControl
          type="email"
          autoComplete="email"
          id="email"
          name="email"
          placeholder="name@example.com"
          ref={register}
        ></FormControl>
      </FormGroup>
      <FormGroup>
        <FormControl
          type="password"
          id="password"
          name="password"
          placeholder="senha"
          ref={register}
        ></FormControl>
      </FormGroup>
      <FormGroup>
        <FormControl
          type="name"
          id="name"
          name="name"
          placeholder="Nome"
          ref={register}
        ></FormControl>
      </FormGroup>
      <FormGroup>
        <FormControl
          type="text"
          id="cpf"
          name="cpf"
          placeholder="CPF"
          ref={register}
        ></FormControl>
      </FormGroup>
      <FormGroup>
        <FormControl
          type="date"
          id="birthday"
          name="birthday"
          placeholder="Data nascimento"
          ref={register}
        ></FormControl>
      </FormGroup>
      <FormGroup>
        <FormControl
          as="select"
          id="type"
          name="type"
          ref={register}
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
