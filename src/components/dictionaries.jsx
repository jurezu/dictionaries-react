import React, { Component } from "react";
import { getDictionaries } from "../services/fakeDictionaries";
import Dictionary from "./dictionary";
import NewDictModal from "./modals/newDictModal";
import Button from "react-bootstrap/Button";

class Dictionaries extends Component {
  state = { dictionaries: [] };

  componentDidMount() {
    this.loadLocalStorage();
  }
  componentDidUpdate() {
    this.storeLocalStorage();
  }

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

  /* Dictionaries CRUD */
  handleCreateDictionary = dict => {
    this.setState(state => ({
      dictionaries: [dict, ...state.dictionaries]
    }));
  };

  handleDeleteDictionary = dictionary => {
    this.setState(state => ({
      dictionaries: state.dictionaries.filter(d => d._id !== dictionary._id)
    }));
  };

  /* Entries CRUD */
  handleDeleteEntry = (dictionary, entry) => {
    this.setState(
      state => {
        const dictionaries = [...state.dictionaries];
        const index = dictionaries.indexOf(dictionary);
        const entries = dictionaries[index].entries.filter(
          e => e._id !== entry._id
        ); //take all but targeted
        dictionaries[index].entries = entries;
        return { dictionaries };
      },
      () => this.validateDictionary(dictionary, true)
    );
  };

  handleUpdateEntry = (dictionary, entry) => {
    this.setState(
      state => {
        const dictionaries = [...state.dictionaries];
        const index = dictionaries.indexOf(dictionary);
        let entries = [...dictionaries[index].entries];
        const indexOfEntry = entries.findIndex(e => e._id === entry._id);
        entries[indexOfEntry] = entry; //add updated entry in position
        dictionaries[index].entries = entries;
        return { dictionaries };
      },
      () => this.validateDictionary(dictionary, true)
    );
  };
  handleCreateEntry = (dictionary, entry) => {
    this.setState(
      state => {
        const dictionaries = [...state.dictionaries];
        const index = dictionaries.indexOf(dictionary);
        const entries = [...dictionaries[index].entries, entry];
        dictionaries[index].entries = entries;
        return { dictionaries };
      },
      () => this.validateDictionary(dictionary, false)
    );
  };
  handleUpdateEntryErrors = (dictionary, entry) => {
    this.setState(state => {
      const dictionaries = [...this.state.dictionaries];
      const index = dictionaries.indexOf(dictionary);
      let entries = [...dictionaries[index].entries];
      const indexOfEntry = entries.findIndex(e => e._id === entry._id);
      entries[indexOfEntry] = entry;
      dictionaries[index].entries = entries;
      return { dictionaries };
    });
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
    }
    //fork
    if (entry1.domain === entry2.domain && entry1.range !== entry2.range) {
      errors.fork = true;
    }
    //cycle
    if (entry1.domain === entry2.range && entry1.range === entry2.domain) {
      errors.cycle = true;
    }
    //chain
    //watchout for e1 and e2 interchangeability
    if (
      (entry1.range === entry2.domain || entry2.range === entry1.domain) &&
      entry1.domain !== entry2.domain &&
      entry1.range !== entry2.range
    ) {
      errors.chain = true;
    }
    return errors;
  };

  logicalOrObjectsByKey = (...errorObjs) => {
    return errorObjs.reduce((acc, error) => {
      for (let k in error) {
        if (error.hasOwnProperty(k)) acc[k] = acc[k] || false || error[k]; //if there is no error attribute
      }
      return acc;
    }, {});
  };

  validateDictionary = (dictionary, startFromScratch) => {
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

      this.handleUpdateEntryErrors(dictionary, updatedEntry);
    }
  };

  render() {
    const { dictionaries } = this.state;
    return (
      <div>
        <div className="headerActions">
          <NewDictModal onNewDict={this.handleCreateDictionary} />
          <Button
            onClick={this.handleLoadMockData}
            variant="outline-secondary m-2"
          >
            Load Mock Data
          </Button>
        </div>
        {dictionaries.length ? (
          <div>
            {dictionaries.map(dictionary => (
              <Dictionary
                key={dictionary._id}
                dictionary={dictionary}
                onDeleteDictionary={this.handleDeleteDictionary}
                onUpdateEntry={this.handleUpdateEntry}
                onDeleteEntry={this.handleDeleteEntry}
                onCreateEntry={this.handleCreateEntry}
              />
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
