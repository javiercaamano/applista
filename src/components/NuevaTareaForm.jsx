import React from 'react';
import "../index.css";

export class NuevaTareaForm extends React.Component {
  constructor() {
    super();
    console.log(this.props)
    this.state = {
        nuevaTarea: {
            nombre: '',
            compañia: '',
            ciudad:'',
            pais:''
        },
        nombrees: [],
        ciudades: [],
        paises: [],
        compañias: []
    };
  }

  componentDidMount() {
    if (localStorage.getItem("nombrees") != null) {
      this.setState({
        nombrees: JSON.parse(localStorage.getItem("nombrees")),
      });
    }
    if (localStorage.getItem("companies") != null) {
      this.setState({
        compañias: JSON.parse(localStorage.getItem("companies")),
      });
    }
    if (localStorage.getItem("cities") != null) {
      this.setState({
        ciudades: JSON.parse(localStorage.getItem("cities")),
      });
    }
    if (localStorage.getItem("countries") != null) {
      this.setState({
        paises: JSON.parse(localStorage.getItem("countries"))
      });
    }
  }

  componentDidUpdate(){
    window.localStorage.setItem("nombrees", JSON.stringify(this.state.nombrees))
  }

  handleNuevaTareanombre = (even) => {
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

handleSelect= (ev) => {
console.log(ev.target.value)
  const {compañia, ciudad, pais} =JSON.parse (ev.target.value)
  this.setState({
  nuevaTarea: {
    ...this.state.nuevaTarea,
    compañia: compañia,
    ciudad: ciudad,
    pais: pais
  }
  })
}

  render() {
    return (
      <div className="todo" >
        <form className="formulario" onSubmit={this.handleNuevaTarea}>

      {/* Carga de nombre */}
            <div className="formulario__grupo">
              <label className="formulario__label">Función:</label>
              <div  className="formulario__grupo-input">
                <input className="formulario__input" type="text" required value={this.state.nuevaTarea.nombre}
                  placeholder="Ingrese Función" onChange={(evento) => this.handleNuevaTareanombre(evento)}></input>
              </div>
            </div>

      {/* Carga de Compañia */}
            <div className="formulario__grupo">
              <label className="formulario__label" >Compañía:</label>
              <div  className="formulario__grupo-input">
                <select className="formulario__input" onChange={(evento) => this.handleSelect(evento)}>
                  <option value="">Selecione compañia...</option>
                  {this.state.compañias.map((elem, indice) => {
                    return (<option key={indice} value={JSON.stringify(elem)}>{elem.compañia}</option>)})}
                </select>
              </div>
            </div>

      {/* Carga de Ciudad */}
            <div className="formulario__grupo">
              <label className="formulario__label" >Ciudad:</label>
              <div  className="formulario__grupo-input">
                <input className="formulario__inputP" type="text" disable value={this.state.nuevaTarea.ciudad}></input>
              </div>
            </div>

      {/* Carga de Pais */}
            <div className="formulario__grupo">
              <label className="formulario__label" >Pais:</label>
              <div  className="formulario__grupo-input">
              <input className="formulario__inputP" type="text" disable value={this.state.nuevaTarea.pais}></input>
              </div>
            </div>


            <div className="formulario__grupo-btn-agregar">
              <button className="formulario__btn" type="submit">Agregar</button>
            </div>
        </form>
      </div>
    );
  }
}