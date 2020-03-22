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

class UserSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', phno: '',  name: "", check: false, redirect: false};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
  }

  handleChange(event) {
    this.setState({email: event.target.value}); 
  }
   handleChangeValue(event) {
    this.setState({phno: event.target.value});
  }  

  handleChangeName(event)
  {
    this.setState({name: event.target.value})
  }
  handleChangeCheckbox(event)
  {
    this.setState({check: event.target.checked})
  }
    
handleSubmit(event) {
        var apiBaseUrl = "http://localhost:5000/";
        var self = this;
        console.log(this);
        var payload={
        "email_id":this.state.email,
        "phone_number":this.state.phno,
        "course_handler_name": this.state.name
        }
        axios.post(apiBaseUrl+'create_user', payload)
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
        if(this.state.check==true){
          this.setState( {email: '', phno: '',  name: "", redirect: false});
        }
        else
        {
          this.props.handleModalClose();
        }
        event.preventDefault();
        }
  
       

    render() {
        const { classes } = this.props;
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
            Create user
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  autoComplete="name"
                  name="course_handler_name"
                  variant="outlined"
                  required
                  fullWidth
                  id="Name"
                  value={this.state.name} onChange={this.handleChangeName}
                  label="Name"
                  autoFocus
                />
              </Grid>
            
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email_id"
                  label="Email Address"
                  value={this.state.email} onChange={this.handleChange}
                  name="email_id"

                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="phone_number"
                  label="Phone number"
                  id="phone_number"
                  value={this.state.phno} onChange={this.handleChangeValue}
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox  onChange={this.handleChangeCheckbox} color="primary" />}
                  label="create one more user"
                />
              </Grid>
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
            <Grid container justify="flex-end">
              <Grid item>

              </Grid>
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

export default withStyles(useStyles)(UserSignup);