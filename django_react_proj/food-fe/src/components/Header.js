import React, { Component } from "react";

class Header extends Component {
  render() {
      const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
      var month = new Date().getMonth();
      var day = new Date().getDate();
      var year = new Date().getFullYear();

  return (
      <div className="text-center">
        <img
          src="https://seeklogo.com/images/H/healthy-eating-fork-and-knife-logo-0A8E8412A9-seeklogo.com.png"
          width="300"
          // className="img-thumbnail"
          style={{ marginTop: "20px" }}
        />
        <hr />
        <h5>
          <i></i>
        </h5>
        <h1 style={{ marginBottom: "40px" }}>Food Eaten on {monthNames[month]} {day}, {year}</h1>
      </div>
    );
  }
}

export default Header;