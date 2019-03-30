import React, { Component } from "react";
import Button from 'react-bootstrap/Button'
import { withRouter } from "react-router";
import {observer, inject} from "mobx-react";

@inject("store") @observer
class Cuidador extends Component {
    constructor(props) {
        super(props);

        this.props = props;
        const { store } = props;
		console.log("TCL: Cuidador -> constructor -> store", store);
    }

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