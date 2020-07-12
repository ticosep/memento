import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { inject, observer } from "mobx-react";
import { getSnapshot } from "mobx-state-tree";
import React, { Component } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  Modal,
  Table,
} from "react-bootstrap";
import Loader from "react-loader-spinner";
import { withRouter } from "react-router";
import styled from "styled-components";

import { Container } from "../_shared/Container";
import MementoRow from "../TableRows/MementoRow";

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

// Set a store to the pacientes, it will be needed for fast and live att of the current list of files (lembrancas)
class Patient extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      data: "",
      desc: "",
      file: null,
      uploading: false,
      mementos: [],
      patient: undefined,
    };
  }

  // Handlers for the Modal of upload
  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { id } = this.state.patient;
    const { desc, data, file } = this.state;

    if (!desc || !file || !data) {
      alert("Todos os campos devem estar preenchidos!");
      return;
    }

    try {
      // Set its state to uploading, to show the sppiner and the user knows that the file is in upload
      this.setState({
        uploading: true,
      });

      let { type } = file;

      const memento = {
        customMetadata: {
          desc,
          data,
        },
      };

      await this.props.store.userStore.addMemento(
        id,
        memento,
        desc,
        file,
        data,
        type
      );

      // Hide the modal and the spinner, the upload is done
      this.setState({
        uploading: false,
        show: false,
      });
    } catch (error) {
      alert(error);
    }
  };

  handleControl = (e) => {
    const { value, id } = e.target;
    this.setState({ [id]: value });
  };

  handleFile = (e) => {
    const file = e.target.files[0];

    if (file) {
      this.setState({ file: file });
    }
  };

  render() {
    if (!this.state.patient) {
      return null;
    }

    const { name } = this.state.patient;

    const mementos = this.props.store.userStore.user.patients.find(
      (patient) => patient.id === this.state.patient.id
    ).mementos;
    return (
      <Container>
        <Header>
          <h1>Lembranças de {name}</h1>
          <Icon onClick={this.handleShow} icon={faPlus} />
        </Header>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th scope="col">Lembrança</th>
              <th scope="col">Descrição</th>
              <th scope="col">Data</th>
            </tr>
          </thead>
          <tbody>
            {mementos.map((row, index) => {
              return <MementoRow key={index} {...row} />;
            })}
          </tbody>
        </Table>
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Upload de lembraça</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.uploading ? (
              <Loader type="Puff" color="#00BFFF" height={100} width={100} />
            ) : (
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <FormControl
                    type="text"
                    id="desc"
                    placeholder="Decrição da lembraça"
                    onChange={this.handleControl}
                    onClick={this.handleControl}
                    required={true}
                  />
                </FormGroup>

                <FormGroup>
                  <FormControl
                    type="date"
                    id="data"
                    placeholder="Data de ocorrencia"
                    onChange={this.handleControl}
                    onClick={this.handleControl}
                    required={true}
                  />
                </FormGroup>

                <FormGroup>
                  <FormControl
                    type="file"
                    id="file"
                    placeholder="Selecione a lembrança"
                    onChange={this.handleFile}
                    onClick={this.handleFile}
                    required={true}
                  />
                </FormGroup>

                <Button
                  type="submit"
                  variant="primary"
                  onClick={this.handleSubmit}
                >
                  Upload
                </Button>
              </Form>
            )}
          </Modal.Body>
        </Modal>
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

export default withRouter(inject("store")(observer(Patient)));
