import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { withRouter } from "react-router";

class LinhaLembranca extends Component {
    constructor(props) {
        super(props);

        this.state = {
            paciente : props.lembraca
        }
    }

  
    render () {
        return (
            <tr>
                <td>{this.state.paciente.preview}</td>
                <td>{this.state.paciente.desc}</td>
                <td>{this.state.paciente.data}</td>
            
            </tr>
        )
    }
}

export default withRouter(LinhaLembranca);