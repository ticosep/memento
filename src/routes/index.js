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
import PrivateRoute from "./PrivateRoute";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/cadastro" component={Register} />
      <PrivateRoute exact path="/cuidador" component={Caregiver} />
      <PrivateRoute
        exact
        path="/cadastropaciente"
        component={RegisterPatient}
      />
      <PrivateRoute exact path="/paciente/:id" component={Patient} />
      <PrivateRoute exact path="/jogar/:id" component={Game} />
      <PrivateRoute exact path="/jogos/:id" component={Scores} />
      <PrivateRoute exact path="/medico" component={Doctor} />
    </Switch>
  );
};

export default Routes;
