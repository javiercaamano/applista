import React from 'react';
import { Tarea } from '../Tarea';
import { NuevaTareaForm } from '../NuevaTareaForm';
import axios from "axios";

const url = {
  get: "https://api-fake-pilar-tecno.herokuapp.com/jobs?_expand=organization",
  getOrg: "https://api-fake-pilar-tecno.herokuapp.com/organizations?_expand=place",
  post: "https://api-fake-pilar-tecno.herokuapp.com/jobs",
  delete: "https://api-fake-pilar-tecno.herokuapp.com/jobs/",
};

export class Tareas extends React.Component {
  constructor() {
    super();
    this.state = {
      tareas: []
    };
  }

  componentDidMount(){
    axios
      .get(url.get)
      .then((response) => {
        console.log(response);
        this.setState({ tareas: response.data });
      })
      .catch((error) => { // Aca deberé tratar el error de algun modo
        console.log(error); // Tslvez un cartel alert
      });
  }

  agregaNuevaTarea = (ev, elem) => {
    this.setState({
          tareas: [...this.state.tareas, elem]
      });
  }

   eliminarTarea = (id) => {
    this.setState({
      tareas: this.state.tareas.filter((tarea, ind) => ind !== id)
    });
  }

  render() {
    return (
      <div>
        <NuevaTareaForm agregaNuevaTarea={this.agregaNuevaTarea}> </NuevaTareaForm>
        <ul className="lista">
          <span> Función </span>
          <span> Compañia </span>
          <span> Ciudad </span>
          <span> País </span>
          <span> Acción </span>
        </ul>
        <ul>
          {this.state.tareas.map((tarea, indice) => {
            debugger
            return <Tarea key={indice} elemento={tarea} onDelete={() => this.eliminarTarea(indice)}></Tarea>
          })}
        </ul>
      </div>
    );
  }
}