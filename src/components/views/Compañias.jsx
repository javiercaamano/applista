import React from 'react';
import {validaValor} from '../../utils/validaString';
import "../../Common/paises.css";
// import Select from "react-select";

export class Compañias extends React.Component {
  constructor() {
    super();
      this.state = {
        compañia: '',
        ciudadSelect: '',
        paisSelect: '',
        ciudades: [],
        paises: [],
        compañias:[]
      }
    }

  componentDidMount() {
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
    window.localStorage.setItem("companies", JSON.stringify(this.state.compañias))
  }

  grabarDatos = () => {
    window.localStorage.setItem("companies", JSON.stringify(this.state.compañias))
  }

  handleNuevaCompañia = (evt) => {
    evt.preventDefault();
    this.setState({
        compañia: evt.target.value
    });
  }

  agregarCompañia = (evto) => {
    let compañia = this.state.compañia;
    let ciudad = this.state.ciudadSelect.ciudad;
    let pais = this.state.ciudadSelect.pais; //ver si esto esta ok, creo que no, debería ya venir
    evto.preventDefault();
    if (validaValor(compañia) && validaValor(ciudad) && validaValor(pais)){
      this.setState({
        compañias: [...this.state.compañias, {compañia:compañia, ciudad:ciudad, pais:pais}],
        compañia:'',
        ciudadSelect: ''
      });

     }
    else 
      {
        this.setState({
          compañia:''
        });
        alert("Ingreso invalido...");
      }
  }

  handleSelectCiudad= (ev) => {
    this.setState({
      ciudadSelect: JSON.parse(ev.target.value)
    })
  }

  borrarCompañia = (id) => {
    this.setState({
      compañias: this.state.compañias.filter((compañia, idx) => idx !== id)
    });
  }

  render() {
    return (
      <>
        <div className="todoP" >
          <form className="formularioP">
            <div className="formulario__grupoP">
              <label className="formulario__labelP" >Compañia:</label>
              <div  className="formulario__grupo-inputP">

                <input className="formulario__inputP" type="text" value={this.state.compañia}
                  placeholder="Ingrese Compañia" onChange={(evento) => this.handleNuevaCompañia(evento)}></input>


                <select onChange={(evento) => this.handleSelectCiudad(evento)}>

                  <option value="">Selecione ciudad...</option>

                  {this.state.ciudades.map((elem, indice) => {                      //Elijo ciudad
                    return (<option key={indice} value={JSON.stringify(elem)}>{elem.ciudad}</option>)})}
                </select>

                  <input className="formulario__inputP" type="text" disable value={this.state.ciudadSelect.pais}></input>

                <button className="formulario__btnP" onClick={(evento) => this.agregarCompañia(evento)} >Agregar</button>
              </div>
            </div>
          </form>
        </div>
        <h3 className="etiqueta">Ciudades</h3>
        <ul className="ulpais">
          {this.state.compañias.map((elem, indice) => {
            return (<>
              <li className="pais" key={indice}>{elem.compañia + ' ' + elem.ciudad + ' ' + elem.pais}</li>
              <button className="botonP" key={indice} onClick={() => this.borrarCompañia(indice)}>Eliminar</button></>
            )
          })}
        </ul>
      </>
    );
  }
}
// styles={selectStyles}