import React, { Component ,  useState } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Grid } from '@material-ui/core';
import axios from 'axios';
import { MDBDataTable } from 'mdbreact';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = ((theme) => ({
  root: {
    flexGrow: 4,
    backgroundColor: theme.palette.background.paper,
  },
}));


class Users extends Component {
  
  constructor(props){
    super(props)
    this.state={users: [], courses: [], value:0 }
    this.courses = this.courses.bind(this)
    this.users = this.users.bind(this)
    this.courses();
    this.users();
  }
    handleChange = (event, newValue) => {
      this.setState({value: newValue})
  };
    courses(){
    var apiBaseUrl = "http://localhost:5000/";
    var self = this;
    console.log(this);
    axios.get(apiBaseUrl+"get_courses")
    .then(function (response) {
    if(response.status == 200){
    console.log("Successfully");
    console.log(response.data) 
    self.setState({courses: response.data})
     }
    else{
    console.log("Error");
    alert("Error");
    }
    })
    .catch(function (error) {
    console.log(error);
    });
   
  
  }



  users(){
    var apiBaseUrl = "http://localhost:5000/";
    var self = this;
    console.log(this);
    axios.get(apiBaseUrl+"get_users")
    .then(function (response) {
    if(response.status == 200){
    console.log("Successfully");
    console.log(response.data) 
    self.setState({users: response.data})
     }
    else{
    console.log("Error");
    alert("Error");
    }
    })
    .catch(function (error) {
    console.log(error);
    });
   
  }

  render() {

    const classes = this.props
    const users = this.state.users
    const courses = this.state.courses
    console.log(users)
    var userColumns = [
      {
        label: 'Name',
        field: 'CourseHandlerName',
        sort: 'asc',
        width: 150
      },
      {
        label: 'emailId',
        field: 'EmailId',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Phno',
        field: 'PhoneNumber',
        sort: 'asc',
        width: 200
      }
    ];
  
    console.log(this.state.users)
   var userData = {
     columns: userColumns,
     rows: users
   }
   var courseColumns = [
    {
      label: 'Branch',
      field: 'Branch',
      sort: 'asc',
      width: 150
    },
    {
      label: 'CourseCode',
      field: 'CourseCode',
      sort: 'asc',
      width: 270
    }
  ];

  console.log(this.state.users)
 var courseData = {
   columns: courseColumns,
   rows: courses
 }


    return (
      <div className={classes.root}>
  <Grid container 
      spacing={2}
      direction="column"
      alignItems="center"
      justify="center"
      
      style={{ top: '100px', position:"absolute" }}>
        
          <Tabs
             // a number of your choice
            
            value={this.state.value}
            onChange={this.handleChange}
            
          >
            <LinkTab style={{minwidth:'500px' }} label="Page One"  {...a11yProps(0)} />
            <LinkTab label="Page Two"  {...a11yProps(1)} />
            
          </Tabs>
        
        <TabPanel value={this.state.value} index={0}>

         <MDBDataTable
         
         
         hover
         data={userData}
       />

        
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
        {/* {courses.map(home => <div>{home.CourseName}</div>)} */}
      
        <MDBDataTable

      hover
      data={courseData}
    />
        
        </TabPanel>
      
        </Grid>
      </div>
    );
  }
}
export default withStyles(useStyles)(Users);


