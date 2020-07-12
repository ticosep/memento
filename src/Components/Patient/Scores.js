import { inject, observer } from "mobx-react";
import { getSnapshot } from "mobx-state-tree";
import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { withRouter } from "react-router";
import styled from "styled-components";

import { Container } from "../_shared/Container";
import LinhaScore from "../TableRows/ScoreRow";

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

class Score extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jogos: [],
      patient: undefined,
    };
  }

  render() {
    if (!this.state.patient) return null;

    const { name } = this.state.patient;

    return (
      <Container>
        <Header>
          <h1>Scores de {name}</h1>
        </Header>
        <Table>
          <thead>
            <tr></tr>
          </thead>
          <tbody>
            {this.state.jogos.map((row, index) => {
              return <LinhaScore key={index} jogos={row} />;
            })}
          </tbody>
        </Table>
      </Container>
    );
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    const patient = this.props.store.userStore.user.patients.find(
      (userPatient) => userPatient.id === id
    );

    this.setState({
      patient: patient ? getSnapshot(patient) : undefined,
    });
  }
}

export default withRouter(inject("store")(observer(Score)));
