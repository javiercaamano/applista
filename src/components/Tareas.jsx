import React from 'react';
import { Tarea } from './Tarea';
import { NuevaTareaForm } from './NuevaTareaForm';

export class Tareas extends React.Component {
  constructor() {
    super();
    // this.eliminarTarea = this.eliminarTarea.bind(this);
    // this.agregaNuevaTarea = this.agregaNuevaTarea.bind(this);
    this.state = {
      tareas: [
        {nombre: 'Una tarea', compañia: 'Compa1', ciudad: 'La Rioja', pais: 'Argentina'},
        {nombre: 'Otra tarea', compañia: 'Compa2', ciudad: 'Catamarca', pais: 'Argentina'},
        {nombre: 'Re otra tarea', compañia: 'Compa3', ciudad: 'Cordoba', pais: 'España'}
      ]
    };
  }

  agregaNuevaTarea = (ev) => {
    this.setState({
          tareas: [...this.state.tareas, this.state.nuevaTarea]
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
        <ul>
          {this.state.tareas.map((tarea, indice) => {
            return <Tarea key={indice} elemento={tarea} onDelete={() => this.eliminarTarea(indice)}></Tarea>
          })}
        </ul>
      </div>
    );
  }
}