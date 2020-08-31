import React, {
  createRef,
  useEffect,
  useState
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core';

import { sGetAuth } from '../../store/reducers/auth';
import { sGetUnseenJobs } from '../../store/reducers/jobs';

import apiCallService from "../../api/apiCallService";

import NewJobsText from './NewJobsText';
import NoNewJobsText from './NoNewJobsText';
import UnauthenticatedText from './UnauthenticatedText';

import Login from '../Auth/Login';
import SignUp from '../Auth/SignUp';
import Plan from '../Plan/Plan';
import Find from '../Find/Find';
import Options from '../Options/Options';
import styles from './Popup.style';

const defaultWidth = 600;
const safeWidth = 10; // includes spacing, etc.

class Popup extends React.Component {
  state = {
    containerWidth: defaultWidth,
    authUser: null,
    location: null,
  }

  constructor(props) {
    super(props);
    this.StorageUpdated = this.StorageUpdated.bind(this);
  }

  componentDidMount() {
    this.setState({
      authUser: apiCallService.getUser(),
      location: apiCallService.getLocation(),
    });

    if (typeof window !== 'undefined') {
        window.addEventListener('storage', this.StorageUpdated)
        console.log("bbb");
    }
  }

  componentWillUnmount(){
      if (typeof window !== 'undefined') {
          window.removeEventListener('storage', this.StorageUpdated)
      }
  }

  StorageUpdated = async () => {
    console.log("ccc");
    let location = await apiCallService.getLocation();
    let authUser = await apiCallService.getUser();
    this.setState({
      location: location,
      authUser: authUser,
    });
  }

  changeLocation = (location) => {
    this.setState({
      location: location,
    });
    console.log("location: " + location);
  }

  render() {
    return (
      <Card
        className={this.props.classes.container}
        style={{ width: this.state.containerWidth, background: "black" }}
      >
        <Grid
          container
          spacing={1}
        >
          <Grid
            className={this.props.classes.textContainer}
            item
          >
            <Box
              fontWeight={700}
              fontSize={15}
              color="textSecondary"
              className={this.props.classes.typography}
            >
              {
                this.state.authUser !== null &&
                this.state.location === 'plan' &&
                <Plan changeLocation={this.changeLocation}/>
              }
              {
                this.state.authUser !== null &&
                this.state.location === 'find' &&
                <Find changeLocation={this.changeLocation}/>
              }
              {
                this.state.authUser !== null &&
                this.state.location === 'options' &&
                <Options changeLocation={this.changeLocation}/>
              }
              {
//                this.state.authUser === null &&
                this.state.location === null &&
                <Login changeLocation={this.changeLocation}/>
              }
              {
                this.state.authUser === null &&
                this.state.location === 'signup' &&
                <SignUp changeLocation={this.changeLocation}/>
              }
            </Box>
          </Grid>
        </Grid>
      </Card>
    );
  }
};

Popup.propTypes = {
  classes: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  unseenJobs: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: sGetAuth(state),
  unseenJobs: sGetUnseenJobs(state),
  total: state,
});

export default connect(
  mapStateToProps,
  {}
)(withStyles(styles)(Popup));
