import React, { Component } from "react";
import Button from 'react-bootstrap/Button'
import { withRouter } from "react-router";
import {observer} from "mobx-react";
import rootStore from '../Stores/rootStore';

@observer
class Cuidador extends Component {
    constructor(props) {
        super(props);

        this.props = props;

        console.log(rootStore.userStore.userTipo);
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