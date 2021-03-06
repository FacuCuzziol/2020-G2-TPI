import React, { Component } from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./componentes/Header";
import Menu from "./componentes/Menu";
import TablaCentros from "./componentes/TablaCentros";
import Login from "./componentes/Login";
import BotonGeneracion from "./componentes/GeneracionAleatoria"
import Peticiones from './componentes/Peticiones';
import TablaRecursos from './componentes/TablaRecursos';
import Peticion from './componentes/Peticion'
import RealizarEnvio from './componentes/RealizarEnvio'
import Logo from "./componentes/img/ministerio-logo.png"
import HistorialEnvios from './componentes/HistorialEnvios'
import Envio from './componentes/Envio'
import TablaMedicos from './componentes/TablaMedicos'

class App extends Component {
  
  state = {
    
    url:"https://6iubewzdng.execute-api.sa-east-1.amazonaws.com/dev/",
    sesion:false
    
	}
  componentDidMount(){
    
    if (parseInt(sessionStorage.getItem('ingreso'))===null){
      console.log("no hay nada")
      
    }else if(sessionStorage.hasOwnProperty("ingreso")){
      this.setState({sesion:true})
    }
    
  }
  render() {
    
    return (<>
      
      
      <Router>
        
        <Switch>
         {/* Ruta para el home */}
          <Route
            exact
            path="/home"
            render={() => {
              return (
              <div>
                
                {this.state.sesion ?
                <>
                <Header />
                <div className="app-container">
                  
                  <Menu />
                  <img className="imagen-home" src={Logo} alt="logo del ministerio"/>
                </div>
                </> : <div></div>
            }
                </div>
              );
            }}
          />

         {/* Ruta de la tabla de centros medicos */}
          <Route
            exact
            path="/centrosmedicos"
            render={() => {
              return (
              <div>
                
                {this.state.sesion ?
                (<>
                <Header />
                <h1>Centros hospitalarios</h1>
                <div className="app-container">
                  
                  <Menu />
                  <TablaCentros url={this.state.url} />
                </div>
                </>) : <div></div>
                }
                </div>
              );
            }}
          />
          {/* Ruta Login */}
          <Route 
          exact path="/"
          render={() => {
            return (
            <Login/>
            )}}
          
          
          />

          {/* Ruta para ver todas las peticiones */}
      <Route 
      
          exact path="/peticiones"
          
          render={() => {
			return (
        <div>
          {this.state.sesion ?
                <>
                <Header />
                <h1>Peticiones</h1>
			  <div className="app-container">
				
				<Menu/>
        <Peticiones url={this.state.url} />
			  </div>
          </> : <div></div> }
        </div>
			);
		  }}
          
          />
  {/* Ruta para ver la tabla de recursos disponibles*/}  
      <Route 
          exact path="/recursos"
          
          render={() => {
			return (
        <div>
          {this.state.sesion ?
                <>
        <Header />
        <h1>Recursos disponibles</h1>

        
			  <div className="app-container">
				<BotonGeneracion url={this.state.url} />
				<Menu/>
        <TablaRecursos url={this.state.url}/>
        
			  </div>
        </> : <div></div>}
        </div>
			);
		  }}
          
          />

          {/* Ruta de una paticion en particular, el envio de id se hace desde /peticiones */}
 <Route 
          exact path="/peticion/:id"
          
          render={() => {
			return (
        <div>
          {this.state.sesion ?
                <>
        <Header />
			  <div className="app-container">
				
				<Menu />
        <Peticion url={this.state.url} idPeticion/>
        
			  </div>
        </> : <div></div>}
        </div>
      );
		  }}
          
          />
          
          {/* Ruta para generar un envio con una id en particular */}
 <Route 
          exact path="/envio/:id"
          
          render={() => {
			return (
        <div>
          {this.state.sesion ?
                <>
        <Header />
			  <div className="app-container">
				
				<Menu/>
        <RealizarEnvio url={this.state.url}/>
        
			  </div>
        </> : <div></div>}
        </div>
			);
		  }}
          
          />

          {/* Ruta para ver el historial de envios */}  
      <Route 
          exact path="/historialEnvios"
          
          render={() => {
			return (
        <div>
          {this.state.sesion ?
                <>
        <Header />
        <h1>Historial de envios</h1>

        
			  <div className="app-container">
				
				<Menu/>
        <HistorialEnvios url={this.state.url}/> 
        
        
			  </div>
        </> : <div></div>}
        </div>
			);
		  }}
          
          />

{/* Ruta para el la tabla de medicos*/}
<Route
            exact
            path="/medicosDisponibles"
            render={() => {
              return (
              <div>
                
                {this.state.sesion ?
                <>
                <Header />
                <div className="app-container">
                  
                  <Menu />
                  <TablaMedicos url={this.state.url} />
                </div>
                </> : <div></div>
            }
                </div>
              );
            }}
          />
      {/* Ruta de una paticion en particular, el envio de id se hace desde /peticiones */}
 <Route 
          exact path="/mostrarEnvio/:id"
          
          render={() => {
			return (
        <div>
          {this.state.sesion ?
                <>
        <Header />
			  <div className="app-container">
				<Envio url={this.state.url}/>
				<Menu />
        
        
			  </div>
        </> : <div></div>}
        </div>
      );
		  }}
          
          />
        </Switch>
      </Router>

      </>
    );
  }
}

export default App;
