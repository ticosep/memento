import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router";

// A simple line with the info about the patient that is under the care of the user
class LinhaPacienteMedico extends Component {
  routeChange = (e) => {
    const { id } = e.target;
    const { history, patient } = this.props;

    history.push(`${id}/${patient.id}`);
  };

  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.weight}</td>
        <td>{this.props.cpf}</td>
        <td>{this.props.birthday}</td>
        <td>
          <Button
            id="paciente"
            className="btn btn-primary"
            onClick={this.routeChange}
          >
            Acessar
          </Button>
        </td>
        <td>
          <Button
            id="jogos"
            className="btn btn-primary"
            onClick={this.routeChange}
          >
            Acessar
          </Button>
        </td>
        <td>
          <Button
            id="jogar"
            className="btn btn-primary"
            onClick={this.routeChange}
          >
            Jogar
          </Button>
        </td>
      </tr>
    );
  }
}

export default withRouter(LinhaPacienteMedico);
