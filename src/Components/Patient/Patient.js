import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { observer } from "mobx-react";
import { getSnapshot } from "mobx-state-tree";
import React from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  Modal,
  Table,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import Loader from "react-loader-spinner";
import { useParams } from "react-router";
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
  const [patient, setPatient] = React.useState(undefined);

  const { handleSubmit, register } = useForm();
  const store = useStore();
  const { id } = useParams();

  React.useEffect(() => {
    const patient = getSnapshot(
      store.userStore.user.patients.find((patient) => patient.id === id)
    );

    setPatient(patient);
  }, []);

  const onSubmit = async (formvalues) => {
    const { desc, data } = formvalues;
    const file = formvalues.file[0];

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

      const patient = getSnapshot(
        store.userStore.user.patients.find((patient) => patient.id === id)
      );

      setPatient(patient);

      setShow(false);
      setUploading(false);
    } catch (error) {
      alert(error);
    }
  };

  if (!patient) return <div>Paciente nao encontrado</div>;

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
          {patient.mementos.map((row, index) => {
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
        <Modal.Header closeButton={!uploading}>
          <Modal.Title>Envio de lembraça</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {uploading ? (
            <Loader type="Puff" color="#00BFFF" height={100} width={100} />
          ) : (
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Form.Label>Descrição</Form.Label>
                <FormControl
                  type="text"
                  name="desc"
                  placeholder="Decrição da lembraça"
                  ref={register}
                  required={true}
                />
              </FormGroup>

              <FormGroup>
                <Form.Label>Data da lembrança</Form.Label>
                <FormControl
                  type="date"
                  name="data"
                  placeholder="Data de ocorrencia"
                  ref={register}
                  required={true}
                />
              </FormGroup>

              <FormGroup>
                <Form.Label>Arquivo da lembrança (video ou imagem)</Form.Label>
                <FormControl
                  type="file"
                  name="file"
                  accept=".mp4,.avi,.png,.jpeg"
                  placeholder="Selecione a lembrança"
                  ref={register}
                  required={true}
                />
              </FormGroup>

              <Button type="submit" variant="primary">
                Enviar
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default observer(Patient);
