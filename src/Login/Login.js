import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { withRouter } from "react-router";
import { app }  from '../Firebase/firebase';

class Login extends Component {
    constructor(props) {
        super(props);

        this.props = props;

        this.state = {
            email: '',
            senha: ''
        };
    }

    validateForm( ) {
        return this.state.email.length > 0 && this.state.senha.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

   
    handleSubmit = async event => {
        event.preventDefault();
        const { email, senha } = this.state;

        try {
            await app
                .auth()
                .signInWithEmailAndPassword(email, senha);
            this.props.history.push("/");
        } catch (error) {
            alert(email, senha);
        }
    }

    routeChange =  ()  => {
        const { history } = this.props;
        history.push('/cadastro');
    }

    render() {
        return (
            <div className="Login">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="email" >
                        <Form.Control
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="senha" >
                        <Form.Control
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </Form.Group>
                    <Button
                        
                        className="btn btn-primary"
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        Login
          </Button>
                    <Button 
                        className="btn btn-primary"
                        onClick={this.routeChange}>
                        Cadastrar
          </Button>
                </Form>
            </div>
        );
    }
}

export default withRouter(Login);