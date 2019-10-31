import React, { Component } from "react";
import { getDictionaries } from "../services/fakeDictionaries";
import Dictionary from "./dictionary";
import NewDictModal from "./modals/newDictModal";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";

class Dictionaries extends Component {
  state = { dictionaries: [] };

  handleLoadMockData = () => {
    this.setState({ dictionaries: getDictionaries() });
  };
  loadLocalStorage = () => {
    const dictionaries =
      JSON.parse(localStorage.getItem("DictionariesInStorage")) || {};
    this.setState({ dictionaries });
  };

  storeLocalStorage = () => {
    localStorage.setItem(
      "DictionariesInStorage",
      JSON.stringify(this.state.dictionaries)
    );
  };
  componentDidMount() {
    this.loadLocalStorage();
  }
  componentDidUpdate() {
    console.log("Storing to local storage.");
    this.storeLocalStorage();
  }

  /* Dictionaries CRUD */
  handleCreateDictionary = dict => {
    const dictionaries = [dict, ...this.state.dictionaries];
    this.setState({ dictionaries });
  };

  handleDeleteDictionary = dictionary => {
    //console.log("Deleting dictionary " + dictionary.title);
    const dictionaries = this.state.dictionaries.filter(
      d => d._id !== dictionary._id
    );
    this.setState({ dictionaries });
  };

  /* Entries CRUD */
  handleDeleteEntry = (dictionary, entry) => {
    //console.log("Deleting " + entry.domain);
    const dictionaries = [...this.state.dictionaries]; //copy all
    const index = dictionaries.indexOf(dictionary); //get index
    const entries = dictionaries[index].entries.filter(
      e => e._id !== entry._id
    ); //take all but targeted
    //TODO update errors in dict
    dictionaries[index].entries = entries; //save to dictionary
    this.setState({ dictionaries }, () =>
      this.validateDictionary(dictionary, true)
    ); //save changes
  };
  handleUpdateEntry = (dictionary, entry) => {
    //console.log("Update entry" + entry);
    const dictionaries = [...this.state.dictionaries]; //copy all
    const index = dictionaries.indexOf(dictionary); //get index
    let entries = [...dictionaries[index].entries]; //get entries
    //TODO update errors in dict
    const indexOfEntry = entries.findIndex(e => e._id === entry._id); //get the position of old entry
    entries[indexOfEntry] = entry; //add updated entry in position
    dictionaries[index].entries = entries; //save to dictionary
    this.setState({ dictionaries }, () =>
      this.validateDictionary(dictionary, true)
    ); //save changes
  };
  handleCreateEntry = (dictionary, entry) => {
    //console.log("Create new entry: " + entry);
    const dictionaries = [...this.state.dictionaries]; //copy all
    const index = dictionaries.indexOf(dictionary); //get index
    const entries = [...dictionaries[index].entries, entry]; //take all but targeted
    //TODO update errors in dict
    dictionaries[index].entries = entries; //save to dictionary
    this.setState({ dictionaries }, () =>
      this.validateDictionary(dictionary, false)
    ); //save changes
  };
  handleUpdateEntryErrors = (dictionary, entry) => {
    const dictionaries = [...this.state.dictionaries]; //copy all
    const index = dictionaries.indexOf(dictionary); //get index
    let entries = [...dictionaries[index].entries]; //get entries
    const indexOfEntry = entries.findIndex(e => e._id === entry._id); //get the position of old entry
    entries[indexOfEntry] = entry; //add updated entry in position
    dictionaries[index].entries = entries; //save to dictionary
    this.setState({ dictionaries }); //save changes
  };
  checkInconsistencies = (entry1, entry2) => {
    let errors = {
      duplicate: false,
      fork: false,
      cycle: false,
      chain: false
    };
    //duplicates
    if (entry1.domain === entry2.domain && entry1.range === entry2.range) {
      errors.duplicate = true;
      //console.log("got duplicate");
    }
    //fork
    if (entry1.domain === entry2.domain && entry1.range !== entry2.range) {
      errors.fork = true;
      //console.log("got fork");
    }
    //cycle
    if (entry1.domain === entry2.range && entry1.range === entry2.domain) {
      errors.cycle = true;
      //console.log("got cycle");
    }
    //chain
    //watchout for e1 and e2 interchangeability
    if (
      (entry1.range === entry2.domain || entry2.range === entry1.domain) &&
      entry1.domain !== entry2.domain &&
      entry1.range !== entry2.range
    ) {
      errors.chain = true;
      //console.log("got chain");
    }
    return errors;
  };

  logicalOrObjectsByKey = (...objs) => {
    return objs.reduce((a, b) => {
      for (let k in b) {
        if (b.hasOwnProperty(k)) a[k] = a[k] || false || b[k]; //if there is no error attribute TODO
      }
      return a;
    }, {});
  };
  validateDictionary = (dictionary, startFromScratch) => {
    //console.log("validating dict" + dictionary);
    //console.log("Start from scratch: " + startFromScratch);
    let cumulatedErrors, newErrors;
    let updatedEntry;
    const errors = {
      duplicate: false,
      fork: false,
      cycle: false,
      chain: false
    };
    if (startFromScratch) {
      dictionary.entries.map(e => (e.errors = errors));
    }
    for (let index1 = 0; index1 < dictionary.entries.length; index1++) {
      let entry1 = dictionary.entries[index1];
      cumulatedErrors = entry1.errors;
      for (let index2 = 0; index2 < dictionary.entries.length; index2++) {
        let entry2 = dictionary.entries[index2];
        if (entry1._id === entry2._id) {
          //skip self checking
          continue;
        }

        newErrors = this.checkInconsistencies(entry1, entry2);
        cumulatedErrors = this.logicalOrObjectsByKey(
          cumulatedErrors,
          newErrors
        );
      }
      updatedEntry = { ...entry1 };
      updatedEntry.errors = cumulatedErrors;
      //if (cumulatedErrors !== undefined) {
      //console.log(cumulatedErrors);
      //}

      this.handleUpdateEntryErrors(dictionary, updatedEntry);
    }
  };

  render() {
    return (
      <div>
        <NewDictModal
          onNewDict={dict => {
            this.handleCreateDictionary(dict); //todo slozi u funkciju gore i pozovi this...
          }}
        />
        <Button
          onClick={this.handleLoadMockData}
          variant="outline-secondary m-2"
        >
          Load Mock Data
        </Button>
        {this.state.dictionaries.length ? (
          <div>
            {this.state.dictionaries.map(dictionary => (
              <Jumbotron key={dictionary._id}>
                <Dictionary
                  onDeleteDictionary={dictionary =>
                    this.handleDeleteDictionary(dictionary)
                  }
                  dictionary={dictionary}
                  onUpdateEntry={this.handleUpdateEntry}
                  onDeleteEntry={entry =>
                    this.handleDeleteEntry(dictionary, entry)
                  }
                  onCreateEntry={this.handleCreateEntry}
                />
              </Jumbotron>
            ))}
          </div>
        ) : (
          <h2 className="jumbotron">There are no dictionaries.</h2>
        )}
      </div>
    );
  }
}

export default Dictionaries;
