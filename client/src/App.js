import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Signout from './Components/Signout/Signout';
import Signin from './Components/Signin/Signin'; 
import Register from './Components/Register/Register'; 
import UserProfilePage from './Components/UserProfilePage/UserProfilePage';
import './App.css';

const particlesOptions = {
  particles: {
    number: {
      value: 15,
      density: {
        enable: true,
        value_area: 1500
      }
    }
  },
  interactivity: {
      detect_on: 'window',
      events: {
        onhover: {
          enable: true,
          mode: 'grab'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab:{
          distance: 100,
          line_linked:{
            opacity: 1
          }
        },
        push:{
          particles_nb: 4
        },
      },
      mouse:{}
    }
}

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: '/',
  isSignedIn: false,
  user:{
    id:'',
    name:'',
    email:'',
    joined: ''
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
    }

  loadUser = (data) =>{
    this.setState({ user:{
          id:data.id,
          name:data.name,
          email:data.email,
          entries:data.entries,
          joined: data.joined

    }})
  }
  onInputChange = (event) =>{
    this.setState({input:event.target.value});
  }

  onRouteChange = (route) => {
    if(route ==='signout'){
      this.setState(initialState)
    }
    else if (route === 'home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route:route});
  }
  render() {
    const {isSignedIn, route} = this.state;
    return (
      <div className="App">
        <Particles className = 'particles'
              params={particlesOptions}
            />
        <Signout isSignedIn ={isSignedIn} onRouteChange = {this.onRouteChange} email = {this.state.user.email}/>
        
        { route === 'home'
        ?  <div>
            <UserProfilePage name = {this.state.user.email} />
          </div>
          : (
              route === '/' || route === 'signout'
              ? <Signin loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>
              : <Register loadUser = { this.loadUser } onRouteChange = {this.onRouteChange}/>
            )
          }

      </div>
    );
  }
}

export default App;
