import React from 'react';
import {validaValor} from '../../utils/validaString';
import "../../Common/paises.css";
import axios from "axios";

const url = {
  get: "https://api-fake-pilar-tecno.herokuapp.com/countries",
  post: "https://api-fake-pilar-tecno.herokuapp.com/countries",
  delete: "https://api-fake-pilar-tecno.herokuapp.com/countries/",
};

export class Paises extends React.Component {
  constructor() {
    super();
     this.state = {
        pais: '',
        dataCountry:[],  //recibo de la API Rest 
      }
  }
  
  componentDidMount() {
    axios
      .get(url.get)
      .then((response) => {
        console.log(response);
        this.setState({ dataCountry: response.data });
      })
      .catch((error) => { // Aca deberé tratar el error de algun modo
        console.log(error); // Tslvez un cartel alert
      });
   }

  handleNuevoPais = (evt) => {
    evt.preventDefault();
    this.setState({
        pais: evt.target.value
    });
  }
  
  agregarPais = (evto) => {

    let pais = this.state.pais;
    let data = {name: pais} 

    evto.preventDefault();
    if (validaValor(data.name)){
      axios
        .post(url.post, data)
        .then((response) => {
          console.log(data);
          this.setState({
            dataCountry: [...this.state.dataCountry, response.data],
            pais:''
          })
        })
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
    axios
    .delete(url.delete+id)
    .then((resp) => {
        axios
          .get(url.get)
          .then((response) => {
            this.setState({ dataCountry: response.data });
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
          {this.state.dataCountry.map(({name, id}, indice) => {
            return (<>
              <li className="pais" key={indice} >{name}</li>
              <button className="botonP" key={indice} onClick={() => this.borrarPais(id)}>Eliminar</button></>
            )
          })}
        </ul>
      </>
    );
  }
}