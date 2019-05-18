import React, { Component } from 'react';
import { withRouter } from "react-router";
import { Table, Button, Container, Modal, FormGroup, FormControl, Form } from "react-bootstrap";
import linhaLembranca from '../Tabelas/linhaLembranca';
import { storageRef, database } from '../Firebase/firebase';

class Paciente extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            data: '',
            desc: '',
            file: null,
            lembracas: []
        }

    }

    handleClose = () => {
        this.setState({ show: false });
    }

    handleShow = () => {
        this.setState({ show: true });
    }

    
    handleSubmit = async event => {
        event.preventDefault();
        const { key } = this.props.location.state.paciente;
        const { desc, data, file } = this.state;
       
        try {
            const lembracas = {
                customMetadata: {
                    desc,
                    data
                }  
            }

            await storageRef.child('lembrancas/' + key + '/' + desc).put(file, lembracas).then(() => {
                storageRef.child('lembrancas/' + key + '/' + desc).updateMetadata(lembracas);
            });

            const path = await storageRef.child('lembrancas/' + key + '/' + desc).fullPath;

            await database.ref('pacientes/' + key + '/lembracas').push({
                desc,
                data,
                path
            })
                
            
        } catch (error) {
            alert(error);
        }
    }

    handleControl = (e) => {
        const { value, id } = e.target;
        this.setState({ [id]: value });
    }

    handleFile = (e) => {
        const file = e.target.files[0];

        if(file) {
            this.setState({file: file});
        }
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
                        <Modal.Title>Upload de lembraça</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <FormControl type="text" id="desc" placeholder="Decrição da lembraça" onChange={this.handleControl} onClick={this.handleControl}></FormControl>
                            </FormGroup>

                            <FormGroup>
                                <FormControl type="date" id="data" placeholder="Data de ocorrencia" onChange={this.handleControl} onClick={this.handleControl}></FormControl>
                            </FormGroup>

                            <FormGroup>
                                <FormControl type="file" id="file" placeholder="Selecione a lembrança" onChange={this.handleFile} onClick={this.handleFile}></FormControl>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button type="submit" variant="primary" onClick={this.handleSubmit}>
                            Upload
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Container>
        )

    }

    componentDidMount() {
        const { key } = this.props.location.state.paciente;
     
       
       
    }
}

export default withRouter(Paciente);