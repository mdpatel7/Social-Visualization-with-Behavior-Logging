import React from 'react';

class Signout extends React.Component{

	onSubmitSignout = (email) =>{
		fetch('https://awassignment1stackoverflow.herokuapp.com/signout',{
      		method:'post',
      		headers :{'content-Type': 'application/json'},
      		body: JSON.stringify({
        		email:email
      		})
    	})
    	.then(response => response.json())
       	.then(user => {
       		console.log();
       	})
	}

	render(){
		const{onRouteChange, isSignedIn, email} = this.props;
		if(isSignedIn){
			return(
			<nav style = {{ display: 'flex' , justifyContent : 'flex-end'}} >
				<p 
					onClick = {() => {onRouteChange('signout'); this.onSubmitSignout(email);}} 
					className = 'f3 link dim black underline pa0 mt1 pointer'>Sign Out</p>
			</nav>);
		}
		else{
			return(
				<nav style = {{ display: 'flex' , justifyContent : 'flex-end'}} >
					<p 
					onClick = {() => {onRouteChange('/')}} 
					className = 'f3 link dim black underline pa0 pr4 mt1 pointer'>Sign in</p>
					<p 
					onClick = {() => {onRouteChange('Register')}} 
					className = 'f3 link dim black underline pa0 pr1 mt1 pointer'>Register</p>
				</nav>);
		}
	}
}
export default Signout;