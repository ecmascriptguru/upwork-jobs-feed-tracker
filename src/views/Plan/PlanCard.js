import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { 
  Button, 
  Card, 
  Typography } from '@material-ui/core';

class PlanCard extends Component {

    addPayment = () => {
        if(this.props.currentPlan) {
            if(this.props.currentPlan.id == this.props.plan.id) {
                return;
            }
        }
        let link = "http://workalert.mind2matter.co/subscribe/" + this.props.plan.paypal_plan_id + "/paypal";
        window.open(link);
    }
  
    render() {
        return (
        <Button onClick={this.addPayment}>
            <Card className="p-sm-24" elevation={6} 
            style={this.props.currentPlan ? 
            ( this.props.currentPlan.id == this.props.plan.id ? { background: "#09DF6B" } : {background: "#222222"}) 
            : {background: "#222222"}}>
                <Grid item lg={12} md={12} sm={12} xs={12} className="flex flex-wrap items-center justify-center ">
                    <p style={this.props.currentPlan ? 
            ( this.props.currentPlan.id == this.props.plan.id ? { color: 'black'} : null) 
            : null}>{this.props.plan.name}</p>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12} className="flex flex-wrap items-center justify-center ">
                    <p style={this.props.currentPlan ? 
            ( this.props.currentPlan.id == this.props.plan.id ? { color: 'black', 'font-size': '21px'} : { 'font-size': '21px'}) 
            : { 'font-size': '21px'}}>${this.props.plan.amount} / Mo</p>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12} className="flex flex-wrap items-center justify-center ">
                    <p style={this.props.currentPlan ? 
            ( this.props.currentPlan.id == this.props.plan.id ? { color: 'black'} : null) 
            : null}>{this.props.plan.keyword_limit} Keyword</p>
                </Grid>
            </Card>
        </Button>
    );
  }
} 

export default PlanCard;
