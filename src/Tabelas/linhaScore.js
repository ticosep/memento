import React, { Component } from 'react';
import { withRouter } from "react-router";
import { getScore } from '../Utils/getScores';

class LinhaScore extends Component {
    constructor(props) {
        super(props);

        this.state = {
            jogos : props.jogos.gameData,
            score: 0,
            numLembracas: 0,
            ready: false
        }
    }

  
    render () {
        let value;

        if(this.state.ready) {
            value =  <td>Score: {this.state.score} Número de lembraças: {this.state.numLembracas}</td>
        }
        return (
            <tr>
              {value}
      
            </tr>
        )
    }

    componentDidMount() {
        let score = 0;
        let numLembracas = 0;
        for (const data of this.state.jogos) {
            
            score += getScore(data);
            numLembracas++;
        }
        
        this.setState({
            score: score,
            numLembracas: numLembracas,
            ready: true
        })
    }
}

export default withRouter(LinhaScore);