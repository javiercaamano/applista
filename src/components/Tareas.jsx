import React from 'react';
import { Tarea } from './Tarea';
import { NuevaTareaForm } from './NuevaTareaForm';

export class Tareas extends React.Component {
  constructor() {
    super();
    //this.eliminarTarea = this.eliminarTarea.bind(this);
    //this.agregaNuevaTarea = this.agregaNuevaTarea.bind(this);
    this.state = {
      tareas: [
        {nombre: 'Supervisor', compañia: 'Empresa', ciudad: 'La Rioja', pais: 'Argentina'},
        {nombre: 'Empleado', compañia: 'Compa2', ciudad: 'Catamarca', pais: 'Argentina'},
        {nombre: 'Soporte', compañia: 'Compa3', ciudad: 'Cordoba', pais: 'España'}
      ]
    };
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
            return <Tarea key={indice} elemento={tarea} onDelete={() => this.eliminarTarea(indice)}></Tarea>
          })}
        </ul>
      </div>
    );
  }
}