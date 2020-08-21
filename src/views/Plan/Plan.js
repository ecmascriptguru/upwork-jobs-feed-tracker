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
    email: "",
    password: "",
    agreement: ""
  };
  
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
        <div className="p-12">
          <ValidatorForm ref="form" onSubmit={this.handleFormSubmit} style={{minWidth: "400px", maxWidth: "650px"}}>
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
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                  <div className="flex flex-wrap items-center mb-4 justify-center ">
                    <div style={{color: 'white'}}>
                      <Typography variant="h6">Select Your Plan</Typography>
                    </div>
                  </div>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Grid container spacing={1}>
                  <Grid item lg={4} md={4} sm={12} xs={12}>
                  <Button>
                    <Card className="p-sm-24" elevation={6} style={{background: "#222222"}}>
                      <Grid item lg={12} md={12} sm={12} xs={12} className="flex flex-wrap items-center justify-center ">
                        <p>Basic</p>
                      </Grid>
                      <Grid item lg={12} md={12} sm={12} xs={12} className="flex flex-wrap items-center justify-center ">
                        <h3>$4.99 / Mo</h3>
                      </Grid>
                      <Grid item lg={12} md={12} sm={12} xs={12} className="flex flex-wrap items-center justify-center ">
                        <p>1 Keyword</p>
                      </Grid>
                    </Card>
                    </Button>
                  </Grid>
                  <Grid item lg={4} md={4} sm={12} xs={12}>
                  <Button>
                    <Card className="p-sm-24" elevation={6} style={{background: "#222222"}}>
                      <Grid item lg={12} md={12} sm={12} xs={12} className="flex flex-wrap items-center justify-center ">
                        <p>Standard</p>
                      </Grid>
                      <Grid item lg={12} md={12} sm={12} xs={12} className="flex flex-wrap items-center justify-center ">
                        <h3>$9.99 / Mo</h3>
                      </Grid>
                      <Grid item lg={12} md={12} sm={12} xs={12} className="flex flex-wrap items-center justify-center ">
                        <p>3 Keywords</p>
                      </Grid>
                    </Card>
                    </Button>
                  </Grid>
                  <Grid item lg={4} md={4} sm={12} xs={12}>
                  <Button>
                    <Card className="p-sm-24" elevation={6} style={{background: "#222222"}}>
                      <Grid item lg={12} md={12} sm={12} xs={12} className="flex flex-wrap items-center justify-center ">
                        <p>Premium</p>
                      </Grid>
                      <Grid item lg={12} md={12} sm={12} xs={12} className="flex flex-wrap items-center justify-center ">
                        <h3>$19.99 / Mo</h3>
                      </Grid>
                      <Grid item lg={12} md={12} sm={12} xs={12} className="flex flex-wrap items-center justify-center ">
                        <p>10 Keyword</p>
                      </Grid>
                    </Card>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                  <div className="flex flex-wrap items-center mb-4 justify-center">
                    <Button className="capitalize" style={{minWidth: "200px"}}>
                      <span style={{color: '#09DF6B', 'font-size': '15px'}}>Contact For Custom Quantity</span>
                    </Button>
                  </div>
              </Grid>
            </Grid>
            </ValidatorForm>
        </div>
      </div>
    );
  }
} 

export default withStyles(styles)(Plan);
