import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect } from "react-router-dom";

import axios from 'axios';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = (theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

class Assign extends Component {
  constructor(props) {
    super(props);
    this.state = {users: [], courses: [], assigned: [], handler: "",  check: false, redirect: false};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    this.getUsers();
    this.getCourses();
  }

  handleChangeValue = (event, values) => {
    this.setState({
      handler: values
    }, () => {
      // This will output an array of objects
      // given by Autocompelte options property.
      console.log(this.state.handler);
    });
  }
  handleChangeCheckbox(event)
  {
    this.setState({check: event.target.checked})
  }
  onTagsChange = (event, values) => {
    this.setState({
      assigned: values
    }, () => {
      // This will output an array of objects
      // given by Autocompelte options property.
      console.log(this.state.tags);
    });
  }

    
handleSubmit(event) {
        var apiBaseUrl = "http://localhost:5000/";
        var self = this;
        console.log(this);
        var payload=
          {
            "handler": this.state.handler,
           "course": this.state.assigned
           }
        
        axios.post(apiBaseUrl+'assign', payload)
        .then(function (response) {
        console.log(response);
        if(response.status == 200){
        console.log("Successfully added");
        self.setState({redirect:false}); 
        
         }
        else{
        console.log("Error");
        alert("Error");
        self.setState({redirect:false}); 
        }
        })
        .catch(function (error) {
        console.log(error);
        });
        
        event.preventDefault();
        }
  
        getUsers(){
          var self = this;
        var apiBaseUrl = "http://localhost:5000/"
        axios.get(apiBaseUrl+'get_users')
        .then(function (response) {
        console.log(response);
        if(response.status == 200){
          console.log(response);
          self.setState({users: response.data})
          var users = [];
          for(var i=0;i<response.data.length;i++)
          {
            console.log(response.data.CourseHandlerName);
            users.push(response.data[i].CourseHandlerName+" ("+response.data[i].EmailId+")");
          }
          self.setState({users: users})
          console.log(self.state)
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
       


        getCourses(){
          var self = this;
        var apiBaseUrl = "http://localhost:5000/"
        axios.get(apiBaseUrl+'get_courses')
        .then(function (response) {
        console.log(response);
        if(response.status == 200){
          console.log(response);
          
          var courses = [];
          for(var i=0;i<response.data.length;i++)
          {
            console.log(response.data.CourseName);
            courses.push(response.data[i].CourseName+" ("+response.data[i].CourseCode+")");
          }
          self.setState({courses: courses})
          console.log(self.state)
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
        const { classes } = this.props;
        console.log(this.state.users)
        if(this.state.redirect){
          return <Redirect to='/homepage'  />
       }

        return (<Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Assign courses to users
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} >
              <Autocomplete
      id="Course_handlers"
      options={this.state.users}
      getOptionLabel={option => option}
      
      onChange = {this.handleChangeValue}
      renderInput={params => <TextField {...params} label="Course Handler" variant="outlined" />}
    />
              </Grid>
              <Grid item xs={12} >
              <Autocomplete
        multiple
        id="tags-outlined"
        options={this.state.courses}
        getOptionLabel={option => option}
        filterSelectedOptions
        onChange = {this.onTagsChange}
        renderInput={params => (
          <TextField
            {...params}
            variant="outlined"
            label="Courses"
            placeholder="Courses"
          />
        )}
        />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox  onChange={this.handleChangeCheckbox} color="primary" />}
                  label="Assign to more than one user"
                />
              </Grid>
            </Grid>
            <Grid container justify="flex-end">
              <Grid item>
              </Grid>
              <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            </Grid>

          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
      );
    }

}

export default withStyles(useStyles)(Assign);