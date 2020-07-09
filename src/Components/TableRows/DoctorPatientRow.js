import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router";

// A simple line with the info about the patient that is under the care of the user
class LinhaPacienteMedico extends Component {
  routeChange = (e) => {
    const { id } = e.target;
    const { history, paciente } = this.props;

    if (id === "acessar") {
      history.push({
        pathname: "/paciente",
        state: {
          paciente,
        },
      });
    }

    if (id === "acessarJogos") {
      history.push({
        pathname: "/jogos",
        state: {
          paciente,
        },
      });
    }

    if (id === "jogar") {
      history.push({
        pathname: "/jogar",
        state: {
          paciente,
        },
      });
    }
  };

  render() {
    return (
      <tr>
        <td>{this.props.desc.name}</td>
        <td>{this.props.desc.weight}</td>
        <td>{this.props.desc.cpf}</td>
        <td>{this.props.desc.birthday}</td>
        <td>
          <Button
            id="acessar"
            className="btn btn-primary"
            onClick={this.routeChange}
          >
            Acessar
          </Button>
        </td>
        <td>
          <Button
            id="acessarJogos"
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
