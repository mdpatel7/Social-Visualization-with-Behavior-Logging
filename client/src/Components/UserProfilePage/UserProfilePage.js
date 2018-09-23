import React from 'react';
import {ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import {BarChart, Cell} from 'recharts';
import './userProfile.css';

const JsonTable = require('ts-react-json-table');

class UserProfilePage extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			activityData : null,
			userlogdata: null,
			activityNameData:null,
			searchHistoryData:null,
			sortHistoryData:null
		}

	}
	
	componentDidMount(){
		this.setState({_isMounted:true})
		this.loadchart();
		this.loadSearchHistory();
		this.loadSortHistory();
		this.interval = setInterval(() => this.loadchart(), 2000);
		this.loadloghistory();
		this.interval1 = setInterval(() => this.loadSearchHistory(),2000);
		this.interval2 = setInterval(() => this.loadSortHistory(),2000);
	}
	componentWillUnmount(){
		this.setState({_isMounted:false})
		clearInterval(this.loadchart);
		clearInterval(this.loadSearchHistory);
		clearInterval(this.loadSortHistory);
	}
	columns () {
    	return [
	    	{key: 'email', label: 'email'},
	        {key: 'activity', label: 'activity'},
	        {key: 'time', label: 'time', cell: (obj, key) => {
	            return <span>{ obj[key] }</span>;
        	}}
    	];
  	}
  	columns1 (){
  		return [
			{key: 'userid', label: 'userid'},
		    {key: 'activitytime', label: 'activitytime'},
		    {key: 'searchhistory', label: 'searchhistory', cell: (obj, key) => {
		        return <span>{ obj[key] }</span>;
		    }}
    	];
  	}
  	columns2(){
		return [
			{key: 'userid', label: 'userid'},
	    	{key: 'activityname', label: 'activityname'},
	    	{key: 'count', label: 'count', cell: (obj, key) => {
	        	return <span>{ obj[key] }</span>;
	    	}}
    	];
  	}
  	loadloghistory(){
  		fetch('https://awassignment1stackoverflow.herokuapp.com/userLogHistory',{
      		method:'post',
      		headers :{'content-Type': 'application/json'},
      		body: JSON.stringify({
        		email:this.props.name,
      		})
    	})
    	.then(response => response.json())
  		.then(userlogdata => {
    		if(this.state._isMounted){
    		this.setState({
    			userlogdata: userlogdata
    		})}
  		})
  	}
  	loadSearchHistory(){
  		fetch('https://awassignment1stackoverflow.herokuapp.com/searchHistory',{
      		method:'post',
      		headers :{'content-Type': 'application/json'},
      		body: JSON.stringify({
        		email:this.props.name,
      		})
    	})
    	.then(response => response.json())
  		.then(searchHistoryData => {
    		if(this.state._isMounted){
    		this.setState({
    			searchHistoryData: searchHistoryData
    		})}
  		})
  	}
  	loadSortHistory(){
	  	fetch('https://awassignment1stackoverflow.herokuapp.com/userSortHistory',{
	      	method:'post',
	      	headers :{'content-Type': 'application/json'},
	   		body: JSON.stringify({
	      		email:this.props.name,
     		})
	    })
	   	.then(response => response.json())
		.then(sortHistoryData => {
	    	if(this.state._isMounted){
	    		this.setState({
	    			sortHistoryData: sortHistoryData
	    		})}
	  		})
  	}
  	loadchart(){
		fetch('https://awassignment1stackoverflow.herokuapp.com/dataToBeVisualized',{
      		method:'post',
      		headers :{'content-Type': 'application/json'},
      		body: JSON.stringify({
        		email:this.props.name,
      		})
    	})
    	.then(response => response.json())
  		.then(activityData => {
    		if(this.state._isMounted){
    		this.setState({
    			activityData: activityData
    		})}
  		})
	}
	handleClick(data){
		fetch('https://awassignment1stackoverflow.herokuapp.com/dataToBeVisualizedOnClick',{
      		method:'post',
      		headers :{'content-Type': 'application/json'},
      		body: JSON.stringify({
        		activityname:data.activityname,
      		})
    	})
    	.then(response => response.json())
  		.then(activityNameData => {
    		if(this.state._isMounted){
    		this.setState({
    			activityNameData: activityNameData
    		})}
  		})
	}
	mainChart(){
		if(this.state.activityData == null){
			return(<div></div>);
		}
		return(
			<ComposedChart width={600} height={400} data={this.state.activityData} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
			      <CartesianGrid stroke='#ffffff'/>
			      <XAxis dataKey="activityname" stroke="#ffffff"/>
			      <YAxis stroke="#ffffff"/>
			      <Tooltip />
			      <Legend />
			      <Area type='monotone' dataKey='count' fill='#9dbae8' stroke='#8884d8'/>
			      <Bar dataKey='count' barSize={20} fill='#115fdd' onClick={data=>this.handleClick(data)} />
			      <Line type='monotone' dataKey='count' stroke='#160401' />
			</ComposedChart>
		);
	}
	newChart(){
		if(this.state.activityNameData == null){
			return(<div></div>)
		}

		const colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"];
		const getPath = (x, y, width, height) => {
			return `M${x},${y + height}
      		C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
      		C${x + width / 2},${y + height / 3} ${x + 2 * width / 3},${y + height} ${x + width}, ${y + height}
     		Z`;
		};
		const TriangleBar = (props) => {
			const { fill, x, y, width, height } = props;
			return <path d={getPath(x, y, width, height)} stroke="none" fill={fill}/>;
		};
		return(
			<BarChart width={600} height={400} data={this.state.activityNameData}
            	margin={{top: 20, right: 30, left: 20, bottom: 15}}>
		       <XAxis dataKey="userid" stroke="#ffffff" strokeDasharray="3 3"/>
		       <YAxis stroke="#ffffff" />
		       <CartesianGrid strokeDasharray="3 3"/>
		   
		       <Bar dataKey="count" fill="#8884d8" shape={<TriangleBar/>} label={{ position: 'top' }}>
		          {
		            this.state.activityNameData.map((entry, index) => (
		              <Cell key={`cell-${index}`} fill={colors[index % 20]}/>
		            ))
		           }
		       </Bar> 
		    </BarChart>
		);
	}
	render (){
		const { name } = this.props;
		const StackOverFlowLink = `https://stackoverflow.com/questions/tagged/java?sort=frequent&pageSize=15&token=${name}`;
		return (
  			<div>
  				<div className = 'mt0 white f2'>
					{`Welcome ${name}`}
					<br /><a target = "_blank" href= {StackOverFlowLink} style={styles.link}>Click to Visit Stack Overflow Page</a><br />
				</div>
				<div className = 'mt0 white f3'>
				{'Interact(Click) with Bar in the chart to see Social Visulaization'}
				</div>
				<div className='first'>
					{this.mainChart()}
			   </div>
			   <div className='second'>
			   	{this.newChart()}
			   	{this.state.activityNameData != null?'Comparison with all users':''}

			   </div>
			   <hr className = 'line'/>
			   <div className = 'parent'>
			   	<div className = 'row'>
			   	 <div className ='col1'>{'User Log History'}
			   		<JsonTable rows={this.state.userlogdata} columns={this.columns()} />
			     </div>
				 <div className = 'col2'>{'Search History'}
			   		<JsonTable rows={this.state.searchHistoryData} columns={this.columns1()} />
			   	 </div>	
			   	 <div className = 'col3'>{'Social Sort History'}
			   		<JsonTable rows={this.state.sortHistoryData} columns={this.columns2()} />
			   	 </div>	
			   	</div>
			   </div>
			   <div className = 'row2'>
			   		<h3 className='heading3'>Why I decided to log these Actions?</h3>

I have logged 5 activities which are mentioned below<br />
1) User search history – When user searches something in the search field, the search string gets logged in the database table ‘search’ and the search history is dynamically displayed in the table form on my web app.<br />

I decided to log user search history because by user’s search history we can figure out how and what particular search strings provide users with the desired answer. We can figure out user’s interest in the particular topics and also figure out how accurately stackoverflow provides answers to the users. We can figure out the pattern in users search history and group answers accordingly.<br /><br />

2) Ask question clicks count – When user clicks on the ask question button, count of clicks gets logged in the database table ‘visualizedactivities’ and it is visualized in the chart on my web app.<br />

