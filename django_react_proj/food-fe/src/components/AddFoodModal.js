import React, { Component, Fragment, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import NewFoodForm from "./NewFoodForm";

class AddFoodModal extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };

  render() {
    const create = this.props.create;

    var title = "Edit Food";
    var button = <Button onClick={this.toggle}>Edit</Button>;
    if (create) {
      title = "Enter New Food";

      button = (
        <Button
          color="success"
          className=""
          onClick={this.toggle}
          style={{ minWidth: "40px" }}
        >
          +
        </Button>
      );
    }

    return (
      <Fragment>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>

          <ModalBody>
            <NewFoodForm
              resetState={this.props.resetState}
              toggle={this.toggle}
              food={this.props.food}
            />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default AddFoodModal;