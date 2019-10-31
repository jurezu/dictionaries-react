import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import uuid from "uuid";
class NewEntryModal extends Component {
  state = { show: false, entry: { _id: "", domain: "", range: "" } };
  _form = React.createRef();
  handleCreateEntry = () => {
    this.setState(
      {
        entry: {
          _id: uuid.v1(),
          domain: this._form.current.elements[0].value,
          range: this._form.current.elements[1].value
        }
      },
      () => {
        this.props.onCreateEntry(this.state.entry);
      }
    );
  };
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });
  handleChanges = e => {
    const input = e.target;
    const name = input.name;
    const value = input.value;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <>
        <Button variant="outline-primary btn-sm m-2" onClick={this.handleShow}>
          New Entry
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New Entry</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form ref={this._form}>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  name="domain"
                  type="text"
                  placeholder="Space Grey"
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput2">
                <Form.Label>Range</Form.Label>
                <Form.Control
                  name="range"
                  type="text"
                  placeholder="Darg Grey"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button
              variant="outline-primary"
              onClick={() => {
                this.handleCreateEntry();
                this.handleClose();
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default NewEntryModal;
