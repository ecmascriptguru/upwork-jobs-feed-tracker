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
import history from "../../history.js";

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

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    passwordConfirm: "",
    agreement: ""
  };
    
  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule("isPasswordMatch", value => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });

    ValidatorForm.addValidationRule("lengthLimit", value => {
      if (value.length < 6) {
        return false;
      }
      return true;
    });
  }

  componentWillUnmount() {
    // remove rule when it is not needed
    ValidatorForm.removeValidationRule("isPasswordMatch");
    ValidatorForm.removeValidationRule("lengthLimit");
  }

  handleChange = event => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleFormSubmit = async (event) => {
    let result = await apiCallService.register(this.state.email, this.state.password, this.state.passwordConfirm);

    if(result.status == '200') {
      this.props.changeLocation(null);
      apiCallService.setLocation(null);
    } 
  }

  render() {
    const { classes } = this.props;
    
    return (
      <div className="flex justify-center w-full h-full-screen" style={{background: "black"}}>
        <div style={{height: "85px", width: "650px", position:"absolute", background: "#282828"}}></div>
        <div className="p-8">
          <ValidatorForm ref="form" onSubmit={this.handleFormSubmit} style={{minWidth: "350px", maxWidth: "650px"}}>
            <Grid container spacing={2}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Grid container spacing={2}>
                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <div className="flex flex-wrap items-center mb-4 justify-center" style={{float: "left"}}>
                      <div className="flex">
                        <Typography variant="h5"><b style={{color: '#09DF6B'}}>Work</b></Typography>
                        <Typography variant="h5"><b style={{color: 'white'}}>Alert</b></Typography>
                      </div>
                    </div>
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <div className="flex flex-wrap items-center mb-4 justify-center" style={{float: "right"}}>
                      <div>
                        <Route render={({ history}) => (
                          <Button 
                            className="capitalize" 
                            style={{"font-size": "15px", color: "#09DF6B"}}
                            onClick={() => { this.props.changeLocation(null); apiCallService.setLocation(null); }}
                            >
                            Login
                        </Button>
                        )} />
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                  <div className="flex flex-wrap items-center mb-4 justify-center ">
                    <div style={{color: 'white'}}>
                      <Typography variant="h6">SignUp</Typography>
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
                      validators={["required", "lengthLimit"]}
                      errorMessages={["this field is required", "Password should be at least 6 letters"]}
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
                      label="Password Confirm"
                      variant="outlined"
                      onChange={this.handleChange}
                      name="passwordConfirm"
                      type="password"
                      value={this.state.passwordConfirm}
                      validators={["required", "isPasswordMatch"]}
                      errorMessages={["this field is required", "Password mismatch"]}
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
                  <div className="flex flex-wrap items-center mb-4 justify-center ">
                    <div>
                      <Button
                          style={{minWidth: "200px", maxWidth: "200px"}}
                          variant="contained"
                          color="primary"
                          type="submit"
                      >
                        <span style={{color: 'white', 'font-size': '15px'}}>Sign Up</span>
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

export default withStyles(styles)(SignUp);
