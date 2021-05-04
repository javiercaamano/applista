import React from 'react';


export class Tareas extends React.Component {
  constructor() {
    super();
    this.state = {
      tareas: [
        // {nombre: 'Una tarea', compañia: 'Compa1', ciudad: 'La Rioja', pais: 'Argentina'},
        // {nombre: 'Otra tarea', compañia: 'Compa2', ciudad: 'Catamarca', pais: 'Argentina'},
        // {nombre: 'Re otra tarea', compañia: 'Compa3', ciudad: 'Cordoba', pais: 'España'}
      ],
      nuevaTarea: {
        nombre: '',
        compañia: '',
        ciudad: '',
        pais: 'Argentina'
      }
    };
  }

  agregaTarea = () => {
    this.setState({
      tareas: [...this.state.tareas, this.state.nuevaTarea]
    });
  }

  handleNuevaTareaNombre = (even) => {
    this.setState(prevState => ({
      nuevaTarea: {
          ...prevState, 
          nombre: even.target.value
        }
      })
    );
  }

  handleNuevaTareaCompañia = (even) => {
    this.setState(prevState => ({
      nuevaTarea: {
          ...prevState.nuevaTarea, 
          compañia: even.target.value
        }
      })
    );
  }

  handleNuevaTareaCiudad = (even) => {
    this.setState(prevState => ({
      nuevaTarea: {
          ...prevState.nuevaTarea, 
          ciudad: even.target.value
        }
      })
    );
  }

  handleNuevaTareaPais = (even) => {
    this.setState(prevState => ({
      nuevaTarea: {
          ...prevState.nuevaTarea, 
          pais: even.target.value
        }
      })
    );
  }

  eliminarTarea = (id) => {
    this.setState({
      tareas: this.state.tareas.filter((tarea, ind) => ind !== id)
    });
  }

  render() {
    return (
      <div>
          <label>Nombre:</label>
          <input type="text" value={this.state.nuevaTarea.nombre} onChange={(evento) => this.handleNuevaTareaNombre(evento)}></input>
          <label>Compañia:</label>
          <input type="text" value={this.state.nuevaTarea.compañia} onChange={(evento) => this.handleNuevaTareaCompañia(evento)}></input>
          <label>Ciudad:</label>
          <input type="text" value={this.state.nuevaTarea.ciudad} onChange={(evento) => this.handleNuevaTareaCiudad(evento)}></input>
          <label>Pais:</label>
          <input type="text" value={this.state.nuevaTarea.pais} onChange={(evento) => this.handleNuevaTareaPais(evento)}></input>
          <button onClick={this.agregaTarea}>Agregar</button>
          <ul>
            {this.state.tareas.map((elemento, indice) => { return (
              <li key={indice}>
              <span>{elemento.nombre + '  '}</span>
              <span>{'- '+ elemento.compañia +'  '}</span>
              <span>{'- '+ elemento.ciudad +'  '}</span>
              <span>{'- '+ elemento.pais +'  '}</span>
              <button onClick={() => this.eliminarTarea(indice)}>Eliminar</button>
              </li>)
            })}
          </ul>
      </div>
    );
  }
}
