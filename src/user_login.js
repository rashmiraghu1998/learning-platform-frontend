import React, { Component } from "react";
import axios from 'axios';
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
function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="#">
          L.S.M
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const useStyles = theme => ({
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
        marginTop: theme.spacing(1),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
  });

class UserLogin extends Component {
    
    constructor(props) {
        super(props);
        this.state = {email: '', password: '',  loginStatus:false};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeValue = this.handleChangeValue.bind(this);
        
      }
    
      handleChange(event) {
        this.setState({email: event.target.value}); 
      }
       handleChangeValue(event) {
        this.setState({password: event.target.value});
      }  
        
    handleSubmit(event) {
            var apiBaseUrl = "http://localhost:5000/user/";
            var self = this;
            console.log(this);
            var payload={
            "email":this.state.email,
            "password":this.state.password
            }
            axios.post(apiBaseUrl+'login', payload)
            .then(function (response) {
            console.log(response);
            if(response.status == 200){
            console.log("Login successful");
            self.setState({loginStatus:true}); 
            }
            else if(response.status == 204){
            console.log("Username password do not match");
            alert("username password do not match");
            self.setState({loginStatus:false});
            }
            else{
            console.log("Username does not exist");
            alert("Username does not exist");
            self.setState({loginStatus:false});
            }
            })
            .catch(function (error) {
            console.log(error);
            });

            event.preventDefault();
            }
      
           
    render() {
        const { classes } = this.props;
        if(this.state.loginStatus){
            return <Redirect to='/user-homepage'  />
         }
 
        return (
            <Container component="main" maxWidth="xs">
            <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form method="post" className={classes.form} onSubmit={this.handleSubmit} validate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={this.state.email} onChange={this.handleChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={this.state.password} onChange={this.handleChangeValue}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>

    
        );


    }

}
export default withStyles(useStyles)(UserLogin);