import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { FormGroup, FormControl } from 'react-bootstrap';
import { app, database } from '../Firebase/firebase';
import { withRouter } from "react-router";

class CadastroPaciente extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: '',
            nome: '',
            cpf: '',
            peso: ''
        };
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { data, nome, cpf, peso } = this.state;
        const { history } = this.props;

        try {
            // Get the current user id, then set the new "paciente" to its object in the firebase
            const user = app.auth().currentUser

            database.ref('users/' + user.uid + '/pacientes')
            .push({
                nome,
                data,
                cpf,
                peso

            })
            .then(values => {
                const key = values.key;
                const value = {nome,
                    data,
                    cpf,
                    peso,
                    cuidador: user.uid};

                database.ref('pacientes/')
                .child(key)
                .set(value)
                .then(() => {
                   const userValues = localStorage.getItem('user');
                   const userValuesObj = JSON.parse(userValues);

                   history.push('/' + userValuesObj.tipo);
                });
            });


        } catch (error) {
            alert(error);
        }
    }

    handleControl = (e) => {
        const { value, id } = e.target;
        this.setState({ [id]: value });
    }

    render() {
        return (

            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <FormControl type="name" id="nome" placeholder="Jose da Silva" onChange={this.handleControl} onClick={this.handleControl}></FormControl>
                </FormGroup>
                <FormGroup>
                    <FormControl type="text" id="peso" placeholder="peso" onChange={this.handleControl} onClick={this.handleControl}></FormControl>
                </FormGroup>
                <FormGroup>
                    <FormControl type="text" id="cpf" placeholder="CPF" onChange={this.handleControl} onClick={this.handleControl}></FormControl>
                </FormGroup>
                <FormGroup>
                    <FormControl type="date" id="data" placeholder="Data nascimento" onChange={this.handleControl} onClick={this.handleControl}></FormControl>
                </FormGroup>

                <Button type="submit"> Cadastar </Button>
            </Form>

        );
    }
}

export default withRouter(CadastroPaciente);