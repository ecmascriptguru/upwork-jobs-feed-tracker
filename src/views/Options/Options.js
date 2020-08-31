import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { withStyles, 
    Typography,
    Button,
} from '@material-ui/core';

import JobsList from '../../components/JobsList/JobsList';
import Settings from '../../components/Settings/Settings';
import { connect } from "react-redux";
import styles from './Options.style';
import apiCallService from "../../api/apiCallService";
import { Route, withRouter } from "react-router-dom";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { setUserData } from "../../store/actions/UserAction";
import { acJobsSet } from '../../store/actions/jobs';
import LoadingOverlay from 'react-loading-overlay';
import history from "../../history.js";
import zIndex from '@material-ui/core/styles/zIndex';

class Options extends Component {
  state = {
    loading: false,
  };

  constructor(props) {
    super(props);
    this.localStorageUpdated = this.localStorageUpdated.bind(this);
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    await apiCallService.loginWithToken();
    await this.props.setUserData(apiCallService.getUser());
    
    let jobs = await apiCallService.getJob();
    if(jobs) {
      await this.props.acJobsSet(jobs);
    }

    if (typeof window !== 'undefined') {
        window.addEventListener('storage', this.localStorageUpdated)
    }
    this.setState({
      loading: false,
    });
  }

  componentWillUnmount(){
      if (typeof window !== 'undefined') {
          window.removeEventListener('storage', this.localStorageUpdated)
      }
  }

  localStorageUpdated = async () => {
    console.log("storaged changed");
    let jobs = await apiCallService.getJob();
    if(jobs) {
      await this.props.acJobsSet(jobs);
    }
  }

  onClickBack() {
    history.push({
      pathname: "/index.html#/find"
    });
    window.location.reload();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="flex justify-center w-full h-full-screen" style={{background: "black", overflow: "auto"}}>
        <div style={{height: "85px", width: "650px", position:"absolute", background: "#282828", zIndex: "100"}}>
          <div className="p-8">
            <Grid container spacing={2}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Grid container spacing={2}>
                  <Grid item lg={6} md={6} sm={6} xs={12} style={{paddingLeft: "49px"}}>
                    <div className="flex flex-wrap items-center mb-4 justify-center" style={{float: "left"}}>
                      <div className="flex">
                        <Typography variant="h5"><b style={{color: '#09DF6B'}}>Work</b></Typography>
                        <Typography variant="h5"><b style={{color: 'white'}}>Alert</b></Typography>
                      </div>
                    </div>
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={12} style={{paddingRight: "26px"}}>
                    <div className="flex flex-wrap items-center mb-4 justify-center" style={{float: "right"}}>
                      <div>
                      <Route render={({ history}) => (
                          <Button 
                            className="capitalize" 
                            style={{"font-size": "15px", color: "white"}}
                            onClick={() => { this.props.changeLocation(null); apiCallService.logout();}}
                            >
                            Logout
                        </Button>
                        )} />
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
        <div className="p-8">
          <ValidatorForm ref="form" onSubmit={this.handleFormSubmit} style={{minWidth: "350px", maxWidth: "650px", paddingTop: "80px"}}>
            <LoadingOverlay
            active={this.state.loading}
            spinner>
              <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Grid container spacing={2} className="flex flex-wrap items-center mb-4 justify-center">
                    <Grid item lg={2} md={2} sm={2} xs={12}>
                        <div className="flex flex-wrap mb-4 justify-center">
                          <Button className="capitalize" style={{minWidth: "100px"}} onClick={() => {this.props.changeLocation("find"); apiCallService.setLocation("find");}}>
                            <span style={{color: '#09DF6B', 'font-size': '15px'}}>&lt;- Back</span>
                          </Button>
                        </div>
                    </Grid>
                    <Grid item lg={8} md={8} sm={8} xs={12}>
                        <div className="flex flex-wrap items-center mb-4 justify-center ">
                          <div style={{color: 'white'}}>
                            <Typography variant="h6">Keyword: {this.props.total.user.user ? this.props.total.user.user.default_keyword : ''}</Typography>
                          </div>
                        </div>
                    </Grid>
                    <Grid item lg={2} md={2} sm={2} xs={12}>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12} style={{marginTop: "-90px"}}>
                  <JobsList />
                </Grid>
              </Grid>
              </LoadingOverlay>
            </ValidatorForm>
        </div>
      </div>
    );
  }
}


Options.propTypes = { classes: PropTypes.object.isRequired };
const mapStateToProps = state => ({
  total: state
});

export default withStyles(styles)(connect(mapStateToProps, { setUserData, acJobsSet })(Options));
