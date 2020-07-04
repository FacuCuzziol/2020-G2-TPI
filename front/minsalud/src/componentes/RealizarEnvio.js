import React, {Component} from 'react';
import './css/envio.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ReactDOM from 'react-dom'
import Alert from 'react-bootstrap/Alert'
class RealizarEnvio extends Component {
    constructor(props) {
		super(props);
		this.state = {
            recursos: [],
            peticion:{},
            centrosAPI: [],
            centroPeticion:{
                id:0, 
                nombre:""},
            envio:{},
            medicos:[],
            idDIVmedico:0,
            estadoCantMed:true,
            medicoEnvio:[]
    }}
    traerData(){
    const urlRecursos = `${this.props.url}recursos`;
    fetch(urlRecursos, {
      method: "GET"
      //,headers: {
      //  "x-api-key": "FTlS2bc9lo1OtmzHCBrju4ZL8PqFM5yr4JB775RR"}
    }).then(resp=>resp.json())
    .then(recu => this.setState({recursos: recu[0].Recursos}))
    
    const urlMedicos = `${this.props.url}medicos`;
    fetch(urlMedicos, {
      method: "GET"
      //,headers: {
      //  "x-api-key": "FTlS2bc9lo1OtmzHCBrju4ZL8PqFM5yr4JB775RR"}
    }).then(resp=>resp.json())
    .then(data => this.setState({medicos: data[0].Medicos}))

    const urlCentros = `${this.props.url}centroshospitalarios`;
    fetch(urlCentros, {
      method: "GET"
      //,headers: {
      //  "x-api-key": "FTlS2bc9lo1OtmzHCBrju4ZL8PqFM5yr4JB775RR"}
    }).then(resp=>resp.json())
    .then(data => this.setState({centrosAPI: data.CentrosHospitalarios}))

    //Emparejar un envio con un centro
    let idPeticionURL = window.location.href.replace('http://localhost:3000/envio/','');
   if(idPeticionURL===":id"){
        //
        //
        console.log("estamos tratando un envio sin una peticion asociada")
        //
        //
    }else{
        
        //este es el caso en el un envio se genere porque tenia una peticion asociada
        fetch(`${this.props.url}encontrarPeticion?idPeticion=${idPeticionURL}`,{
            method:"GET"


        }).then(resp=>resp.json())
        .then(data => {
            this.setState({peticion:data})
            this.obtenerCentroHosp()
    })
        .catch(error=>console.log(error))    

    }


    


    



}

  //se usa este hook para poder colocar los datos despues del renderizado
  componentWillMount() {
    if(this.state.recursos.length ===0 || this.state.centrosAPI.length ===0){
      this.traerData()
      
    }
    

}


    obtenerCentroHosp(){
    
        const urlCentrosMedicosID = `${this.props.url}centroHospitalarioId?idCentro=${this.state.peticion.Peticion.idCentro}`;
        fetch(urlCentrosMedicosID, {
      method: "GET"
      //,headers: {
      //  "x-api-key": "FTlS2bc9lo1OtmzHCBrju4ZL8PqFM5yr4JB775RR"}
    }).then(resp=>resp.json())
    .then(data => {
        
        //Con esto hacemos que el administrador solo pueda enviar recursos para la peticion que esta respondiendo

        if(data.CentroHospitalario[0]!==undefined && data.CentroHospitalario[0].hasOwnProperty("idCentro")){
        this.setState({centroPeticion:data.CentroHospitalario[0]})
        
    ReactDOM.render(<option value={this.state.centroPeticion.idCentro}>{this.state.centroPeticion.nombre}</option>, document.getElementById('select-envio-centros'))
            this.setState({envio:{"idPeticion": this.state.centroPeticion.idCentro}})
            
    }    
}
        )
    
}


    
    enviarPeticion(){
        console.log("Soy un envio")
    }
    
