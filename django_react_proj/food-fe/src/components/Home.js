import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import FoodList from "./FoodList";
import NewFoodModal from "./NewFoodModal";

import axios from "axios";

import { API_URL } from "../constants";

class Home extends Component {
  state = {
    food: []
  };

  componentDidMount() {
    this.resetState();
  }

  getFood = () => {
    axios.get(API_URL).then(res => this.setState({ food: res.data }));
  };

  resetState = () => {
    this.getFood();
  };

  render() {
    return (
      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col style={{ marginBottom: "1%" }}>
            <NewFoodModal create={true} resetState={this.resetState} />
          </Col>
        </Row>
        <Row>
          <Col>
            <FoodList
              food={this.state.food}
              resetState={this.resetState}
            />
          </Col>
        </Row>

      </Container>
    );
  }
}

export default Home;