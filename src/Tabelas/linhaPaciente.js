import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { withRouter } from "react-router";

class LinhaPaciente extends Component {
    constructor(props) {
        super(props);

        this.state = {
            paciente : props.paciente
        }
    }

    routeChange = (e) => {
        const { id } = e.target;
        const { history, paciente } = this.props;

        if(id === 'acessar') {
            history.push({pathname: '/paciente',  state: {
                paciente
              }});
        }

        if(id === 'jogar') {
            history.push('/jogar');
        }
       
    }

    render () {
        return (
            <tr>
                <td>{this.state.paciente.nome}</td>
                <td>{this.state.paciente.peso}</td>
                <td>{this.state.paciente.cpf}</td>
                <td>{this.state.paciente.data}</td>
                <td>
                    <Button id="acessar" className="btn btn-primary"   onClick={this.routeChange}>
                        Acessar
                    </Button>
                </td>
                <td>
                    <Button id="jogar" className="btn btn-primary"   onClick={this.routeChange}>
                        Jogar     
                    </Button>
                </td>
            </tr>
        )
    }
}

export default withRouter(LinhaPaciente);