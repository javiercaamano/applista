import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const data = [ ];

class App extends React.Component {
  state = {
    data: data,
    insertar: false,
    form: { funcion: "", empresa: "",  ciudad: "",   pais:"",  },
  };

   mostrarInsertar = () => {this.setState({  insertar: true,});};

  cerrarInsertar = () => {this.setState({ insertar: false });};
  

  eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar este registro ");
    if (opcion === true) {
        var arreglo = this.state.data;
      arreglo.forEach((registro) => {
        if (dato.id === registro.id) {
          arreglo.splice(dato, 1);
        }
      });
      
      this.setState({ data: arreglo });
    }
  };

  insertar = () => {
    var nuevoRegistro= {...this.state.form};
    var items= this.state.data; 
      items.push(nuevoRegistro);
    this.setState({ insertar: false, data: items });
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
     const form = this.state.form;
    return (
      <>
        <Container>
          <>
          <br />
          </>

          <Table>
         
            <thead>

              <tr>
                <th>Función</th>
                <th>Empresa</th>
                <th>Ciudad</th>
                <th>País</th>
                <th>Acción</th>
              </tr>

            </thead>

            <tbody>
            
            {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.funcion}</td>
                  <td>{dato.empresa}</td>
                  <td>{dato.ciudad}</td>
                  <td>{dato.pais}</td>
                  <td><Button 
                        color="danger" 
                        onClick={()=> this.eliminar(dato)}>
                        Eliminar
                      </Button>
                  </td>
                </tr>
              ))}

            </tbody>

          </Table>
          <br />
          <Button 
          color="info" 
          onClick={()=>this.mostrarInsertar()}
          >Registrar
          </Button>
          <br />
          <br />
        </Container>
                                                        
        <Modal isOpen={this.state.actualizar}>

          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>

            <FormGroup>
              <label>
               Funcion:
              </label>
            
              <input
                className="form-control"
                name="funcion"
                type="text"
                onChange={this.handleChange}
                value={form.funcion}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Empresa: 
              </label>
              <input
                className="form-control"
                name="empresa"
                type="text"
                onChange={this.handleChange}
                value={form.empresa}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Ciudad: 
              </label>
              <input
                className="form-control"
                name="ciudad"
                type="text"
                onChange={this.handleChange}
                value={form.ciudad}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Pais: 
              </label>
              <input
                className="form-control"
                name="pais"
                type="text"
                onChange={this.handleChange}
                value={form.pais}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>

            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>

        </Modal>

                              

        <Modal isOpen={this.state.insertar}>
          <ModalHeader>
           <div><h3>Igresar Datos</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Funcion: 
              </label>
              
              <input
                className="form-control"
                name="funcion"
                type="text"
                onChange={this.handleChange}
                placeholder="Función que desempeña"
                
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Empresa: 
              </label>
              <input
                className="form-control"
                name="empresa"
                type="text"
                onChange={this.handleChange}
                placeholder="Nombre de la empresa"
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Ciudad: 
              </label>
              <input
                className="form-control"
                name="ciudad"
                type="text"
                onChange={this.handleChange}
                placeholder="Ciudad donde se encuentra"
              />
            </FormGroup>

            <FormGroup>
              <label>
                País: 
              </label>
              <input
                className="form-control"
                name="pais"
                type="text"
                onChange={this.handleChange}
                placeholder="País donde se encuentra"
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
         
        </Modal>
        
      </>
    );
  }
}
export default App;