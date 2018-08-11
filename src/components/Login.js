import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button'

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: theme.spacing.unit
    },
    formControl: {
      margin: theme.spacing.unit,
    },
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
    
  });

class Login extends React.Component{
   
    constructor(props){
        super(props);
        this.state ={username:'', password:'', message:''}
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }
    handleChange = prop => event => {
      this.setState({ [prop]: event.target.value });
    };
    onSubmit(e){
        //pull username and password from state 
        const { username, password } = this.state;
       
        const { history } = this.props;
        console.log(this.state.username, this.state.password)
        // this.setState({ error: false });
        // if (!(username === 'chau' && password === 'tran')) {
        //     return this.setState({ error: true });}
        //     store.set('loggedIn', true);
        //     history.push('/homepage');

    //     axios.post('/api/users/login', { username, password })
    //   .then((result) => {
    //     localStorage.setItem('jwtToken', result.data.token);
    //     this.setState({ message: '' });
    //     this.props.history.push('/homepage')
    //   })
    //   .catch((error) => {
    //     if(error.response.status === 401) {
    //       this.setState({ message: 'Login failed. Username or password is not matched' });
    //     }
    //   });
    }

    
    render() {
        const { classes } = this.props;

        return (
          
            <div className={classes.container}>
           
            <FormControl required  className={classes.formControl}>
              <InputLabel htmlFor="name-simple">Username</InputLabel>
              <Input id="name-simple" value={this.state.username} onChange={this.handleChange('username')}/>
            </FormControl>
            <FormControl required className={classes.formControl} aria-describedby="name-helper-text">
              <InputLabel htmlFor="name-helper">Password</InputLabel>
              <Input id="name-helper" value={this.state.password} type="password" onChange={this.handleChange('password')} />
            </FormControl>
           <Button variant="outlined" color="primary" className={classes.button} 
           onClick={this.onSubmit}>Login</Button>
           
      <Button variant="outlined" color="secondary" className={classes.button} >
      
      <Link to="/">Go home</Link></Button>
      <span>Don't have an account yet? <Link to='/signup'>Signup here!</Link></span>
     
            </div>)
      }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Login);