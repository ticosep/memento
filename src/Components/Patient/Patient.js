import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { observer } from "mobx-react";
import React from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  Modal,
  Table,
} from "react-bootstrap";
import Loader from "react-loader-spinner";
import styled from "styled-components";

import { useStore } from "../../stores/hooks/useStore";
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

const Patient = () => {
  const [show, setShow] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const [currentPatient, setcurrentPatient] = React.useState(undefined);

  const store = useStore();

  const handleSubmit = async (formvalues) => {
    const { id } = patient;
    const { desc, data, file } = formvalues;

    if (!desc || !file || !data) {
      alert("Todos os campos devem estar preenchidos!");
      return;
    }

    try {
      // Set its state to uploading, to show the sppiner and the user knows that the file is in upload
      setUploading(true);

      let { type } = file;

      const memento = {
        customMetadata: {
          desc,
          data,
        },
      };

      await store.userStore.addMemento(id, memento, desc, file, data, type);

      // Hide the modal and the spinner, the upload is done
      setShow(false);
      setUploading(false);
    } catch (error) {
      alert(error);
    }
  };

  const handleControl = (e) => {
    const { value, id } = e.target;
    this.setState({ [id]: value });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];

    if (file) {
      this.setState({ file: file });
    }
  };
  return (
    <Container>
      <Header>
        <h1>Lembranças de {patient.name}</h1>
        <Icon onClick={() => setShow(true)} icon={faPlus} />
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
          {currentPatient.mementos.map((row, index) => {
            return <MementoRow key={index} {...row} />;
          })}
        </tbody>
      </Table>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload de lembraça</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {uploading ? (
            <Loader type="Puff" color="#00BFFF" height={100} width={100} />
          ) : (
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <FormControl
                  type="text"
                  id="desc"
                  placeholder="Decrição da lembraça"
                  onChange={handleControl}
                  onClick={handleControl}
                  required={true}
                />
              </FormGroup>

              <FormGroup>
                <FormControl
                  type="date"
                  id="data"
                  placeholder="Data de ocorrencia"
                  onChange={handleControl}
                  onClick={handleControl}
                  required={true}
                />
              </FormGroup>

              <FormGroup>
                <FormControl
                  type="file"
                  id="file"
                  placeholder="Selecione a lembrança"
                  onChange={handleFile}
                  onClick={handleFile}
                  required={true}
                />
              </FormGroup>

              <Button type="submit" variant="primary" onClick={handleSubmit}>
                Upload
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default observer(Patient);
