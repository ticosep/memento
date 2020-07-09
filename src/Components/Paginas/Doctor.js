import { inject, observer } from "mobx-react";
import { getSnapshot } from "mobx-state-tree";
import React, { Component } from "react";
import { Container, Table } from "react-bootstrap";
import { withRouter } from "react-router";

import LinhaPacienteMedico from "../TableRows/DoctorPatientRow";

class Doctor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: [],
    };
  }

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
              <th scope="col">Acesso as lembraças</th>
              <th scope="col">Acesso as scores</th>
              <th scope="col">Jogar</th>
            </tr>
          </thead>
          <tbody>
            {this.state.rows.map((row, index) => {
              return <LinhaPacienteMedico key={index} {...row} />;
            })}
          </tbody>
        </Table>
      </Container>
    );
  }

  componentDidMount() {
    const patients = getSnapshot(this.props.store.userStore.user.patients);

    this.setState({
      rows: patients,
    });
  }
}

export default withRouter(inject("store")(observer(Doctor)));
