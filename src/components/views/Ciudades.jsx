import React from 'react';
import {validaValor} from '../../utils/validaString';
import "../../Common/paises.css";

export class Ciudades extends React.Component {
  constructor() {
    super();
     this.state = {
      ciudad: '',
      paisSelect: '',
      ciudades: [],
      paises: []
    }
  }

  componentDidMount() {
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
    window.localStorage.setItem("cities", JSON.stringify(this.state.ciudades))
  }

  handleNuevaCiudad = (evt) => {
    evt.preventDefault();
    this.setState({
        ciudad: evt.target.value
    });
  }

  agregarCiudad = (evto) => {
    let ciudad = this.state.ciudad;
    let pais = this.state.paisSelect;
    evto.preventDefault();
    if (validaValor(ciudad) && validaValor(pais)){
      this.setState({
        ciudades: [...this.state.ciudades, {ciudad:ciudad, pais:pais}],
        ciudad:''
      });
    }
    else 
      {
        this.setState({
          ciudad:''
        });
        alert("Ingreso invalido...");
      }
  }

  handleSelect= (ev) => {
    this.setState({
      paisSelect: ev.target.value
    })
  }

  borrarCiudad = (id) => {
    let other = this.state.ciudades.filter((ciudad, idx) => idx !== id)
    this.setState({
      ciudades: other
    });
    window.localStorage.setItem("cities", JSON.stringify(other))
  }

  render() {
    return (
      <>
        <div className="todoP" >
          <form className="formularioP">
            <div className="formulario__grupoP">
              <label className="formulario__labelP" >Ciudad:</label>
              <div  className="formulario__grupo-inputP">
                <input className="formulario__inputP" type="text" value={this.state.ciudad}
                  placeholder="Ingrese Ciudad" onChange={(evento) => this.handleNuevaCiudad(evento)}></input>
                <select onChange={(evento) => this.handleSelect(evento)}>
                  <option value="">Selecione pais...</option>
                  {this.state.paises.map((elem, indice) => {
                    return (<option className="pais" key={indice} value={elem}>{elem}</option>)})}
                </select>
                <button className="formulario__btnP" onClick={(evento) => this.agregarCiudad(evento)} >Agregar</button>
              </div>
            </div>
          </form>
        </div>
        <h3 className="etiqueta">Ciudades</h3>
        <ul className="ulpais">
          {this.state.ciudades.map((elem, indice) => {
            return (<>
              <li className="pais" key={indice}>{elem.ciudad + ' ' + elem.pais}</li>
              <button className="botonP" key={indice} onClick={() => this.borrarCiudad(indice)}>Eliminar</button></>
            )
          })}
        </ul>
      </>
    );
  }
}