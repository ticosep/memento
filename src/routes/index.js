import React from "react";
import { Route, Switch } from "react-router";

import Login from "../Components/Login/Login";
import Caregiver from "../Components/Paginas/CareGiver";
import Doctor from "../Components/Paginas/Doctor";
import Patient from "../Components/Patient/Patient";
import Scores from "../Components/Patient/Scores";
import Register from "../Components/Register/Register";
import RegisterPatient from "../Components/Register/RegisterPatient";
import Game from "../Game";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/cadastro" component={Register} />
      <Route exact path="/cuidador" component={Caregiver} />
      <Route exact path="/cadastropaciente" component={RegisterPatient} />
      <Route exact path="/paciente" component={Patient} />
      <Route exact path="/jogar" component={Game} />
      <Route exact path="/jogos" component={Scores} />
      <Route exact path="/medico" component={Doctor} />
    </Switch>
  );
};

export default Routes;
