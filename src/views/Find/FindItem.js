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
import MailIcon from '@material-ui/icons/Mail';
import Badge from '@material-ui/core/Badge';

class FindItem extends Component {
  render() {
    
    return (
      <Card className="p-sm-24" elevation={6} style={{background: "#222222"}}>
        <Grid container>
            <Grid item lg={1} md={1} sm={12} xs={12} className="flex flex-wrap items-center justify-center">
                <MailIcon />
            </Grid>
            <Grid item lg={5} md={5} sm={12} xs={12} className="flex flex-wrap items-center justify-center">
                <p>Keyword</p>
            </Grid>
            <Grid item lg={5} md={5} sm={12} xs={12} className="flex flex-wrap items-center justify-center">
                <p><b>Keyword</b></p>
            </Grid>
            <Grid item lg={1} md={1} sm={12} xs={12} className="flex flex-wrap items-center justify-center">
                <Badge badgeContent={4} color="error"></Badge>
            </Grid>
        </Grid>
      </Card>
    );
  }
} 

export default FindItem;
