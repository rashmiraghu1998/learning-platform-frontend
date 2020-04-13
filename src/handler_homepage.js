import React, { Component } from "react"
import AppBar from '@material-ui/core/AppBar';
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
import { Redirect } from "react-router-dom";
import Course from './course'
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

const useStyles = theme => ({
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
});

const courses = [
  {
    title: 'Design and analyses of algorithms',
    description: ['Course to give a gist of', 'algorithms, solutions, questions around them ', 'and much more'],
    buttonVariant: 'outlined',
    Coursecode: '86878',
    Coursename: "raosuj"
  },
  {
    title: '',
    description: ['Course to give a gist of', 'algorithms, solutions, questions around them ', 'and much more'],
    buttonVariant: 'outlined',
    Coursecode: '16cs089DSR'
  },
  {
    title: 'Design and analyses of algorithms',
    description: ['Course to give a gist of', 'algorithms, solutions, questions around them ', 'and much more'],
    buttonVariant: 'outlined',
    Coursecode: '16cs089PSQ'
  },
];
const footers = [
  {
    title: 'Company',
    description: ['Team', 'Motivation', 'Contact us'],
  },
  {
    title: 'Features',
    description: ['What students can do', 'What college can do', 'What we do'],
  }

];


class handlerhome extends Component {
  constructor () {
    super();
    this.state = {
      fireRedirect: false,
      redirect: "",
      name: ""
    }
    
  }

  goToStore(v1,v2, event) {
    var self = this;
    var value = event.currentTarget.value;
    console.log(value)
    this.setState({fireRedirect: true,redirect: v1, name: v2});   
    event.preventDefault();
  }

  getRedirect(event){
    console.log(this.state.redirect)
  }
  render () {

    const { classes } = this.props;
     if(this.state.fireRedirect){
            return <Course code={this.state.redirect} name={this.state.name} />;
     }
 
        return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
        
          </Typography>

          <Button href="#" color="primary" variant="outlined" className={classes.link}>

          </Button>
        
        </Toolbar>
      </AppBar>
      {/* Hero unit */}
      <Container maxWidth="sm" component="main" className={classes.heroContent}>

        <Typography variant="h5" align="center" color="textSecondary" component="p">
        Please select one of these to proceed!!
        </Typography>
      </Container>
      
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {courses.map(tier => (
            
            <Grid item key={tier.title} xs={12}  sm={6} md={4}>
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
                <CardContent>
                  
                  <ul>
                    {tier.description.map(line => (
                      <Typography component="li" variant="subtitle1" align="center" key={line}>
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant={tier.buttonVariant} value={tier.Coursecode, tier.Coursename}  color="primary" onClick={this.goToStore.bind(this, tier.Coursecode,tier.Coursename)} >
                    View
                  </Button>
                </CardActions>
              </Card>

            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Footer */}
      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Grid container spacing={4} justify="space-evenly">
          {footers.map(footer => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map(item => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="textSecondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>

      </Container>
      {/* End footer */}
    </React.Fragment>
  );
    }
}
export default withStyles(useStyles)(handlerhome);