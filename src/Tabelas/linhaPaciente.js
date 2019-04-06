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

    routeChange = () => {
        const { history, paciente } = this.props;
        history.push({pathname: '/paciente',  state: {
            paciente
          }});
    }

    render () {
        return (
            <tr>
                <td>{this.state.paciente.nome}</td>
                <td>{this.state.paciente.peso}</td>
                <td>{this.state.paciente.cpf}</td>
                <td>{this.state.paciente.data}</td>
                <td>
                    <Button className="btn btn-primary"   onClick={this.routeChange}>
                        Acessar
                    </Button>
                </td>
                <td>
                    <Button>
                        Jogar     
                    </Button>
                </td>
            </tr>
        )
    }
}

export default withRouter(LinhaPaciente);