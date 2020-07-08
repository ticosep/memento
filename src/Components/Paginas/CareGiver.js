import React, { Component } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { withRouter } from "react-router";

import { database } from "../../services/firebase";
import LinhaPaciente from "../TableRows/PatientRow";

class Cuidador extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: [],
    };
  }

  routeChange = () => {
    const { history } = this.props;
    history.push("/cadastropaciente");
  };

  render() {
    return (
      <Container>
        <Table>
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Peso</th>
              <th scope="col">CPF</th>
              <th scope="col">Data nascimento</th>
              <th scope="col">Acesso ao paciente</th>
              <th scope="col">Jogar</th>
            </tr>
          </thead>
          <tbody>
            {this.state.rows.map((row, index) => {
              return <LinhaPaciente key={index} paciente={row} />;
            })}
          </tbody>
        </Table>

        <Button className="btn btn-primary" onClick={this.routeChange}>
          Cadastrar paciente
        </Button>
      </Container>
    );
  }

  componentDidMount() {
    const userValues = localStorage.getItem("user");
    const userValuesObj = JSON.parse(userValues);
    const { id } = userValuesObj;

    database
      .ref("users/" + id)
      .once("value")
      .then((snapshot) => {
        const { pacientes } = snapshot.val();
        const arrayPaci = Object.entries(pacientes);
        const rows = [];

        for (const paciente of arrayPaci) {
          const infos = paciente[1];
          const key = {
            key: paciente[0],
          };

          const mergedPaciente = Object.assign(infos, key);
          rows.push(mergedPaciente);
        }

        this.setState({
          rows: rows,
        });
      });
  }
}

export default withRouter(Cuidador);
