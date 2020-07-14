import shuffle from "lodash/shuffle";
import { inject, observer } from "mobx-react";
import { getSnapshot } from "mobx-state-tree";
import moment from "moment";
import React, { Component } from "react";
import Loader from "react-loader-spinner";
import { Redirect, withRouter } from "react-router";

import { getScore } from "./utils/getScores";

const millisecondsToMinutesSeconds = (ms) => {
  let duration = moment.duration(ms, "milliseconds");
  let fromMinutes = Math.floor(duration.asMinutes());
  let fromSeconds = Math.floor(duration.asSeconds() - fromMinutes * 60);

  return Math.floor(duration.asSeconds()) >= 60
    ? (fromMinutes <= 9 ? "0" + fromMinutes : fromMinutes) +
        ":" +
        (fromSeconds <= 9 ? "0" + fromSeconds : fromSeconds)
    : "00:" + (fromSeconds <= 9 ? "0" + fromSeconds : fromSeconds);
};

let viewWidth = window.innerWidth;
let viewHeight = window.innerHeight;

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ready: false,
      gameSpecs: undefined,
      initGame: Date.now(),
      done: false,
    };
  }

  // Handle called after a message from the iframe (game)
  handleFrameTasks = async (e) => {
    const { fnName } = e.data;
    const { ready, gameSpecs } = this.state;
    const store = this.props.store.userStore;
    const id = this.props.match.params.id;

    // Here we need to check if the fnName is that one, it secure that the game is allreadt loaded and the data for it is done
    if (fnName === "returnJson" && ready) {
      // Simulate a message type for the Rex_FrameMessage addon in the construct game
      const CMD_FNRTN = "Rex_FrameMessage.Return";
      const data = {
        type: CMD_FNRTN,
        sender: '""',
        fnName: "returnJson",
        value: JSON.stringify(gameSpecs),
      };

      this.ifr.contentWindow.postMessage(data, "*");
    }

    if (fnName === "endGame" && ready) {
      const { data } = e;
      const [jsonData] = data.params;

      const gameData = JSON.parse(jsonData);
      if (window.confirm("Jogo finalizado, deseja salvar os dados?")) {
        const arrayData = Object.values(gameData);
        let score = 0;

        for (const data of arrayData) {
          score += getScore(data);
        }

        const gameScore = {
          score,
          numOfMementos: arrayData.length,
          data: moment().format("DD/MM/YYYY"),
          gameTime: millisecondsToMinutesSeconds(
            Date.now() - this.state.initGame
          ),
        };

        await store.addScore(id, gameScore);
      } else {
        alert("Jogo não salvo nos scores!");
      }

      this.setState({ done: true });
    }
  };

  onWindowResize = () => {
    viewWidth = window.innerWidth;
    viewHeight = window.innerHeight;

    this.ifr.width = viewWidth;
    this.ifr.height = viewHeight;
  };

  render() {
    const { ready } = this.state;

    if (this.state.done) {
      return <Redirect to="/" />;
    }

    if (!this.state.gameSpecs)
      return (
        <div>
          Não é possivel criar um jogo, número insufiiciente de lembranças!
        </div>
      );

    if (ready) {
      return (
        <iframe
          ref={(f) => (this.ifr = f)}
          id="game"
          title="game"
          src="../game/"
          width={viewWidth}
          height={viewHeight}
        ></iframe>
      );
    }

    if (!ready) {
      return <Loader type="Puff" color="#00BFFF" height={100} width={100} />;
    }
  }

  // After the component update, load all the data for the game we set a listner for the ifram messages
  componentDidUpdate() {
    if (this.ifr) {
      this.ifr.onload = () => {
        window.addEventListener("message", this.handleFrameTasks);
      };
    }
  }

  componentWillUnmount() {
    window.removeEventListener("message", this.handleFrameTasks);
    window.removeEventListener("resize", this.onWindowResize);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    const patient = this.props.store.userStore.user.patients.find(
      (userPatient) => userPatient.id === id
    );

    if (!patient || patient.mementos.length < 3) {
      this.setState({ gameSpecs: undefined });
      return;
    }

    const gameSpecs = {};
    const { name, cpf } = patient;

    Object.assign(gameSpecs, {
      nome: name,
      cpf,
      size: patient.mementos.length - 1,
    });

    const mementos = getSnapshot(patient.mementos);

    const shuffledMementos = shuffle(mementos);
    // Make sure that the memento do not pass 5
    if (shuffledMementos.length > 5) {
      shuffledMementos.splice(0, shuffledMementos.length - 5);
    }

    for (const [
      index,
      { desc, data, type, url },
    ] of shuffledMementos.entries()) {
      const lembracaStr = `{"${index}":{"desc": "${desc}", "data": "${data}", "type": "${type}", "url": "${url}"}}`;
      const lembracaObj = JSON.parse(lembracaStr);

      Object.assign(gameSpecs, lembracaObj);
    }

    window.addEventListener("resize", this.onWindowResize, false);

    this.setState({
      ready: true,
      gameSpecs: gameSpecs,
    });
  }
}

export default withRouter(inject("store")(observer(Game)));
