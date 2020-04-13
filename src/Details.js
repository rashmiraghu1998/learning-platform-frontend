import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import axios from 'axios';


export default class Details extends Component {
  constructor(props)
  {
    super(props)
    this.state = {username: ""}
    this.getUserDetails();

  }

  getUserDetails() {
    var apiBaseUrl = "http://localhost:5000/";
    var self = this;
    console.log(this);
    axios.get(apiBaseUrl+"get_details_admin")
    .then(function (response) {
    if(response.status == 200){
    console.log("Successfully");
    self.setState({username: response.data.username});   
    console.log(response) 
    console.log(self.state.username)
     }
    else{
    console.log("Error");
    alert("Error");
    }
    })
    .catch(function (error) {
    console.log(error);
    });
   
    event.preventDefault();
    }
  

  render() {
    return (
      
      <div>
        <Grid container 
  spacing={0}
  direction="column"
  alignItems="center"
  justify="center"
  style={{ minHeight: '50vh' }}>
        <AccountCircleIcon style={{ fontSize: 200} }/>
        <div container>
        <h4 xs={5}>Admin username: {this.state.username} </h4> 
        <h4 xs={5}>Admin password: ********** </h4> 
      </div>
        </Grid>
      </div>

    )
  }
}
