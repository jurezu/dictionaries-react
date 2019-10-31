import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import uuid from "uuid";
class NewDictModal extends Component {
  state = { show: false, dict: { _id: "", title: "" } };
  _form = React.createRef();
  handleCreateDict = () => {
    this.setState(
      {
        dict: {
          _id: uuid.v1(),
          title: this._form.current.elements[0].value,
          entries: []
        }
      },
      () => {
        this.props.onNewDict(this.state.dict);
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
        <Button variant="outline-primary m-2" onClick={this.handleShow}>
          New Dictionary
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New Dictionary</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form ref={this._form}>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  name="title"
                  type="text"
                  placeholder="Dictionary number 5"
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
                this.handleCreateDict();
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

export default NewDictModal;
