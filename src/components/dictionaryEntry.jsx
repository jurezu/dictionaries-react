import React, { Component } from "react";
import UpdateEntryModal from "./modals/updateEntry";
import Button from "react-bootstrap/Button";

class DictionaryEntry extends Component {
  state = {};

  renderValidation = entry => {
    if (entry.errors === undefined) {
      return <div className="valid">valid</div>;
    }
    if (Object.values(entry.errors).every(e => e === false)) {
      return <div className="valid">valid</div>;
    }
    //if there are errors
    return Object.entries(entry.errors).map(
      ([key, value]) =>
        value && (
          <div className={key} key={key}>
            {key}
          </div>
        )
    );
  };

  deleteEntry = () => {
    const { onDeleteEntry, entry } = this.props;
    return onDeleteEntry(entry);
  };

  updateEntry = entry => {
    const { onUpdateEntry } = this.props;
    onUpdateEntry(entry);
  };

  render() {
    const { entry } = this.props;

    return (
      <tr>
        <td>{entry.domain}</td>
        <td>{entry.range}</td>
        <td>{this.renderValidation(entry)}</td>
        <td>
          <Button
            onClick={this.deleteEntry}
            variant="outline-danger btn-sm m-2"
          >
            Delete
          </Button>
          <UpdateEntryModal onUpdateEntry={this.updateEntry} entry={entry} />
        </td>
      </tr>
    );
  }
}

export default DictionaryEntry;
