import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import DictionaryEntry from "./dictionaryEntry";

class DictionaryEntries extends Component {
  state = {};

  render() {
    const { onUpdateEntry, onDeleteEntry, entries } = this.props;
    return (
      <Table hover borderless>
        <thead>
          <tr>
            <th>Domain</th>
            <th>Range</th>
            <th>Validation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(entry => (
            <DictionaryEntry
              key={entry._id}
              entry={entry}
              onDeleteEntry={onDeleteEntry}
              onUpdateEntry={onUpdateEntry}
            />
          ))}
        </tbody>
      </Table>
    );
  }
}

export default DictionaryEntries;