    recursoPeticion(recurso){
        
        if(this.state.peticion.hasOwnProperty(`${recurso}`)){
            return(this.state.peticion.recurso)
        }else{
            return 0
        }
    }

    
    generacionMedico = (e)=> {
        let medicoID=this.state.idDIVmedico
        
        if(e.target.value !==""){
        medicoID = medicoID+1
        
        let medicoDIV =
        <>
        <Form.Group>
        <Form.Label column="lg">Especialidad</Form.Label>
        <Form.Control as="select" className="form-envio" onInput={e=>this.generacionMedico(e)} id={`select-med${medicoID}`}>
        <option></option>
        {
        this.state.medicos.map( med => <option value={med._id}>{med.especialidad[0].toUpperCase() +  
            med.especialidad.slice(1)}</option>)
        }
        </Form.Control>
        <Form.Label column lg="1.5">
            Cantidad: 
        </Form.Label>
        <Form.Control className="cant-envio" type="number" max={this.state.recursos["cofiasDisponible"]} min={0} defaultValue={0} style={{marginRight:"5%"}}/>
        <Button variant="danger" size="sm" onClick={e=>this.removerMedico(medicoID)}>X</Button>
        </Form.Group>

        < div id={`otro-medico${medicoID+1}`}></div>
        </>
        
        console.log(medicoID)
        
    ReactDOM.render(medicoDIV, document.getElementById(`otro-medico${medicoID}`))
    this.setState({idDIVmedico:medicoID}) 
    }
    }
    

    removerMedico(id){
        let medicoID=id-1;
        ReactDOM.render(<div></div>, document.getElementById(`otro-medico${id}`))
    this.setState({idDIVmedico:medicoID})
    
    }

    agregarElemEnvio(e){
        e.preventDefault();
        console.log("HOLA")
        console.log(e.target)
        let envioPrevio= this.state.envio
        let valorElemento = parseInt(e.target.value);
        let nombreElemento = e.target.name;
        let cargaElemento = envioPrevio;
        if(parseInt(e.target.value)<0){

            ReactDOM.render(<Alert variant="danger">No valores negativos por favor</Alert>, document.getElementById("error-negativo"))
            setTimeout(()=>{
                ReactDOM.render(<div></div>, document.getElementById('error-negativo'))	
                
              },2000)
              
              delete cargaElemento[nombreElemento]
              this.setState({envio: cargaElemento})
              return e.target.value = 0 
        }else{
        cargaElemento[nombreElemento] = valorElemento;
        this.setState({envio: cargaElemento})
    }


    
    }

    agregarEnvioMed(e){
        e.preventDefault();
        let medPrevios = this.state.medicoEnvio
        let valor = e.target.value
        let nombre = e.target.name
        let cargaElemento = [];
        let especialidad;
        let cant = 0;
        if(nombre==="especialidad"){
            console.log("soy una especialidad")
            especialidad = valor
        }else{
            console.log("soy una cantidad")
            cant = valor
        }
        cargaElemento[especialidad] = cant
        medPrevios.push(cargaElemento)
        console.log(medPrevios)
        
    
}

