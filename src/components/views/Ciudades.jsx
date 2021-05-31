import React from 'react';
import {validaValor} from '../../utils/validaString';
import "../../Common/paises.css";
import axios from "axios";

const url = {
  get: "https://api-fake-pilar-tecno.herokuapp.com/places",
  getpais: "https://api-fake-pilar-tecno.herokuapp.com/countries",
  post: "https://api-fake-pilar-tecno.herokuapp.com/places",
  delete: "https://api-fake-pilar-tecno.herokuapp.com/places/",
};

export class Ciudades extends React.Component {
  constructor() {
    super();
     this.state = {
      ciudad: '',
      paisSelect:'',
      dataCities: [],
      dataCountry:[]
    }
  }

  componentDidMount() {
    axios
      .get(url.get)
      .then((response) => {
        console.log(response);
        this.setState({ dataCities: response.data });
      })
      .catch((error) => { // Aca deberé tratar el error de algun modo
        console.log(error); // Tslvez un cartel alert
      });
      axios
      .get(url.getpais)
      .then((response) => {
        console.log(response);
        this.setState({ dataCountry: response.data });
      })
      .catch((error) => { // Aca deberé tratar el error de algun modo
        console.log(error); // Tslvez un cartel alert
      });
   }

  handleNuevaCiudad = (evt) => {
    evt.preventDefault();
    this.setState({
        ciudad: evt.target.value
    });
  }

  agregarCiudad = (evto) => {
    let ciudad = this.state.ciudad;
    let data = {name: ciudad, countrieId: this.state.paisSelect};

    evto.preventDefault();
    if (validaValor(data.name)){
      axios
        .post(url.post, data)
        .then((response) => {
          console.log(data);
          this.setState({
            dataCities: [...this.state.dataCities, response.data],
            ciudad:''
          })
        })
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
    axios
    .delete(url.delete+id)
    .then((resp) => {
        axios
          .get(url.get)
          .then((response) => {
            this.setState({ dataCities: response.data });
          })
          .catch((error) => { 
            console.log(error);
          });
    })
    .catch((error) => { // Aca deberé tratar el error de algun modo
      console.log(error); // Tslvez un cartel alert
    });
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
                <select className="formulario__select" onChange={(evento) => this.handleSelect(evento)}>
                  <option value="">Selecione pais...</option>
                  {this.state.dataCountry.map(({name, id}, indice) => {
                    return (<option key={indice} value={id}>{name}</option>)})}
                </select>
                <button className="formulario__btnP" onClick={(evento) => this.agregarCiudad(evento)} >Agregar</button>
              </div>
            </div>
          </form>
        </div>
        <h3 className="etiqueta">Ciudades</h3>
        <ul className="ulpais">
          {this.state.dataCities.map(({name, id}, indice) => {
            return (<>
              <li className="pais" key={indice}>{name}</li>
              <button className="botonP" key={indice} onClick={() => this.borrarCiudad(id)}>Eliminar</button></>
            )
          })}
        </ul>
      </>
    );
  }
}