import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {Provider} from "mobx-react";

import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Cuidador from './Paginas/Cuidador';
import CadastroPaciente from './Cadastro/CadastroPaciente';
import Cadastro from './Cadastro/Cadastro'
import Login from './Login/Login'
import Paciente from './Paciente/Paciente';

import rootStore from './Stores/rootStore';
 

const routing = (
    <Provider store={rootStore}>
        <Router>
            <Route exact path="/" component={Login} />
            <Route exact path="/cadastro" component={Cadastro} />
            <Route exact path="/cuidador" component={Cuidador} />
            <Route exact path="/cadastropaciente"  component={CadastroPaciente}/>
            <Route exact path="/paciente"  component={Paciente}/>
        </Router>
    </Provider>
)


ReactDOM.render(routing, document.getElementById('root'))