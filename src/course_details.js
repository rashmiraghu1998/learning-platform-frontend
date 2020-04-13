import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
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

class CourseDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {items:[]}
    this.handleSubmit();
    this.handleSave = this.handleSave.bind(this);
  }    
  handleSave() {
    var apiBaseUrl = "http://localhost:5000/_course";
    var self = this;
    console.log(this);
    var course_name = this.props.course_name
    var course_code = this.props.course_code
    axios.get(apiBaseUrl+"?courseName="+course_name+"&courseCode="+course_code)
    .then(function (response) {
    if(response.status == 200){
        console.log(response.data);
        self.setState({items:response.data});
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

    }
handleSubmit() {
        var apiBaseUrl = "http://localhost:5000/get_course";
        var self = this;
        console.log(this);
        var course_name = this.props.course_name
        var course_code = this.props.course_code
        axios.get(apiBaseUrl+"?courseName="+course_name+"&courseCode="+course_code)
        .then(function (response) {
        if(response.status == 200){
            console.log(response.data);
            self.setState({items:response.data});
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

        }
       

    render() {
        const { classes } = this.props;
        const  item=this.state.items;
        if(this.state.redirect){
          return <Redirect to='/homepage'  />
       }
        return (<Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Course
          </Typography>
        
         
          <form className={classes.form} onSubmit={this.handleSave} noValidate>
            <h6>Course Name: <input disabled value={item.CourseName}/></h6>
            <h6>Course Code: <input disabled value={item.CourseCode}/></h6>
            <h6>Credits <input  value={item.Credits}/></h6>
            <h6>Branch: <input  value={item.Branch}/></h6>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
        </form>

        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
      );
    }

}

export default withStyles(useStyles)(CourseDetails);