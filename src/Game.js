import React, { Component } from 'react';
import { withRouter } from "react-router";
import { database, storageRef } from './Firebase/firebase';
import Loader from 'react-loader-spinner';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ready: false,
      gameSpecs: {}
    }

  }

  // Handle called after a message from the iframe (game)
  handleFrameTasks = (e) => {
    const { fnName } = e.data;
    const {ready, gameSpecs} = this.state;

    // Here we need to check if the fnName is that one, it secure that the game is allreadt loaded and the data for it is done
    if (fnName === 'returnJson' && ready) {

      // Simulate a message type for the Rex_FrameMessage addon in the construct game
      const CMD_FNRTN = "Rex_FrameMessage.Return";
      const data = {
        "type": CMD_FNRTN,
        "sender": '""',
        "fnName": 'returnJson',
        "value": JSON.stringify(gameSpecs)
      };

      this.ifr.contentWindow.postMessage(data, "*");
    }


  }

  render() {
    const { ready } = this.state;
    let frame;

    if (ready) {
      frame = <iframe ref={(f) => this.ifr = f} id="game" title="game" src="../game/" width="600px" height="400px"></iframe>;
    }

    if (!ready) {
      frame = <Loader
        type="Puff"
        color="#00BFFF"
        height="100"
        width="100"
      />;
    }

    return (
      <div>
        {frame}
      </div>);
  }

  // After the component update, load all the data for the game we set a listner for the ifram messages
  componentDidUpdate () {
    this.ifr.onload = () => {
      window.addEventListener("message", this.handleFrameTasks);
    }
  }

  componentDidMount() {
    const { key } = this.props.location.state.paciente;
    database.ref('pacientes/' + key)
      .once('value')
      .then((snapshot) => {
        const { lembracas, nome, cpf } = snapshot.val();
        let gameSpecs = {};

        if (lembracas) {
          gameSpecs = Object.assign({}, { nome: nome, cpf: cpf });

          const arrayLembrancas = Object.entries(lembracas);
          let lembrancaCount = arrayLembrancas.length;

          for (const [index, l] of arrayLembrancas.entries()) {
            const { path, desc, data } = l[1];

            // Create a reference to the file we want to download
            const lembrancaRef = storageRef.child(path);


            // Get the download URL
            lembrancaRef.getDownloadURL().then((url) => {
              const lembracaStr = `{"${index}":{"desc": "${desc}", "data": "${data}", "url": "${url}"}}`;
              const lembracaObj = JSON.parse(lembracaStr);

              gameSpecs = Object.assign(gameSpecs, lembracaObj);

              lembrancaCount--;

              if (!lembrancaCount) {

                this.setState({
                  ready: true,
                  gameSpecs: gameSpecs
                });

              }

            }).catch((error) => {
              console.log(error);
            });

          }


        }


      });
      
  }
}

export default withRouter(Game);
