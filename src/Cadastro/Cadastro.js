import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { FormGroup, FormControl } from 'react-bootstrap';
import { app, database } from '../Firebase/firebase';
import { withRouter } from "react-router";

class Cadastro extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            senha: '',
            data: '',
            nome: '',
            cpf: '',
            tipo: '',
            pacientes: []
        };
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { email, senha, data, nome, cpf, tipo, pacientes } = this.state;

        try {
            await app
                .auth()
                .createUserWithEmailAndPassword(email, senha)
                .then(authUser => {
                    // Create a user in your Firebase realtime database
                    return database.ref('users/' + authUser.user.uid).push({
                      nome,
                      email,
                      data,
                      cpf,
                      tipo,
                      pacientes
                });
            })
            this.props.history.push("/");
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
                    <FormControl type="email" autoComplete="email" id="email" placeholder="name@example.com" onChange={this.handleControl} onClick={this.handleControl}></FormControl>
                </FormGroup>
                <FormGroup>
                    <FormControl type="password" id="senha" placeholder="senha" onChange={this.handleControl} onClick={this.handleControl}></FormControl>
                </FormGroup>
                <FormGroup>
                    <FormControl type="name" id="nome" placeholder="Nome" onChange={this.handleControl} onClick={this.handleControl}></FormControl>
                </FormGroup>
                <FormGroup>
                    <FormControl type="text" id="cpf" placeholder="CPF" onChange={this.handleControl} onClick={this.handleControl}></FormControl>
                </FormGroup>
                <FormGroup>
                    <FormControl type="date" id="data" placeholder="Data nascimento" onChange={this.handleControl} onClick={this.handleControl}></FormControl>
                </FormGroup>
                <FormGroup>
                    <FormControl as="select" id="tipo" onChange={this.handleControl} onClick={this.handleControl}>
                        <option>Medico</option>
                        <option>Cuidador</option>
                    </FormControl>
                </FormGroup>
                <Button type="submit"> Cadastar </Button>
            </Form>

        );
    }
}

export default withRouter(Cadastro);