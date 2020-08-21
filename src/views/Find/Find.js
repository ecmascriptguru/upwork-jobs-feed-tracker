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
import FindItem from "./FindItem";
import AddIcon from '@material-ui/icons/Add';
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

class Find extends Component {
  state = {
    keyword: "",
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
                <Grid container spacing={2}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <FindItem/>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <FindItem/>
                    </Grid>
                </Grid>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Grid container spacing={2}>
                    <Grid item lg={10} md={10} sm={12} xs={12}>
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
                    <Grid item lg={2} md={2} sm={12} xs={12}>
                        <IconButton className="capitalize w-full" variant="outlined" style={{color: '#09DF6B', 'font-size': '15px'}}>
                            <AddIcon></AddIcon>
                        </IconButton>
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

export default withStyles(styles)(Find);
