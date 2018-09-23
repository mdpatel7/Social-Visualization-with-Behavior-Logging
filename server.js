const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');


const activityLog = require('./Controllers/activityLog');
const register = require('./Controllers/register');
const signin = require('./Controllers/signin');
const signout = require('./Controllers/signout');
const profile = require('./Controllers/profile');
const dataToBeVisualized = require('./Controllers/dataToBeVisualized');
const userLogHistory = require('./Controllers/userLogHistory');
const searchHistory = require('./Controllers/searchHistory');
//const mouseCoordinates = require('./Controllers/mouseCoordinates');
const userSortHistory = require('./Controllers/userSortHistory');
const dataToBeVisualizedOnClick = require('./Controllers/dataToBeVisualizedOnClick');
const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl:true
  }
});

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/signout', (req,res) => {signout.handleSignout(req,res,db)})
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.post('/activityLog/:event/:token/:searchString', (req,res)=>{activityLog.handleActivityLog(req,res,db)})
app.post('/dataToBeVisualized', (req,res)=>{dataToBeVisualized.handleDataToBeVisualized(req,res,db)})
app.post('/dataToBeVisualizedOnClick', (req,res)=>{dataToBeVisualizedOnClick.handleDataToBeVisualizedOnClick(req,res,db)})
app.post('/userLogHistory', (req,res)=>{userLogHistory.handleUserLogHistory(req,res,db)})
app.post('/searchHistory', (req,res)=>{searchHistory.handleSearchHistory(req,res,db)})
app.post('/userSortHistory', (req,res)=>{userSortHistory.handleUserSortHistory(req,res,db)})
//app.post('/mouseCoordinates/:event/:token/:coordinate_x/:coordinate_y', (req,res) =>{mouseCoordinates.handleMouseCoordinates(req,res,db)})
if (process.env.NODE_ENV === "production") {
    //express will serve up production assests like our main.js/main.css file
    const path = require("path");
    app.use(express.static(path.join(__dirname, "/client/build")));

    //express will serve up the index.html file if it doesn't recognize the route

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT);