import React, { Component } from "react";
import Button from 'react-bootstrap/Button'
import { withRouter } from "react-router";


class Cuidador extends Component {
    render() {
        return (

        <Button
                className="btn btn-primary"
                onClick={ () => console.log('shaushuahsua')}>
                Cadastrar
        </Button>

        );
    }
}

export default withRouter(Cuidador);