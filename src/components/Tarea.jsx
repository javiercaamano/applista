import React from 'react';
import "../Common/Lista.css";
import axios from "axios";

export class Tarea extends React.Component {
  constructor() {
    super();
    //this.props=props;
    console.log(this.props);
    this.state= {ciudad: ''}
  }

componentDidMount(){
  buscarDatos(this.props.id)
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
    return (
      <div className="elemento">
            <ul key={this.props.id}>
              <span>{this.props.elemento.position}</span>
              <span>{this.props.elemento.organization.name }</span>
              <span>{this.props.elemento.ciudad.name }</span>
               <span>{this.props.elemento.ciudad.countrie.name }</span>
              <button className="boton" onClick = {() => this.props.onDelete(this.props.id)}>Eliminar</button>
            </ul>
      </div>
    );
  }

  componentDidMount() {}
}
