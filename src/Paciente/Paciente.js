import React, { Component } from 'react';
import { withRouter } from "react-router";
import { Table, Button, Container, Modal, FormGroup, FormControl, Form } from "react-bootstrap";
import { storageRef, database } from '../Firebase/firebase';
import LinhaLembranca from '../Tabelas/linhaLembranca';
import Loader from 'react-loader-spinner';
import rootStore from '../Stores/rootStore';
import { observer} from 'mobx-react';

const store = rootStore;

// Set a store to the pacientes, it will be needed for fast and live att of the current list of files (lembrancas)
@observer
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

    // Handlers for the Modal of upload
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

            // Set its state to uploading, to show the sppiner and the user knows that the file is in upload
            this.setState({
                uploading: true
            })

            await storageRef.child('lembrancas/' + key + '/' + desc).put(file, lembracas).then(() => {
                storageRef.child('lembrancas/' + key + '/' + desc).updateMetadata(lembracas);
            });

            const path = await storageRef.child('lembrancas/' + key + '/' + desc).fullPath;

            await database.ref('pacientes/' + key + '/lembracas').push({
                desc,
                data,
                path
            })

            // Add a new lembranca to the store, it will force the componente to render
            // Inplies in a live lembracas table
            store.lembrancaStore.addlembranca({
                desc,
                data,
                path
            });

            // Hide the modal and the spinner, the upload is done
            this.setState({
                uploading: false,
                show: false
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
                         store.lembrancaStore.lembrancaList.map((row, index) => {
                            const {desc, path, data} = row;
                            const objectRow = Object.assign({}, {desc, path, data});
                            return <LinhaLembranca key={index} lembraca={objectRow} />
                            
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

        // Populates the store with the lembrancas allready uploaded to this paciente
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
                        store.lembrancaStore.addlembranca(infos);

                    }

                    this.setState({
                        lembracas: lembrancas
                    })
                }
            });



    }
}

export default withRouter(Paciente);