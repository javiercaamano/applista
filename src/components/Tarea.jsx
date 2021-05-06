import React from 'react';

export class Tarea extends React.Component {
  constructor() {
    super();
    //this.props=props;
    console.log(this.props)
  }

  render() {
    return (
        <li key={this.props.id}>
            <span>{this.props.elemento.nombre + '  '}</span>
            <span>{'- '+ this.props.elemento.compañia +'  '}</span>
            <span>{'- '+ this.props.elemento.ciudad +'  '}</span>
            <span>{'- '+ this.props.elemento.pais +'  '}</span>
            <button onClick = {() => this.props.onDelete(this.props.id)}>Eliminar</button>
        </li>
    );
  }

  componentDidMount() {}
}