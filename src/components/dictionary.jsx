import React, { Component } from "react";
import NewEntryModal from "./modals/newEntryModal";
import UpdateEntryModal from "./modals/updateEntry";
import "../dictionary.css";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import DictionaryTable from "./dictionaryTable";
class Dictionary extends Component {
  renderValidation = entry => {
    if (entry.errors === undefined) {
      return <div className="valid">valid</div>;
    }
    if (Object.values(entry.errors).every(e => e === false))
      return <div className="valid">valid</div>;
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

  createNewEntry = entry => {
    this.props.onCreateEntry(this.props.dictionary, entry);
  };

  render() {
    const {
      onDeleteEntry,
      onUpdateEntry,
      dictionary,
      onDeleteDictionary
    } = this.props;

    return (
      <React.Fragment>
        <div>
          <h4>{dictionary.title}</h4>
          <Button
            onClick={() => onDeleteDictionary(dictionary)}
            variant="outline-danger btn-sm float-right "
          >
            Delete
          </Button>
        </div>
        {dictionary.entries ? (
          <Table bordered hover>
            <thead>
              <tr>
                <th>Domain</th>
                <th>Range</th>
                <th>Actions</th>
                <th>Validation</th>
              </tr>
            </thead>
            <tbody>
              {dictionary.entries.map(entry => (
                <tr key={entry._id}>
                  <td>{entry.domain}</td>
                  <td>{entry.range}</td>
                  <td>
                    <Button
                      onClick={() => onDeleteEntry(entry)}
                      variant="outline-danger btn-sm"
                    >
                      Delete
                    </Button>
                    <UpdateEntryModal
                      onUpdateEntry={entry =>
                        onUpdateEntry(this.props.dictionary, entry)
                      }
                      entry={entry}
                    />
                  </td>
                  <td>{this.renderValidation(entry)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : null}
        <NewEntryModal onCreateEntry={this.createNewEntry} />
      </React.Fragment>
    );
  }
}

export default Dictionary;
