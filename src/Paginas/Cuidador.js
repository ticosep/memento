import React, { Component } from "react";
import { withRouter } from "react-router";
import { observer } from "mobx-react";
import rootStore from '../Stores/rootStore';
import { app, database } from '../Firebase/firebase';
import { Table } from "react-bootstrap";
import LinhaPaciente from "../Tabelas/linhaPaciente";

@observer
class Cuidador extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rows: []
        }
    }

    routeChange = () => {
        const { history } = this.props;
        history.push('/cadastropaciente');
    }


    render() {
       
        return (

            <Table>
                <thead>
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Peso</th>
                        <th scope="col">CPF</th>
                        <th scope="col">Data nascimento</th>
                        <th scope="col">Upload lembranças</th>
                        <th scope="col">Jogar</th>
                    </tr>
                </thead>
                <tbody>{
                    this.state.rows.map((row, index) => {
                       return <LinhaPaciente key={index} paciente={row}/>
                })}</tbody>
            </Table>

        );
    }

    componentDidMount() {
        const userValues = localStorage.getItem('user');
        const userValuesObj = JSON.parse(userValues);
        const { id } = userValuesObj;

        database.ref('users/' + id)
            .once('value')
            .then((snapshot) => {
                const { pacientes } = snapshot.val();
                const arrayPaci = Object.entries(pacientes);
                const rows = [];

                for (const paciente of arrayPaci) {
                    const infos = paciente[1];

                    rows.push(infos);

                   
                }

                this.setState({
                    rows: rows
                })
            });
    }
}

export default withRouter(Cuidador);