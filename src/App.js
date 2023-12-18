import './App.css';
import React, { useState } from 'react';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';

registerAllModules();


function App() {
  const [colHeaders, setColHeaders] = useState(['Tesla', 'Volvo', 'Toyota', 'Ford']);
  const [rowHeaders, setRowHeaders] = useState([2019, 2020, 2021]);
  const [data, setData] = useState([
    [10, 11, 12, 13],
    [20, 11, 14, 13],
    [30, 15, 12, 13]
  ]);

  // Handle changes in headers
  const handleHeadersChange = (changes) => {
    setColHeaders(colHeaders => {
      let newHeaders = [...colHeaders];
      newHeaders[changes[1]] = changes[3];
      return newHeaders;
    });
  };

  const addColumn = () => {
    setColHeaders(colHeaders => [...colHeaders, `NewCol${colHeaders.length + 1}`]);
    setData(data => data.map(row => [...row, row[row.length - 1]]));
  };

  const removeColumn = () => {
    if (data[0].length > 1) {
      setColHeaders(colHeaders => colHeaders.slice(0, -1));
      setData(data => data.map(row => row.slice(0, -1)));
    }
  };

  const addRow = () => {
    setRowHeaders(rowHeaders => [...rowHeaders, rowHeaders.length + 2022]);
    setData(data => [...data, [...data[data.length - 1]]]);
  };

  const removeRow = () => {
    if (data.length > 1) {
      setRowHeaders(rowHeaders => rowHeaders.slice(0, -1));
      setData(data => data.slice(0, -1));
    }
  };

  return (
    <div className="App">
      <div className='column-table table'>
        <h2>Columns</h2>
        <HotTable
          data={[colHeaders]}
          afterChange={(changes) => {
            if (changes) {
              handleHeadersChange(changes);
            }
          }}
          height="auto"
          licenseKey="non-commercial-and-evaluation"
        />
        <button onClick={addColumn}>Add Column</button>
        <button onClick={removeColumn}>Remove Column</button>
      </div>
      <div className='row-table table'>
        <h2>Rows</h2>
        <HotTable
          data={[rowHeaders]}
          afterChange={(changes) => {
            if (changes) {
              handleHeadersChange(changes);
            }
          }}
          height="auto"
          licenseKey="non-commercial-and-evaluation"
        />
        <button onClick={addRow}>Add Row</button>
        <button onClick={removeRow}>Remove Row</button>
      </div>
      <div className='main-table table'>
        <h2>Data</h2>
        <HotTable
          data={data}
          rowHeaders={rowHeaders}
          colHeaders={colHeaders}
          height="auto"
          licenseKey="non-commercial-and-evaluation" // for non-commercial use only
        />
      </div>
    </div>
  );
}

export default App;