I decided to log ask question button click because when a user decides to ask question, we can assume that user did not find the answer to his question in the previously answered questions.<br /> 
Stackoverflow then could figure out what questions are being asked by the users and provide the answers accordingly. My webapp has a social visualization of ask question counts where a user can compare his number of asked questions with other users.<br /><br />

3) Scroll to the bottom count- When user scrolls to the bottom of the stackoverflow page, the scroll count is logged in the database table ‘visualizedactivities’ and it is visualized in the chart on my web app.<br />

I decided to log scroll to the bottom of the page, because users would like to have the answers to their questions on the top of page but when a user scrolls to the bottom of the page we can say that the user is looking for particular answer and he/she did not find the anwer. My webapp has a social visualization of scroll counts where a user can compare his number of scrolls with other users.<br /><br />

4) Copy text count – When user copies something on the stackoverflow page, count of the copies gets logged in the database table ‘visualizedactivities’ and it is visualized in the chart on my web app.<br />

I decided to log copy text count because when a user copies something from the stackoverflow page, we know that the copied string might have been useful to the user. When user copies, the user expects that the copied string might be useful to him/her. My webapp has a social visualization of copy counts where a user can compare his copy number with other users.<br /><br />

5) Questions sort history – When user tries to sort the questions on the stackoverflow page by frequent/newest/votes/info/featured/active/unanswered, users sort history gets logged in the database table ‘usersortbehavior’ and it is dynamically displayed in the table form in my web app. It shows a social sort behavior by comparing with other users behavior to sort the questions.<br />

I decided to log sort history because we can figure out that how the user is sorting the questions and what sort type is working best for the users.<br /><br />

<h3 className='heading3'>Analysis and Pattern Findings</h3><br />

1) From the user’s interaction with the stackoverflow page, I found a pattern that first the user tries to search for the answers in the search field though search field and then looks for the answer till the bottom of the page. Users scrolls till the bottom of the page and copies a few answers which the user thinks might work as solution.<br />

2) Then the user sorts the answers based on frequency of the question or votes on the answers or newest answers. Still if the user doesn’t find the answer, user tries and searches a different query.<br />

3) At last if the user doesn’t find the answer, user clicks on the ask question button and asks question, expects to be answered by an expert. All the users when logged in the web app can compare their ask_question counts, copy counts and scroll counts with other users and also can check how the users are sorting to find the answers. A user can see his login/logout data in his profile and his search history also.<br /> 

To find this analysis and pattern I tried and tested my webapp by becoming an actual user of the system. I developed a thought process of the users of the stackoverflow and used the system as if they would use it. All this steps helped me in analyzing that how I can personalize the users interaction with the system. It helped me to understand the open social user modeling basics and fundamentals. <br />

			   </div>	 		
			</div>

    	);
    }
}

const styles = {
  link: {
    color: "black",
    ":hover":{
      color:"red"
    },
  },
};

export default UserProfilePage;