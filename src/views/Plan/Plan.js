import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { 
  TextField, 
  Button, 
  Divider, 
  Card, 
  Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core';
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import Header from '../../components/Layout/Header/Header';
import { Route } from "react-router-dom";
import apiCallService from "../../api/apiCallService";
import { connect } from "react-redux";
import PlanCard from "./PlanCard";
import { setUserData, setDefaultKeyword, setKeywordList } from "../../store/actions/UserAction";
import history from "../../history.js";
import LoadingOverlay from 'react-loading-overlay';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },

  cssLabel: {
    color : 'green'
  },

  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `${theme.palette.primary.main} !important`,
    }
  },

  cssFocused: {},

  notchedOutline: {
    borderWidth: '1px',
    borderColor: 'green !important'
  },

});

class Plan extends Component {
  state = {
    loading: false,
    planList: [],
  };

  async componentDidMount () {
    this.setState({
      loading: true,
    });
    apiCallService.loginWithToken();
    let result = await apiCallService.CallAPIWithToken('/api/plans', 'get', {});

    if(result.status == '200') {
      console.log("plan: " + result.data);
      this.setState({
        planList: result.data,
      });
    }
    await this.props.setUserData(apiCallService.getUser());
    this.setState({
      loading: false,
    });
  }

  onClickBack() {
    /*
    history.push({
      pathname: "/index.html#/find"
    });
    window.location.reload();
    */
    this.props.changeLocation("find");
  }

  handleChange = event => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleFormSubmit = event => {
  }

  render() {
    const { classes } = this.props;
    
    return (
      <div className="flex justify-center w-full h-full-screen" style={{background: "black"}}>
        <div style={{height: "85px", width: "650px", position:"absolute", background: "#282828"}}>
          <div className="p-8">
            <Grid container spacing={2}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Grid container spacing={2}>
                  <Grid item lg={6} md={6} sm={6} xs={12} style={{paddingLeft: "40px"}}>
                    <div className="flex flex-wrap items-center mb-4 justify-center" style={{float: "left"}}>
                      <div className="flex">
                        <Typography variant="h5"><b style={{color: '#09DF6B'}}>Work</b></Typography>
                        <Typography variant="h5"><b style={{color: 'white'}}>Alert</b></Typography>
                      </div>
                    </div>
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={12} style={{paddingRight: "35px"}}>
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
                  <div className="flex flex-wrap items-center mb-4 justify-center ">
                    <div style={{color: 'white'}}>
                      <Typography variant="h6">Select Your Plan</Typography>
                    </div>
                  </div>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Grid container spacing={2}>
                  { this.state.planList.map((plan, index) => (
                  <Grid item lg={4} md={4} sm={4} xs={12}>
                      <PlanCard plan={plan} currentPlan={this.props.total.user.user ? (this.props.total.user.user.current_plan ? this.props.total.user.user.current_plan : null) : null}/>
                  </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                    <div className="flex flex-wrap items-center mb-4 justify-center">
                      <Button className="capitalize" style={{minWidth: "200px"}} onClick={() => {this.props.changeLocation("find"); apiCallService.setLocation("find")}}>
                        <span style={{color: '#09DF6B', 'font-size': '15px'}}>Back</span>
                      </Button>
                    </div>
                </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                  <div className="flex flex-wrap items-center mb-4 justify-center">
                    <Button className="capitalize" style={{minWidth: "200px"}}>
                      <span style={{color: '#09DF6B', 'font-size': '15px'}}>Contact For Custom Quantity</span>
                    </Button>
                  </div>
              </Grid>
            </Grid>
          </LoadingOverlay>
          </ValidatorForm>
        </div>
      </div>
    );
  }
} 

const mapStateToProps = state => ({
  total: state
});
export default withStyles(styles)(connect(mapStateToProps, { setUserData })(Plan));
