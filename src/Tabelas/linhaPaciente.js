import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class LinhaPaciente extends Component {
    constructor(props) {
        super(props);

        this.state = {
            paciente : props.paciente
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
                    <Button>
                        Upload
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

export default LinhaPaciente;