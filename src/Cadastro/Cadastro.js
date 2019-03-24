import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Bootstrap from "react-bootstrap";

class Cadastro extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };
    }

   
    render() {
        return (
           
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="email" bsSize="large">
                    <Form.Control
                        autoFocus
                        type="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="password" bsSize="large">
                    <Form.Control
                        value={this.state.password}
                        onChange={this.handleChange}
                        type="password"
                    />
                </Form.Group>
               
            </Form>
       
        );
    }
}

export default Cadastro;