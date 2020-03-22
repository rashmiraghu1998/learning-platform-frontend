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

class CourseSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {course_name: "", course_code: "", credits: "", syllabus_file_name: "", syllabus_file_type: "mime", url: "", files: "", semester:"", branch: "", check: false, redirect: false};
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeCode = this.handleChangeCode.bind(this);
    this.handleChangeCredits = this.handleChangeCredits.bind(this);
    this.handleChangeSem = this.handleChangeSem.bind(this);
    this.handleChangeBranch = this.handleChangeBranch.bind(this);
    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChangeName(event) {
    this.setState({course_name: event.target.value}); 
  }
  handleChangeCode(event) {
    this.setState({course_code: event.target.value }); 
  }
  handleChangeCredits(event) {
    this.setState({credits: event.target.value}); 
  }
  handleChangeSem(event) {
    this.setState({semester: event.target.value}); 
  }
  handleChangeBranch(event) {
    this.setState({branch: event.target.value}); 
  }
  handleChangeCheckbox(event)
  {
    this.setState({check: event.target.checked})
  }
  onChangeHandler(event)
  {
    this.setState({files: event.target.files[0]})
    console.log("Here"+event.target.files[0]);
    console.log(this)
  }
    

    
handleSubmit(event) {
        var apiBaseUrl = "http://localhost:5000/";
        var self = this;
        console.log(this);
        console.log(self.state.files)

        var payload=
          {
            "course_name": this.state.course_name,
            "course_code": this.state.course_code,
            "credits": this.state.credits,
            "syllabus_file_name": this.state.course_code+"_"+this.state.course_name,
            "syllabus_file_type": "mime",
            "semester": this.state.semester,
            "branch": this.state.branch
          }
        var url;

        
        axios.post(apiBaseUrl+"upload_course", payload)
        .then(function (response) {
        if(response.status == 200){
        console.log("Successfully added");
        self.setState({redirect:false, url: response.data.SyllabusUrl});    
        self.handle();
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
        if(self.state.check)
        {
          this.setState( {course_name: "", course_code: "", credits: "", syllabus_file_name: "", syllabus_file_type: "", url: "", file: "", semester:"", branch: "", redirect: false});
        }
        else
        {
          this.props.handleModalClose();
        }
        event.preventDefault();
        }

      handle() {
        var self = this;
        console.log(self)
        axios.put(self.state.url, self.state.files)
        .then(function (response) {
        if(response.status == 200){
        console.log("Successfully added");
         }
        else{
        console.log("Error");
        alert("Error");
       
        }
        })
        .catch(function (error) {
        console.log(error);
        });
        console.log(self.state)
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
            Create course
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  autoComplete="name"
                  name="course_name"
                  variant="outlined"
                  required
                  fullWidth
                  id="Name"
                  value={this.state.course_name} onChange={this.handleChangeName}
                  label="Name"
                  autoFocus
                />
              </Grid>
            
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="course_code"
                  label="Course code"
                  value={this.state.course_code} onChange={this.handleChangeCode}
                  name="course_code"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="credits"
                  label="Credits"
                  value={this.state.credits} onChange={this.handleChangeCredits}
                  name="credits"
                />
              </Grid>

              
<Button
  variant="contained"
 >
 
<input 
              color="primary" class="submit" type="file" name="file" onChange={this.onChangeHandler}/>
</Button>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="semester"
                  label="Semester"
                  value={this.state.semester} onChange={this.handleChangeSem}
                  name="semester"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="branch"
                  label="Branch"
                  value={this.state.branch} onChange={this.handleChangeBranch}
                  name="branch"
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

export default withStyles(useStyles)(CourseSignup);