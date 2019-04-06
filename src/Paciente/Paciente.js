import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { withRouter } from "react-router";

class Paciente extends Component {
    constructor(props) {
        super(props);

        console.log(this.props.location.state);
    }

   
    render () {
        return null;
    }
}

export default withRouter(Paciente);