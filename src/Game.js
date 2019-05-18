import React, { Component } from 'react';
import { withRouter } from "react-router";

class Game extends Component {
    render() {
      return (
        <div>
           <iframe title="myiframe" src="../game/" width="600px" height="400px"></iframe>
        </div>);
    }
  }

  export default withRouter(Game);