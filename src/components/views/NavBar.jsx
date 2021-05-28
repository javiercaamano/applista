import React from 'react';
import {Link} from 'react-router-dom';

export class NavBar extends React.Component {
  constructor() {
    super();
  }

  render() {
    return <p className="navbar">
        <Link to="/">Home </Link>
        <Link to="/compañias">Compañias </Link>
        <Link to="/ciudades">Ciudades </Link>
        <Link to="/paises">Paises</Link>
    </p>;
  }
}