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
import { Route, withRouter } from "react-router-dom";
import { loginWithEmailAndPassword } from "../../store/actions/LoginAction";
import { connect } from "react-redux";

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

class Login extends Component {
  state = {
    email: "",
    password: "",
  };
  
  handleChange = event => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleFormSubmit = event => {
    this.props.loginWithEmailAndPassword({ ...this.state });
  }

  render() {
    const { classes } = this.props;
    
    return (
      <div className="flex justify-center w-full h-full-screen" style={{background: "black"}}>
        <div className="p-12">
          <ValidatorForm ref="form" onSubmit={this.handleFormSubmit} style={{minWidth: "400px", maxWidth: "500px"}}>
            <Grid container spacing={2}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Grid container spacing={8}>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <div className="flex flex-wrap items-center mb-4 justify-center">
                      <div className="flex">
                        <Typography variant="h5"><b style={{color: 'green'}}>Work</b></Typography>
                        <Typography variant="h5"><b style={{color: 'white'}}>Alert</b></Typography>
                      </div>
                    </div>
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <div className="flex flex-wrap items-center mb-4 justify-center ">
                      <div>
                          <Button 
                            className="capitalize" 
                            style={{minWidth: "200px", maxWidth: "200px", "font-size": "15px", color: "white"}}
                            onClick={() => { this.props.history.push('/register') }}
                            >
                            Sign Up
                        </Button>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                  <div className="flex flex-wrap items-center mb-4 justify-center ">
                    <div style={{color: 'white'}}>
                      <Typography variant="h6">Login</Typography>
                    </div>
                  </div>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <div className="p-8 h-full bg-light-gray position-relative">
                    <TextValidator
                      className="mb-4 w-full"
                      variant="outlined"
                      label="Email"
                      onChange={this.handleChange}
                      type="email"
                      name="email"
                      value={this.state.email}
                      validators={["required", "isEmail"]}
                      errorMessages={[
                        "this field is required",
                        "email is not valid"
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
                    <TextValidator
                      className="mb-4 w-full"
                      label="Password"
                      variant="outlined"
                      onChange={this.handleChange}
                      name="password"
                      type="password"
                      value={this.state.password}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
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
                </div>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                  <div className="flex flex-wrap items-center mb-4 justify-center">
                    <Button className="capitalize" style={{minWidth: "200px", maxWidth: "200px"}}>
                      <span style={{color: '#09DF6B', 'font-size': '15px'}}>Forgort Password?</span>
                    </Button>
                  </div>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                  <div className="flex flex-wrap items-center mb-4 justify-center ">
                    <div>
                      <Button
                          style={{minWidth: "200px", maxWidth: "200px"}}
                          variant="contained"
                          color="primary"
                          type="submit"
                      >
                        <span style={{color: 'white', 'font-size': '15px'}}>Sign in</span>
                      </Button>
                    </div>
                  </div>
              </Grid>
            </Grid>
            </ValidatorForm>
        </div>
      </div>
    );
  }
} 

const mapStateToProps = state => ({
  loginWithEmailAndPassword: PropTypes.func.isRequired,
  login: state.login
});

export default withStyles(styles)(withRouter(connect(mapStateToProps, { loginWithEmailAndPassword })(Login)));
