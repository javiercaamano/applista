import React from 'react';
import {validaValor} from '../../utils/validaString';
import "../../Common/paises.css";

export class Paises extends React.Component {
  constructor() {
    super();
     this.state = {
        pais: '',
        paises: [],
      }
  }
  
  componentDidMount() {
    if (localStorage.getItem("countries") != null) {
      this.setState({
        paises: JSON.parse(localStorage.getItem("countries")),
      });
    }
   }

  handleNuevoPais = (evt) => {
    evt.preventDefault();
    this.setState({
        pais: evt.target.value
    });
  }
  
  agregarPais = (evto) => {
    let pais = this.state.pais;
    evto.preventDefault();
    if (validaValor(pais)){
      this.setState({
        paises: [...this.state.paises, pais],
        pais:''
      });
      window.localStorage.setItem("countries", JSON.stringify([...this.state.paises, pais]))
    }
    else 
      {
        this.setState({
          pais:''
        });
        alert("Ingreso invalido...");
      }
  }

  borrarPais = (id) => {
    let otra = this.state.paises.filter((pais, idx) => idx !== id)
    this.setState({
      paises: otra
    });
    window.localStorage.setItem("countries", JSON.stringify(otra))
  }

  render() {
    return (
      <>
        <div className="todoP" >
          <form className="formularioP">
            <div className="formulario__grupoP">
              <label className="formulario__labelP" >Pais:</label>
              <div  className="formulario__grupo-inputP">
                <input className="formulario__inputP" type="text" value={this.state.pais}
                  placeholder="Ingrese Pais" onChange={(evento) => this.handleNuevoPais(evento)}></input>
                <button className="formulario__btnP" onClick={(evento) => this.agregarPais(evento)} >Agregar</button>
              </div>
            </div>
          </form>
        </div>
        <h3 className="etiqueta">Paises</h3>
        <ul className="ulpais">
          {this.state.paises.map((elem, indice) => {
            return (<>
              <li className="pais" key={indice} >{elem}</li>
              <button className="botonP" key={indice} onClick={() => this.borrarPais(indice)}>Eliminar</button></>
            )
          })}
        </ul>
      </>
    );
  }
}