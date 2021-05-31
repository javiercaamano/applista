import React from 'react';
import "../Common/Lista.css";
import axios from "axios";

export class Tarea extends React.Component {
  constructor() {
    super();
    //this.props=props;
    console.log(this.props);
    this.state= {ciudad: ''};
    this.buscarDatos = this.buscarDatos.bind(this)
  }

  componentDidMount(){
    const id= this.props.elemento.organization.placeId
    this.buscarDatos(id);
} 

  buscarDatos(id){
    axios
      .get(`https://api-fake-pilar-tecno.herokuapp.com/places/${id}?_expand=countrie`)
      .then((response) => {
        console.log(response);
        this.setState({
          ciudad: response.data,
        })
      })
      .catch((error) => { 
        console.log(error); 
      });
  }

  render() {
    if (this.state.ciudad) {
      return (
        <div className="elemento">
              <ul key={this.props.id}>
                <span>{this.props.elemento.position}</span>
                <span>{this.props.elemento.organization.name }</span>
                <span>{this.state.ciudad.name }</span>
                <span>{this.state.ciudad.countrie.name }</span>
                <button className="boton" onClick = {() => this.props.onDelete(this.props.id)}>Eliminar</button>
              </ul>
        </div>
       );
    }
    else {return (<div></div>);}
  }
}