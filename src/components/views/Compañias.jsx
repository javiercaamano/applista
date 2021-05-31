import React from 'react';
import {validaValor} from '../../utils/validaString';
import "../../Common/paises.css";
import axios from "axios";

const url = {
  get: "https://api-fake-pilar-tecno.herokuapp.com/organizations",
  getciudad: "https://api-fake-pilar-tecno.herokuapp.com/places?_expand=countrie",
  post: "https://api-fake-pilar-tecno.herokuapp.com/organizations",
  delete: "https://api-fake-pilar-tecno.herokuapp.com/organizations/",
};

export class Compañias extends React.Component {
  constructor() {
    super();
      this.state = {
        compañia: '',
        ciudadSelect: '',
        dataOrganizations: [],
        dataCities: []
      }
    }

  componentDidMount() {
    axios
      .get(url.get)
      .then((response) => {
        console.log(response);
        this.setState({ dataOrganizations: response.data });
      })
      .catch((error) => { // Aca deberé tratar el error de algun modo
        console.log(error); // Tslvez un cartel alert
      });

    axios
      .get(url.getciudad)
      .then((response) => {
        console.log(response);
        this.setState({ dataCities: response.data });
      })
      .catch((error) => { // Aca deberé tratar el error de algun modo
        console.log(error); // Tslvez un cartel alert
      });
  }

  handleNuevaCompañia = (evt) => {
    evt.preventDefault();
    this.setState({
        compañia: evt.target.value
    });
  }

  agregarCompañia = (evto) => {
    let compañia = this.state.compañia;
    let data = {name: compañia, placeId: this.state.ciudadSelect};

    evto.preventDefault();
    if (validaValor(compañia)){
      axios
        .post(url.post, data)
        .then((response) => {
        this.setState({
          dataOrganizations: [...this.state.dataOrganizations, response.data],
          compañia:'',
          ciudadSelect: ''
        });
      })
    }
    else
      {
        this.setState({
          compañia:'',
          ciudadSelect: ''
        });
        alert("Ingreso invalido...");
      }
  }

  handleSelectCiudad= (ev) => {
    let algo = JSON.parse(ev.target.value)
      this.setState({
      ciudadSelect: algo.id,
      countrySelect: algo.countrie.name
    })
  }

  borrarCompañia = (id) => {
    axios
    .delete(url.delete+id)
    .then((resp) => {
        axios
          .get(url.get)
          .then((response) => {
            this.setState({ dataOrganizations: response.data });
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
              <label className="formulario__labelP" >Compañia:</label>
              <div  className="formulario__grupo-inputP">
                <input className="formulario__inputP" type="text" value={this.state.compañia}
                  placeholder="Ingrese Compañia" onChange={(evento) => this.handleNuevaCompañia(evento)}></input>
                <select className="formulario__select" onChange={(evento) => this.handleSelectCiudad(evento)}>
                  <option value="">Selecione ciudad...</option>
                  {this.state.dataCities.map((elem, indice) => {                      //Elijo ciudad
                    return (<option key={indice} value={JSON.stringify(elem)}>{elem.name}</option>)})}
                </select>
                  <input className="formulario__inputP" type="text" disable value={this.state.countrySelect}></input>
                <button className="formulario__btnP" onClick={(evento) => this.agregarCompañia(evento)} >Agregar</button>
              </div>
            </div>
          </form>
        </div>
        <h3 className="etiqueta">Compañias</h3>
        <ul className="ulpais">
          {this.state.dataOrganizations.map(({name, id}, indice) => {
            return (<>
              <li className="pais" key={indice}>{name}</li>
              <button className="botonP" key={indice} onClick={() => this.borrarCompañia(id)}>Eliminar</button></>
            )
          })}
        </ul>
      </>
    );
  }
}