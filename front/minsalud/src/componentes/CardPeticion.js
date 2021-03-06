import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import './css/tarjeta.css'
class CardPeticion extends Component {
  constructor(props) {
    super(props);
    this.state = {
  centroHosp: 
    {nombre:""}
  
}
}
  componentWillMount(){
    const url = `${this.props.url}centroHospitalarioId?idCentro=${this.props.peticion.Peticion.idCentro}`;
    fetch(url, {
      method: "GET"
     
    }).then(resp=>resp.json())
    .then(data =>{
      if(data.CentroHospitalario[0] !== undefined){
        
      this.setState({centroHosp:data.CentroHospitalario[0]}
        )}})
    .catch(error => console.log(error))
      
    }
    
  
  render() {
    const peticion = this.props.peticion.Peticion
    var idPeticion = this.props.peticion._id
    var fecha = this.props.peticion.createdAt.split("T")[0]
    var hora = this.props.peticion.createdAt.split("T")[1].split(".")[0] 
    let estadoPeticion = peticion.respondidaCompletamente
    let estado = 'Pendiente'
    let colorAlerta ='warning'
    if(estadoPeticion === true){
      estado = 'Resuelta'
      colorAlerta = 'success'
    }else if(peticion.hasOwnProperty('rechazada')){
      estado = 'Rechazada'
      colorAlerta = 'danger'
    }
    
      return (
          <div className="tarjeta">
        <Card >
        <Card.Header as="h5">Centro Hospitalario: {this.state.centroHosp.nombre} </Card.Header>
        <Card.Body>
      <Card.Title>Ciudad: {this.state.centroHosp.ciudad}</Card.Title>
            <Card.Text>
            <ul>
            <li>Fecha de solicitud: {fecha}</li>
            <li>Hora: {hora}</li>
            <br/>
            <Alert variant={colorAlerta}>
            Estado: {estado}
            </Alert>
            </ul>
            </Card.Text>
            <Button variant="primary" href={`/peticion/${idPeticion}`}>Ver detalles</Button>
        </Card.Body>
        </Card>
        <br/>
        </div>
      );
    }
  
  }
  
  export default CardPeticion;