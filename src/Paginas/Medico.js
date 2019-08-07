import React, { Component } from "react";
import { withRouter } from "react-router";

import {  database } from '../Firebase/firebase';
import { Table, Container } from "react-bootstrap";
import LinhaPacienteMedico from "../Tabelas/linhaPacienteMedico";

class Medico extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rows: []
        }
    }

   


    render() {
       
        return (
            <Container>
            <Table>
                <thead>
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Peso</th>
                        <th scope="col">CPF</th>
                        <th scope="col">Data nascimento</th>
                        <th scope="col">Acesso as lembraças</th>
                        <th scope="col">Acesso as scores</th>
                        <th scope="col">Jogar</th>
                    </tr>
                </thead>
                <tbody>{
                    this.state.rows.map((row, index) => {
                       return <LinhaPacienteMedico key={index} paciente={row}/>
                })}</tbody>
            </Table>
            
               
            </Container>
           

        );
    }

    componentDidMount() {
   
        database.ref('pacientes')
            .once('value')
            .then((snapshot) => {
                const pacientes = snapshot.val();
                const arrayPaci = Object.entries(pacientes);
                const rows = [];

                for (const paciente of arrayPaci) {
                    const infos = paciente[1];
                    const key = {
                        key: paciente[0]
                    }

                    const mergedPaciente = Object.assign(infos, key);
                    rows.push(mergedPaciente);

                   
                }

                this.setState({
                    rows: rows
                })
            });
    }
}

export default withRouter(Medico);