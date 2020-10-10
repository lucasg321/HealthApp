import React, { Component } from "react";
import { Table } from "reactstrap";
import NewFoodModal from "./NewFoodModal";
import AddFoodModal from "./AddFoodModal";

import ConfirmRemovalModal from "./ConfirmRemovalModal";

class FoodList extends Component {
  render() {
    const food = this.props.food;
    let total = 0;
      var MyDate = new Date();
      var MyDateString;
      MyDateString = MyDate.getFullYear() + '-' + ('0' + (MyDate.getMonth()+1)).slice(-2) + '-' +
          ('0' + MyDate.getDate()).slice(-2);
    return (
      <table class="table table-hover">
        <thead class="thead-light">
          <tr>
            <th>Food</th>
            <th>Calories</th>
            <th>Date Entered</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!food || food.length <= 0 ? (
             <tr>
              <td colSpan="6" align="center">
                <b>No entries for today</b>
              </td>
            </tr>
          ) : (
            food.map(food => (
                food.registrationDate == MyDateString ? (
                    total = total + food.calories,
              <tr key={food.pk}>
                <td>{food.name}</td>
                <td>{food.calories}</td>
                <td>{food.registrationDate}</td>
                <td align="center">
                  <NewFoodModal
                    create={false}
                    food={food}
                    resetState={this.props.resetState}
                  />
                  &nbsp;&nbsp;
                  <ConfirmRemovalModal
                    pk={food.pk}
                    resetState={this.props.resetState}
                  />
                </td>
              </tr>
                ) : (
                null
                )

            ))
          )} </tbody>
          <tr>
              <th style={{paddingBottom: "10%"}}>Total Calories</th>
              <th style={{paddingBottom: "10%"}}>{total}</th>
              <th style={{paddingBottom: "10%"}}></th>
              <th style={{paddingBottom: "10%"}}></th>
          </tr>
          <tr><th></th>
              <th></th>
              <th>Previously Input Food</th>
              <th></th></tr>
          {food.map(food => (
                food.registrationDate != MyDateString ? (
              <tr key={food.pk}>
                <td>{food.name}</td>
                <td>{food.calories}</td>
                <td>{food.registrationDate}</td>
                <td align="center">
                  <AddFoodModal
                    create={true}
                    food={food}
                    resetState={this.props.resetState}
                  />
                  &nbsp;&nbsp;
                  <ConfirmRemovalModal
                    pk={food.pk}
                    resetState={this.props.resetState}
                  />
                </td>
              </tr>
                ) : (
                null
                )
            ))}
      </table>
        //try splitting above table into individual modules
        //add another table with recently inputted food
    );
  }
}

export default FoodList;