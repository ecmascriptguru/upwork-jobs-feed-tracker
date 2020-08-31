import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { 
  TextField, 
  Button, 
  Divider, 
  Card, 
  Typography,
  IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core';
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import Header from '../../components/Layout/Header/Header';
import { Route } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import Badge from '@material-ui/core/Badge';
import { sGetJobs } from '../../store/reducers/jobs';
import { acJobsSet } from '../../store/actions/jobs';
import apiCallService from "../../api/apiCallService";

class FindItem extends Component {

  constructor(props) {
    super(props);
    this.localStorageUpdated = this.localStorageUpdated.bind(this);
  }
  
  componentDidMount() {
    console.log("jobs from FindItem: " + this.props.jobs);
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', this.localStorageUpdated)
    }
  }

  componentWillUnmount(){
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', this.localStorageUpdated)
    }
  }

  onClickCard = (event) => {
    event.preventDefault();
    if(event.target === event.currentTarget) {
      console.log("CardClicked");
      this.props.displayJobs(this.props.keywordItem.keyword);
    }
  }

  onClickDelete = (event) => {
      event.preventDefault();
      console.log(event.target);
      console.log(event.currentTarget);
      this.props.deleteKeyword(this.props.keywordItem.id);
  }

  localStorageUpdated = async () => {
    console.log("storaged changed");
    let jobs = await apiCallService.getJob();
    if(jobs) {
      await this.props.acJobsSet(jobs);
    }
  }

  render() {
    
    return (
      <Card className="p-lg-20" elevation={4} style={{background: "#222222", height: "60px"}} onClick={this.onClickCard} className="flex flex-wrap items-center justify-center">
        <Grid container>
            <Grid item lg={1} md={1} sm={1} xs={1} className="flex flex-wrap items-center justify-center" onClick={this.onClickCard}>
              <IconButton 
                className="capitalize w-full" 
                variant="outlined" 
                style={{color: '#09DF6B', 'font-size': '15px'}}
                onClick={this.onClickDelete}>
                <DeleteIcon/>
              </IconButton>
            </Grid>
            <Grid item lg={5} md={5} sm={5} xs={5} className="flex flex-wrap items-center justify-center" onClick={this.onClickCard} style={{color: 'white'}}>
                <Typography variant="h5" onClick={this.onClickCard}>Keyword</Typography>
            </Grid>
            <Grid item lg={5} md={5} sm={5} xs={5} className="flex flex-wrap items-center justify-center" onClick={this.onClickCard} style={{color: 'white'}}>
                <Typography variant="h5" onClick={this.onClickCard}><b>{this.props.keywordItem.keyword}</b></Typography>
            </Grid>
            <Grid item lg={1} md={1} sm={1} xs={1} className="flex flex-wrap items-center justify-center" onClick={this.onClickCard} style={{color: '#09DF6B'}}>
                { this.props.jobs ? 
                  <Badge badgeContent={this.props.jobs.filter(job => {
                          const keyword = this.props.keywordItem.keyword;
                          if (job.keyword === keyword) {
                            return true
                          }
                          return false
                        }).length} 
                        color="secondary" onClick={this.onClickCard}></Badge> : ''
                }
            </Grid>
        </Grid>
      </Card>
    );
  }
} 

const mapStateToProps = state => ({
  jobs: sGetJobs(state),
});
export default connect(mapStateToProps, {acJobsSet})(FindItem);
