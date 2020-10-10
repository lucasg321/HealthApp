import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants";

class NewFoodForm extends React.Component {
  state = {
    pk: 0,
    name: "",
    calories: "",
    registrationDate: ""
  };

  componentDidMount() {
    if (this.props.food) {
      const { pk, name, calories, registrationDate } = this.props.food;
      this.setState({ pk, name, calories, registrationDate });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createFood = e => {
    e.preventDefault();
    axios.post(API_URL, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  editFood = e => {
    e.preventDefault();
    axios.put(API_URL + this.state.pk, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  render() {
    return (
      <Form onSubmit={this.props.food ? this.editFood : this.createFood}>
        <FormGroup>
          <Label for="name">Name:</Label>
          <Input
            type="text"
            name="name"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.name)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="calories">Calories:</Label>
          <Input
            type="text"
            name="calories"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.calories)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="registrationDate">Date:</Label>
          <Input
            type="date"
            name="registrationDate"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.registrationDate)}
          />
        </FormGroup>
        <Button color="success">Confirm</Button>
      </Form>
    );
  }
}

export default NewFoodForm;