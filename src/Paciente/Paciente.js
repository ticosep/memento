import React, { Component } from 'react';
import { withRouter } from "react-router";
import { Table, Button, Container, Modal, FormGroup, FormControl, Form } from "react-bootstrap";
import { storageRef, database } from '../Firebase/firebase';
import LinhaLembranca from '../Tabelas/linhaLembranca';
import Loader from 'react-loader-spinner';

class Paciente extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            data: '',
            desc: '',
            file: null,
            uploading: false,
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

            this.setState({
                uploading: true
            })

            await storageRef.child('lembrancas/' + key + '/' + desc).put(file, lembracas).then(() => {
                storageRef.child('lembrancas/' + key + '/' + desc).updateMetadata(lembracas);
            });

            const fileExtension = this.getFileExtension(file.name);
            const path = await storageRef.child('lembrancas/' + key + '/' + desc).fullPath;

            await database.ref('pacientes/' + key + '/lembracas').push({
                desc,
                data,
                path
            })

            this.setState({
                uploading: false,
                show: false
            })


        } catch (error) {
            alert(error);
        }
    }

    getFileExtension = (str) => {
        return str.split('.').pop();
    }

    handleControl = (e) => {
        const { value, id } = e.target;
        this.setState({ [id]: value });
    }

    handleFile = (e) => {
        const file = e.target.files[0];

        if (file) {
            this.setState({ file: file });
        }
    }


    render() {
        const { nome } = this.props.location.state.paciente;
        let closebutton;
        let uploadbutton;

        if (this.state.uploading) {
            closebutton = <Loader
                type="Puff"
                color="#00BFFF"
                height="100"
                width="100"
            />;
        } else {
            closebutton = <Button variant="secondary" onClick={this.handleClose}>
                Close
                        </Button>;

            uploadbutton =  <Button type="submit" variant="primary" onClick={this.handleSubmit}>
                Upload

            </Button>;
        }

        return (

            <Container>
                <Table>
                    <thead>
                        <tr>
                            <th scope="col">{nome}</th>
                            <th scope="col">descrição</th>
                            <th scope="col">data</th>
                        </tr>
                    </thead>
                    <tbody>{
                        this.state.lembracas.map((row, index) => {
                            return <LinhaLembranca key={index} lembraca={row} />
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
                        {closebutton}
                        {uploadbutton}
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

                if (lembracas) {

                    const arrayLembrancas = Object.entries(lembracas);
                    const lembrancas = [];

                    for (const lembraca of arrayLembrancas) {
                        const infos = lembraca[1];

                        lembrancas.push(infos);

                    }

                    this.setState({
                        lembracas: lembrancas
                    })
                }
            });



    }
}

export default withRouter(Paciente);