import React, { Component } from 'react';
import { withRouter } from "react-router";
import { Table, Container } from "react-bootstrap";
import { database } from '../Firebase/firebase';
import LinhaScore from '../Tabelas/linhaScore';



class Score extends Component {
    constructor(props) {
        super(props);

        this.state = {
           jogos: []
        }

    }

   
    render() {
        const { nome } = this.props.location.state.paciente;
 
        return (

            <Container>
                <Table>
                    <thead>
                        <tr>
                            <th scope="col">{nome}</th>
                           
                        </tr>
                    </thead>
                    <tbody>{
                         this.state.jogos.map((row, index) => {
                           return <LinhaScore key={index} jogos={row} /> 
                        })}</tbody>

                </Table>



            </Container>
        )

    }

    componentDidMount() {
        const { key } = this.props.location.state.paciente;

        // Populates the store with the lembrancas allready uploaded to this paciente
        database.ref('pacientes/' + key)
            .once('value')
            .then((snapshot) => {
                const { jogos } = snapshot.val();

                if (jogos) {

                    const arrayJogos = Object.entries(jogos);
                    const jogosInfos = [];
                    
                    for (const j of arrayJogos) {
                        const infos = j[1];

                        jogosInfos.push(infos);
                    }

                    this.setState({
                        jogos: jogosInfos
                    })
                }
            });



    }
}

export default withRouter(Score);