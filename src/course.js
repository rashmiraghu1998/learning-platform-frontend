import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Paper from '@material-ui/core/Paper';
import CourseDetails from './course_details.js'
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';

import Backdrop from '@material-ui/core/Backdrop';
import Tab from '@material-ui/core/Tab';
const useStyles = ((theme) => ({
  root: {
    display: 'container',
    flexWrap: 'wrap',
    overflow: 'hidden',
  
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    overflow: 'auto',
  }
,
'@global': {
  ul: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
},
appBar: {
  borderBottom: `1px solid ${theme.palette.divider}`,
},
toolbar: {
  flexWrap: 'wrap',
},
toolbarTitle: {
  flexGrow: 1,
},
link: {
  margin: theme.spacing(1, 1.5),
},
heroContent: {
  padding: theme.spacing(8, 0, 6),
},
cardHeader: {
  backgroundColor:
    theme.palette.type === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200],
 
},
modal: {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
},
paper: {
  backgroundColor: theme.palette.background.paper,
  border: '2px solid #000',
  boxShadow: theme.shadows[3],
  padding: theme.spacing(2, 4, 3),
},
cardPricing: {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'baseline',
  marginBottom: theme.spacing(2),
},
footer: {
  borderTop: `1px solid ${theme.palette.divider}`,
  marginTop: theme.spacing(8),
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  [theme.breakpoints.up('sm')]: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
  },
},
}));


  const tileData = [
    {
      title: 'Design',
      description: ['Course to give a gist of', 'algorithms, solutions, questions around them ', 'and much more'],
      buttonVariant: 'outlined',
      Coursecode: '16cs089ADA'
    },
    {
      title: 'Design',
      description: ['Course to give a gist of', 'algorithms, solutions, questions around them ', 'and much more'],
      buttonVariant: 'outlined',
      Coursecode: '16cs089DSR'
    },
    {
      title: 'Design',
      description: ['Course to give a gist of', 'algorithms, solutions, questions around them ', 'and much more'],
      buttonVariant: 'outlined',
      Coursecode: '16cs089PSQ'
    }
 ];

class Course extends Component {
  constructor () {
    super();
    this.state = {
      fireRedirect: false,
    redirect: "/homepage",
    showModal: false,
    details: "",
    open: false
    }
    this.goToStore = this.goToStore.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }
  handleClose(event) {
    this.setState({fireRedirect: false});
  };
  handleModalClose = ()=>{
    this.setState({showModal: false})}

  goToStore(event) {
    var self = this;
    var value = event.currentTarget.value;
    console.log(event);
    console.log(value);
    console.log(self.props.code);
    console.log(self.props.name)
    this.setState({fireRedirect: true, redirect: <CourseDetails course_code={this.props.code} course_name={this.props.name} />});    
    event.preventDefault();
  }

render(){
  const {classes} = this.props;
  return (
    <div className={classes.root}>
      <br/>
      <br/>
      <br/>


<div>

  <br/>
  <Grid container spacing={3}>
  <Grid item xs={8}>
         
        </Grid>
        <Grid item xs={2}>     
           <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={this.state.fireRedirect}
              onClose={this.handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={this.state.fireRedirect} >
                <div className={classes.paper}>
                  {this.state.redirect}
                </div>
              </Fade>
              </Modal>
        <Button fullWidth  color="primary" onClick={this.goToStore} >
                   Edit Course details
                  </Button>
        </Grid>
        <Grid item xs={2}>
        <Button fullWidth  color="primary"  onClick={this.goToStore}>
                   Upload content
                  </Button>
        </Grid>
    </Grid>
 

  <Button fullWidth  color="primary"  >
   
  </Button>
  <h6>Unit 1</h6>
      <GridList className={classes.gridList} >
        {tileData.map((tile) => (
          <GridListTile >
         
             <Grid item key={tile.title}>
              <Card>
                <CardHeader
                  title={tile.title}
                  subheader={tile.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
                <CardContent>
                  
                  <ul>
                    {tile.description.map(line => (
                      <Typography component="li" variant="subtitle1" align="center" key={line}>
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
   
              </Card>

            </Grid>
          </GridListTile>
        ))}
      </GridList>
      </div>
      <br/>
      <div>
        <h6> Unit 2</h6>
      <GridList className={classes.gridList} >
        {tileData.map((tile) => (
          <GridListTile >
         
             <Grid item key={tile.title}>
              <Card>
                <CardHeader
                  title={tile.title}
                  subheader={tile.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
                <CardContent>
                  
                  <ul>
                    {tile.description.map(line => (
                      <Typography component="li" variant="subtitle1" align="center" key={line}>
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
   
              </Card>

            </Grid>
          </GridListTile>
        ))}
      </GridList>
      </div>
      <br/>
      <div>
        <h6> Unit 3</h6>
      <GridList className={classes.gridList} >
        {tileData.map((tile) => (
          <GridListTile >
         
             <Grid item key={tile.title}>
              <Card>
                <CardHeader
                  title={tile.title}
                  subheader={tile.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
                <CardContent>
                  
                  <ul>
                    {tile.description.map(line => (
                      <Typography component="li" variant="subtitle1" align="center" key={line}>
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
   
              </Card>

            </Grid>
          </GridListTile>
        ))}
      </GridList>
      </div>
      <br/>
      <div>
        <h6> Unit 4</h6>
      <GridList className={classes.gridList} >
        {tileData.map((tile) => (
          <GridListTile >
         
             <Grid item key={tile.title}>
              <Card>
                <CardHeader
                  title={tile.title}
                  subheader={tile.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
                <CardContent>
                  
                  <ul>
                    {tile.description.map(line => (
                      <Typography component="li" variant="subtitle1" align="center" key={line}>
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
   
              </Card>

            </Grid>
          </GridListTile>
        ))}
      </GridList>
      </div>
      <br/>
      <div>
        <h6> Unit 5</h6>

              <Card>
                <CardHeader
                  title= "This unit is not present for this course"
                  
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
              
   
              </Card>

     
                    
      </div>
    </div>
  );
                    }
}

export default withStyles(useStyles)(Course);