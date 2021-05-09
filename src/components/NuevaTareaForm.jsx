import React from 'react';
import "../index";

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
            pais: ''
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
      <div className="todo" >
        <form className="formulario" onSubmit={this.handleNuevaTarea}>


            <div className="formulario__grupo">
              <label className="formulario__label">Función:</label>
              <div  className="formulario__grupo-input">
                <input className="formulario__input" type="text" required value={this.state.nuevaTarea.nombre}
                  placeHolder="Ingrese Función" onChange={(evento) => this.handleNuevaTareaNombre(evento)}></input>
              </div>
            </div>


            <div className="formulario__grupo">
              <label className="formulario__label" >Compañía:</label>
              <div  className="formulario__grupo-input">
                <input className="formulario__input" type="text" required value={this.state.nuevaTarea.compañia}
                  placeHolder="Ingrese Compañía" onChange={(evento) => this.handleNuevaTareaCompañia(evento)}></input>
              </div>
            </div>


            <div className="formulario__grupo">
              <label className="formulario__label" >Ciudad:</label>
              <div  className="formulario__grupo-input">
                <input className="formulario__input" type="text" required value={this.state.nuevaTarea.ciudad}
                 placeHolder="Ingrese Ciudad" onChange={(evento) => this.handleNuevaTareaCiudad(evento)}></input>
              </div>
            </div>


            <div className="formulario__grupo">
              <label className="formulario__label" >Pais:</label>
              <div  className="formulario__grupo-input">
                <input className="formulario__input" type="text" required value={this.state.nuevaTarea.pais}
                 placeHolder="Ingrese Pais" onChange={(evento) => this.handleNuevaTareaPais(evento)}></input>
              </div>
            </div>

            <div className="formulario__grupo-btn-agregar">
              <button className="formulario__btn" type="submit">Agregar</button>
            </div>
        </form>
      </div>
    );
  }

  componentDidMount() {
  }
}