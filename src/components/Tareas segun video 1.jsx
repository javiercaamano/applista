import React from 'react';

export class Tareas extends React.Component {
  constructor() {
    super();
    this.state = {
      tareas: [
        "Una tarea",
        "Otra tarea",
        "Super tarea"
      ],
      nuevaTarea: ''
    };
  }

  agregaTarea = () => {
    let tarea = this.state.nuevaTarea;
    this.setState({
      tareas: [...this.state.tareas, tarea]
    });
  }

  handleNuevaTarea = (even) => {
    this.setState({
      nuevaTarea: even.target.value
    });
  }


  render() {
    return (
      <div>
        <input type="text" value={this.state.nuevaTarea} onChange={(evento) => this.handleNuevaTarea(evento)}></input>
        <button onClick={this.agregaTarea}>Agregar</button>
        <ul>
          {this.state.tareas.map((elemento, indice) => {return <li key={indice}>{elemento}</li>})}
        </ul>
      </div>
    );
  }
}
