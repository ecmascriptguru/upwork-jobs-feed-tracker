import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { 
  TextField, 
  Button, 
  Divider, 
  Card, 
  Typography,
  IconButton,
  Icon,
 } from '@material-ui/core';
import { withStyles } from '@material-ui/core';
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import Header from '../../components/Layout/Header/Header';
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import FindItem from "./FindItem";
import AddIcon from '@material-ui/icons/Add';
import apiCallService from "../../api/apiCallService";
import { setUserData, setDefaultKeyword, setKeywordList } from "../../store/actions/UserAction";
import { acJobsSet } from '../../store/actions/jobs';
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
    color : '#999999'
  },

  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `#999999 !important`,
    }
  },

  cssFocused: {},

  notchedOutline: {
    borderWidth: '1px',
    borderColor: '#999999 !important'
  },

});

class Find extends Component {
  state = {
    keyword: "",
    rss: "",
    loading: false,
  };

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
    this.setState({
      loading: false,
    });
  }
  
  handleChange = event => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleFormSubmit = event => {
    console.log("submitted");
    this.createKeyword();
  }

  displayJobs = async (keyword) => {
    await this.props.setDefaultKeyword(keyword);
    await apiCallService.setUser(this.props.total.user.user);
    // history.push({
    //   pathname: "/index.html#/options"
    // });
    // window.location.reload();
    this.props.changeLocation("options");
    apiCallService.setLocation("options");
  }

  deleteKeyword = async (id) => {
    this.setState({
      loading: true,
    });
    let result = await apiCallService.CallAPIWithToken('/api/keywords/' + id + '/', 'delete', {});
    
    console.log("keywords: " + JSON.stringify(result.data));
    if(result.status == '200') {
      await this.props.setKeywordList(result.data.keywords);
      await apiCallService.setUser(this.props.total.user.user);
    }
    this.setState({
      loading: false,
    });
  }

  createKeyword = async () => {
    this.setState({
      loading: true,
    });
    let result = await apiCallService.CallAPIWithToken('/api/keywords', 'post', {
      'keyword': this.state.keyword,
      'rss': this.state.rss,
    });

    if(result.status == '200') {
      await this.props.setKeywordList(result.data.keywords);
      await apiCallService.setUser(this.props.total.user.user);
      this.setState({
        keyword: '',
      });
    }
    console.log("add:" + JSON.stringify(result.data));
    this.setState({
      loading: false,
    });
  }

  render() {
    const { classes } = this.props;
    
    return (
      <div className="flex justify-center w-full h-full-screen" style={{background: "black", overflow: "auto"}}>
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
          <div style={{minWidth: "350px", maxWidth: "650px", paddingTop: "80px"}}>
          <LoadingOverlay
          active={this.state.loading}
          spinner>
            <Grid container spacing={2}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Grid container spacing={2}>
                  { this.props.total.user.user ? this.props.total.user.user.keywords.map((keyword, key) => (
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <FindItem keywordItem={keyword} displayJobs={this.displayJobs} deleteKeyword={this.deleteKeyword}/>
                    </Grid>
                  )) : ''}
                </Grid>
              </Grid>
              { this.props.total.user.user && this.props.total.user.user.current_plan ? ( this.props.total.user.user.keywords.length < this.props.total.user.user.current_plan.keyword_limit ?
              <Grid item lg={12} md={12} sm={12} xs={12}>
              <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
                <Grid container spacing={2}>
                    <Grid item lg={5} md={5} sm={5} xs={10}>
                    <TextValidator
                      className="mb-4 w-full"
                      variant="outlined"
                      label="Keyword"
                      onChange={this.handleChange}
                      type="keyword"
                      name="keyword"
                      value={this.state.keyword}
                      validators={["required"]}
                      errorMessages={[
                        "this field is required"
                      ]}
                      InputLabelProps={{
                        classes: {
                          root: classes.cssLabel,
                          focused: classes.cssFocused,
                        },
                      }}
                      InputProps={{
                        classes: {
                          root: classes.cssOutlinedInput,
                          focused: classes.cssFocused,
                          notchedOutline: classes.notchedOutline,
                        },
                      }}
                    />
                    </Grid>
                    <Grid item lg={5} md={5} sm={5} xs={10}>
                    <TextValidator
                      className="mb-4 w-full"
                      variant="outlined"
                      label="Upwork RSS Link"
                      onChange={this.handleChange}
                      type="rss"
                      name="rss"
                      value={this.state.rss}
                      validators={["required"]}
                      errorMessages={[
                        "this field is required"
                      ]}
                      InputLabelProps={{
                        classes: {
                          root: classes.cssLabel,
                          focused: classes.cssFocused,
                        },
                      }}
                      InputProps={{
                        classes: {
                          root: classes.cssOutlinedInput,
                          focused: classes.cssFocused,
                          notchedOutline: classes.notchedOutline,
                        },
                      }}
                    />
                    </Grid>
                    <Grid item lg={2} md={2} sm={2} xs={2}>
                        <IconButton 
                          className="capitalize w-full" 
                          variant="outlined" 
                          style={{color: '#09DF6B', 'font-size': '15px'}}
                          type="submit"
//                          onClick={this.createKeyword}
                          >
                            <AddIcon></AddIcon>
                        </IconButton>
                    </Grid>
                </Grid> 
                </ValidatorForm>
              </Grid> : "") : 
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <div className="flex flex-wrap items-center mb-4 justify-center">
                  <span style={{color: '#09DF6B', 'font-size': '13px'}}>Please select the plan to find your jobs.</span>
                </div>
              </Grid>
              }
              <Grid item lg={12} md={12} sm={12} xs={12}>
                  <div className="flex flex-wrap items-center mb-4 justify-center">
                    <Button className="capitalize" style={{minWidth: "200px"}}>
                      <span style={{color: '#09DF6B', 'font-size': '15px'}}>Add More Keywords</span>
                    </Button>
                  </div>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                  <div className="flex flex-wrap items-center mb-4 justify-center">
                  <Route render={({ history}) => (
                    <Button className="capitalize" style={{minWidth: "200px"}} 
                      variant="contained"
                      color="primary"
                      onClick={async () => { this.props.changeLocation("plan"); apiCallService.setLocation("plan"); }}
                      >
                      <span style={{color: 'white', 'font-size': '15px'}}>Upgrade</span>
                    </Button>
                  )}/>
                  </div>
              </Grid>
            </Grid>
            </LoadingOverlay>
          </div>
        </div>
      </div>
    );
  }
} 

const mapStateToProps = state => ({
  total: state
});

export default withStyles(styles)(connect(mapStateToProps, { setUserData, setDefaultKeyword, setKeywordList, acJobsSet })(Find));
