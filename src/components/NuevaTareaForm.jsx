import React from 'react';
import "../index.css";
import axios from "axios";
import {validaValor} from '../utils/validaString'

const url = {
  get: "https://api-fake-pilar-tecno.herokuapp.com/jobs?_expand=organization",
  getOrg: "https://api-fake-pilar-tecno.herokuapp.com/organizations?_expand=place",
  post: "https://api-fake-pilar-tecno.herokuapp.com/jobs",
  delete: "https://api-fake-pilar-tecno.herokuapp.com/jobs/",
};

export class NuevaTareaForm extends React.Component {
  constructor() {
    super();
    console.log(this.props)
    this.state = {
        job: '',
        descripcion: 'cualquiera',
        orgSelect: '',
        organization: '',
        dataOrganizations: [],
        dataJobs: [],
    };
  }

  componentDidMount() {
    axios
      .get(url.get)
      .then((response) => {
        console.log(response);
        this.setState({ dataJobs: response.data });
      })
      .catch((error) => { // Aca deberé tratar el error de algun modo
        console.log(error); // Tslvez un cartel alert
      });

    axios
      .get(url.getOrg)
      .then((response) => {
        console.log(response);
        this.setState({ dataOrganizations: response.data });
      })
      .catch((error) => { // Aca deberé tratar el error de algun modo
        console.log(error); // Tslvez un cartel alert
      });
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

  handleImput = (evt) => {
    evt.preventDefault();
    this.setState({
        job: evt.target.value
    });
  }

handleNuevaTarea = (ev) => {
    ev.preventDefault();
    let job = this.state.job;
    let data = {position: job, organizationId: this.state.orgSelect, description: this.state.descripcion};
    if (validaValor(job)){
      axios
        .post(url.post, data)
        .then((response) => {
        this.setState({
          dataJobs: [...this.state.dataJobs, response.data],
          job:'',
          orgSelect: ''
        });
      })
    }
    else
      {
        this.setState({
          job:'',
          orgSelect: ''
        });
        alert("Ingreso invalido...");
      }

    this.props.agregaNuevaTarea(ev, {
      position: this.state.job,
      description: this.state.description,
      organization: this.state.organization,
      
      });
}

handleSelect= (ev) => {
console.log(ev.target.value)
  const organization = JSON.parse (ev.target.value)
  this.setState({
    orgSelect: organization.id,
    organization: organization,
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
                <input className="formulario__input" type="text" value={this.state.job}
                  placeholder="Ingrese Función" onChange={(evento) => this.handleImput(evento)}></input>
              </div>
            </div>

      {/* Carga de Compañia */}
            <div className="formulario__grupo">
              <label className="formulario__label" >Compañía:</label>
              <div  className="formulario__grupo-input">
                <select className="formulario__input" onChange={(evento) => this.handleSelect(evento)}>
                  <option value="">Selecione compañia...</option>
                  {this.state.dataOrganizations.map((elem, indice) => {
                    return (<option key={indice} value={JSON.stringify(elem)}>{elem.name}</option>)})}
                </select>
              </div>
            </div>

      {/* Carga de Ciudad
            <div className="formulario__grupo">
              <label className="formulario__label" >Ciudad:</label>
              <div  className="formulario__grupo-input">
                <input className="formulario__inputP" type="text" disable value={this.state.nuevaTarea.ciudad}></input>
              </div>
            </div>

      Carga de Pais
            <div className="formulario__grupo">
              <label className="formulario__label" >Pais:</label>
              <div  className="formulario__grupo-input">
              <input className="formulario__inputP" type="text" disable value={this.state.nuevaTarea.pais}></input>
              </div>
            </div> */}


            <div className="formulario__grupo-btn-agregar">
              <button className="formulario__btn" type="submit">Agregar</button>
            </div>
        </form>
      </div>
    );
  }
}