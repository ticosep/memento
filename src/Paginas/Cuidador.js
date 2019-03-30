import React, { Component } from "react";
import Button from 'react-bootstrap/Button'
import { withRouter } from "react-router";


class Cuidador extends Component {
    routeChange = () => {
        const { history } = this.props;
        history.push('/cadastropaciente');
    }

    render() {
        return (

        <Button
                className="btn btn-primary"
                onClick={this.routeChange}>
                Cadastrar paciente
        </Button>

        );
    }
}

export default withRouter(Cuidador);