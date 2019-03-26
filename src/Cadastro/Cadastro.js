import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { FormGroup, FormControl } from "react-bootstrap";

class Cadastro extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            senha: "",
            data:"",
            nome: "",
            cpf: "",
            tipo: ""
        };
    }

    handleSubmit = (e) => {
       
        alert(this.state);
    }

    handleControl = (e) => {
        const {value, id} = e.target;
        this.setState({[id]: value});
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
                        <option>Médico</option>
                        <option>Cuidador</option>
                        <option>Paciente</option>
                    </FormControl>
                </FormGroup>
                <Button type="submit"> Cadastar </Button>
            </Form>

        );
    }
}

export default Cadastro;