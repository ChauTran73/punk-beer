import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HomeIcon from '@material-ui/icons/Home';
import SignUpIcon from '@material-ui/icons/PersonAdd';
import { Link } from 'react-router-dom';
import {HomePage} from './HomePage';
import {Login} from './Login';


function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class SimpleTabs extends React.Component {
    state = {
      value: 0,
    };
  
    handleChange = (event, value) => {
      this.setState({ value });
    };
  
    render() {
      const { classes } = this.props;
      const { value } = this.state;
  
      return (
        <div className={classes.root}>
          <AppBar position="static">
            <Tabs value={value} onChange={this.handleChange}>
           
              <Tab icon={<HomeIcon />} to='/' component={Link}  label="Home" />
              <Tab  icon={<FavoriteIcon/>} to='/favorite' component={Link}  label="Favorite" />
              <Tab icon={<PersonPinIcon />}  to='/login' component={Link} label="Login"  />
              <Tab icon={<SignUpIcon />}  to='/signup' component={Link} label="Signup"  />
            </Tabs>
          </AppBar>
          {value === 0 }
          {value === 1 && <TabContainer>Homepage</TabContainer>}
          {value === 2 && <TabContainer>Login</TabContainer>}
          {value === 3 && <TabContainer>Signup</TabContainer>}
        </div>
      );
    }
  }
  
  SimpleTabs.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(SimpleTabs);
  