    render(){
        //console.log(this.state.medicos)
        //console.log(this.state.centrosAPI)
       console.log(this.state.envio)
        return (
        <div className="envio-container">
            <h1>Generacion de un envio</h1>
            <Form>
                
                <Form.Group>
                    <Form.Label column="lg" >Centro Hospitario</Form.Label>
                            
                      
                    <Form.Control as="select" className="form-envio" id="select-envio-centros" onChange={e=>this.agregarElemEnvio(e)} name="idCentro" required>
                    <option></option>
                    {
                    this.state.centrosAPI.map( centro => <option value={centro.idCentro}>{centro.nombre}</option>)
                    }
                    </Form.Control>
                    
                <hr style={{color: "black", borderColor : '#000000' }}/>

                
                
            
                
                </Form.Group>
            <div className="grid-envio">
                <div className="recursos-envio">
                <h2 style={{color: "black", borderColor : '#000000' }}>Recursos</h2>
                <div id="error-negativo"></div>
                {/*Campo para las camillas */ }
                <Form.Group>
                    <Form.Label column="lg">Camillas</Form.Label>
                            
                      
                    <Form.Control className="form-envio" type="number" max={this.state.recursos["camillasDisponible"]} min={0} defaultValue={this.recursoPeticion("camillas")} onChange={e=>this.agregarElemEnvio(e)} name="camillas" />
                    
                    
                </Form.Group>
                
                {/*Campo para los jabones */ }
                <Form.Group>
                    <Form.Label column="lg">Jabon en litros</Form.Label>
 
                    <Form.Control className="form-envio" type="number" max={this.state.recursos["jabonLitrosDisponible"]} min={0} defaultValue={0} onChange={e=>this.agregarElemEnvio(e)} name="jabonLitros"/>

                    
                </Form.Group>
               
                {/*Campo para el alcohol en gel*/ }
                <Form.Group>
                    <Form.Label column="lg">Litros de alcohol en gel</Form.Label>
                    
                    <Form.Control className="form-envio" type="number" max={this.state.recursos["alcoholLitrosDisponible"]} min={0} defaultValue={0} onChange={e=>this.agregarElemEnvio(e)} name="alcoholLitros"/>
                    

                </Form.Group>
        

           
                {/*Campo para barbijos*/ }
                <Form.Group>
                    <Form.Label column="lg">Barbijos</Form.Label>
 
                    <Form.Control className="form-envio" type="number" max={this.state.recursos["barbijosDisponible"]} min={0} defaultValue={0} onChange={e=>this.agregarElemEnvio(e)} name="barbijos"/>
                    

                </Form.Group>

                    {/*Campo para jeringas */ }
                <Form.Group>
                    <Form.Label column="lg">Jeringas</Form.Label>
 
                    <Form.Control className="form-envio" type="number" max={this.state.recursos["jeringasDisponible"]} min={0} defaultValue={0} onChange={e=>this.agregarElemEnvio(e)} name="jeringas"/>

                    

                </Form.Group>

                    {/*Campo para cofias*/ }
                <Form.Group>
                    <Form.Label column="lg">Cofias</Form.Label>

                    <Form.Control className="form-envio" type="number" max={this.state.recursos["cofiasDisponible"]} min={0} defaultValue={0} onChange={e=>this.agregarElemEnvio(e)} name="cofias"/>
                    

                </Form.Group>
                </div>

        <div className= "medicos-envio">
                    <h2>Medicos</h2>
                    
            <div id={"otro-medico0"}>
                <Form.Group>
                    
                         
                <Form.Label column="lg" >Especialidad</Form.Label>
                    <Form.Control as="select" className="form-envio" onChange={this.generacionMedico} 
                    onInput={e=>this.agregarEnvioMed(e)} name="especialidad">
                    <option></option>
                    {
                    this.state.medicos.map( med => <option value={med.especialidad}>{med.especialidad[0].toUpperCase() +  
                        med.especialidad.slice(1)}</option>)
                    }
                    </Form.Control>
                    <Form.Label column lg="1.5">
                        Cantidad: 
                    </Form.Label>
                    <Form.Control className="cant-envio" type="number" max={this.state.recursos["cofiasDisponible"]} min={0} defaultValue={0} onChange={e=>this.agregarEnvioMed(e)}
                    name="cantidad-med"/>
                    

                </Form.Group>
                
                
            </div>
            <div id={"otro-medico1"}>

            </div>



        </div>
                    

        </div>
                <br />

                <div className="botones-envio">
                <Button  className="boton" variant="primary" onClick={this.enviarPeticion}>
                    Realizar Envio
                </Button>
                <Button  className="boton" variant="secondary" href="/peticiones">
                    Regresar
                </Button>
                </div>
            </Form>
            


        </div>

    );
}
  }


export default RealizarEnvio;