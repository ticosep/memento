import React from 'react';
import Login from './Login/Login'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Cadastro from './Cadastro/Cadastro'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './index.css';
import Cuidador from './Paginas/Cuidador';


const routing = (
    <Router>

        <Route exact path="/" component={Login} />
        <Route exact path="/cadastro" component={Cadastro} />
        <Route exact path="/cuidador" component={Cuidador} />

    </Router>
)


ReactDOM.render(routing, document.getElementById('root'))