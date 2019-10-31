import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
class UpdateEntryModal extends Component {
  state = { show: false, entry: this.props.entry };
  _form = React.createRef();
  handleUpdateEntry = () => {
    const entry = { ...this.state.entry };
    entry.domain = this._form.current.elements[0].value;
    entry.range = this._form.current.elements[1].value;
    this.setState({ entry }, () => {
      this.props.onUpdateEntry(this.state.entry);
    });
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
        <Button
          variant="outline-secondary btn-sm m-2"
          onClick={this.handleShow}
        >
          Update
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Entry</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form ref={this._form}>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  name="domain"
                  type="text"
                  defaultValue={this.state.entry.domain}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput2">
                <Form.Label>Range</Form.Label>
                <Form.Control
                  name="range"
                  type="text"
                  defaultValue={this.state.entry.range}
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
                this.handleUpdateEntry();
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

export default UpdateEntryModal;
