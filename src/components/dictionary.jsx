import React, { Component } from "react";
import NewEntryModal from "./modals/newEntryModal";
import "../dictionary.css";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import DictionaryEntries from "./dictionaryEntries";

class Dictionary extends Component {
  createNewEntry = entry => {
    const { onCreateEntry, dictionary } = this.props;
    onCreateEntry(dictionary, entry);
  };

  updateEntry = entry => {
    const { onUpdateEntry, dictionary } = this.props;
    onUpdateEntry(dictionary, entry);
  };

  deleteEntry = entry => {
    const { onDeleteEntry, dictionary } = this.props;
    onDeleteEntry(dictionary, entry);
  };

  deleteDictionary = () => {
    const { onDeleteDictionary, dictionary } = this.props;
    onDeleteDictionary(dictionary);
  };

  render() {
    const { dictionary } = this.props;

    return (
      <Jumbotron>
        <div className="dictionaryHeader">
          <h4>{dictionary.title}</h4>
          <Button
            onClick={this.deleteDictionary}
            variant="outline-danger btn-sm float-right "
          >
            Delete
          </Button>
        </div>
        {dictionary.entries ? (
          <DictionaryEntries
            entries={dictionary.entries}
            onUpdateEntry={this.updateEntry}
            onDeleteEntry={this.deleteEntry}
          />
        ) : null}
        <NewEntryModal onCreateEntry={this.createNewEntry} />
      </Jumbotron>
    );
  }
}
export default Dictionary;
