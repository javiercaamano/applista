import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Tareas} from './components/views/Tareas';
import {Compañias} from './components/views/Compañias';
import {Ciudades} from './components/views/Ciudades';
import {NavBar} from './components/views/NavBar';
import {VistaNoEncontrada} from './components/views/VistaNoEncontrada';
import {Paises} from './components/views/Paises';

export class App extends React.Component {
    constructor() {
      super();
      this.state = {
        paises: ["Argentina", "Uruguay", "Brasil"],
        ciudades: [
            {ciudad: "La Rioja", pais: 0},
            {ciudad: "Rosario", pais: 0},
            {ciudad: "Canelones", pais: 1},
            {ciudad: "Ingleses", pais: 2},
            {ciudad: "Canasvieiras", pais: 2}
            ]
        }
    }

    render (){
        return(
            <Router>
                <NavBar></NavBar>
                    <Switch>
                        <Route path="/" exact component={Tareas}></Route>
                        <Route path="/Compañias" exact component={Compañias}></Route>
                        <Route path="/Ciudades" exact component={Ciudades}></Route>
                        <Route path="/Paises" exact component={Paises}></Route>
                        <Route component={VistaNoEncontrada}></Route>
                    </Switch>
            </Router>
        );
    }
}
export default App;