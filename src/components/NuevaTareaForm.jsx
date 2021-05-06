import React from 'react';

export class NuevaTareaForm extends React.Component {
  constructor() {
    super();
    // this.props=props;
    console.log(this.props)
    this.state = {
        nuevaTarea: {
            nombre: '',
            compañia: '',
            ciudad: '',
            pais: 'Argentina'
        }
    };
  }

  handleNuevaTareaNombre = (even) => {
    this.setState(prevState => ({
      nuevaTarea: {
          ...prevState.nuevaTarea, 
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

handleNuevaTarea = (ev) => {
    ev.preventDefault();
    if ( this.state.nuevaTarea.nombre.trim() === '' ||
        this.state.nuevaTarea.compañia.trim() === '' ||
        this.state.nuevaTarea.ciudad.trim() === '' ||
        this.state.nuevaTarea.pais.trim() === ''
    ){
        return false;
    }
    this.props.agregaNuevaTarea(ev, this.state.nuevaTarea);
}

  render() {
    return (
        <form onSubmit={this.handleNuevaTarea}>
            <label>Nombre:</label>
            <input type="text" required value={this.state.nuevaTarea.nombre} onChange={(evento) => this.handleNuevaTareaNombre(evento)}></input>
            <label>Compañia:</label>
            <input type="text" required value={this.state.nuevaTarea.compañia} onChange={(evento) => this.handleNuevaTareaCompañia(evento)}></input>
            <label>Ciudad:</label>
            <input type="text" required value={this.state.nuevaTarea.ciudad} onChange={(evento) => this.handleNuevaTareaCiudad(evento)}></input>
            <label>Pais:</label>
            <input type="text" required value={this.state.nuevaTarea.pais} onChange={(evento) => this.handleNuevaTareaPais(evento)}></input>
            <button type="submit">Agregar</button>
        </form>
    );
  }

  componentDidMount() {
  }
}