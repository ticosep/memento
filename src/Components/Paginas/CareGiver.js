import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { inject, observer } from "mobx-react";
import { getSnapshot } from "mobx-state-tree";
import React, { Component } from "react";
import { Modal, ModalBody, ModalTitle, Table } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { withRouter } from "react-router";
import styled from "styled-components";

import { database } from "../../services/firebase";
import { Container } from "../_shared/Container";
import RegisterPatient from "../Register/RegisterPatient";
import PatientRow from "../TableRows/PatientRow";

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const Icon = styled(FontAwesomeIcon)`
  margin-left: 1rem;
  cursor: pointer;
`;

class CareGiver extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: [],
      show: false,
    };
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  render() {
    const patients = getSnapshot(this.props.store.userStore.user.patients);

    return (
      <Container>
        <Header>
          <h1>Meus pacientes</h1>
          <Icon onClick={this.handleShow} icon={faPlus} />
        </Header>
        <Table striped bordered hover>
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
            {patients.map((row, index) => {
              return <PatientRow key={index} patient={row} {...row} />;
            })}
          </tbody>
        </Table>
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          backdrop="static"
          keyboard={false}
        >
          <ModalHeader closeButton>
            <ModalTitle>Novo Paciente</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <RegisterPatient />
          </ModalBody>
        </Modal>
      </Container>
    );
  }
}

export default withRouter(inject("store")(observer(CareGiver)));
