import React, { Component } from 'react';
import { withRouter } from "react-router";
import { Table, Button, Container, Modal } from "react-bootstrap";
import linhaLembranca from '../Tabelas/linhaLembranca';
import { app, database } from '../Firebase/firebase';

class Paciente extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            lembracas: []
        }

    }

    handleClose = () => {
        this.setState({ show: false });
    }

    handleShow = () => {
        this.setState({ show: true });
    }




    render() {
        const { nome, peso, cpf, data } = this.props.location.state.paciente;

        return (
            <Container>
                <Table>
                    <thead>
                        <tr>
                            <th scope="col">{nome}</th>
                            <th scope="col">{peso}</th>
                            <th scope="col">{cpf}</th>
                            <th scope="col">{data}</th>
                        </tr>
                    </thead>
                    <tbody>{
                        this.state.lembracas.map((row, index) => {
                            return <linhaLembranca key={index} lembraca={row} />
                        })}</tbody>

                </Table>

                <Button className="btn btn-primary" onClick={this.handleShow}>
                    Upload de lembraca
            </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Upload de lembraca</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
            </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Upload
            </Button>
                    </Modal.Footer>
                </Modal>

            </Container>
        )

    }

    componentDidMount() {
        const { key } = this.props.location.state.paciente;

        database.ref('pacientes/' + key)
            .once('value')
            .then((snapshot) => {
                const { lembracas } = snapshot.val();

            });
    }
}

export default withRouter(Paciente);