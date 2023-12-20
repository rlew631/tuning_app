import React, { useRef, useState } from 'react';
import { HotTable } from '@handsontable/react';

function EditableTable( {tableName, } ) {
  const hotRef = useRef(null);
  const [colHeaders, setColHeaders] = useState(['0', '1', '2']);
  const [rowHeaders, setRowHeaders] = useState([800, 1600, 2000]);
  const [data, setData] = useState([
    [10, 11, 12],
    [20, 11, 14],
    [30, 15, 12]
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
    hotRef.current.hotInstance.refreshDimensions(); // optional?
  };

  const removeColumn = () => {
    if (data[0].length > 1) {
      setColHeaders(colHeaders => colHeaders.slice(0, -1));
      setData(data => data.map(row => row.slice(0, -1)));
      hotRef.current.hotInstance.refreshDimensions(); // optional?
    }
  };

  const addRow = () => {
    setRowHeaders(rowHeaders => [...rowHeaders, rowHeaders.length + 2022]);
    setData(data => [...data, [...data[data.length - 1]]]);
    hotRef.current.hotInstance.refreshDimensions(); // optional?
  };

  const removeRow = () => {
    if (data.length > 1) {
      setRowHeaders(rowHeaders => rowHeaders.slice(0, -1));
      setData(data => data.slice(0, -1));
      hotRef.current.hotInstance.refreshDimensions(); // optional?
    }
  };
  return (
    <div>
      <h2>{tableName}</h2>
      <div className='main-table-container'>
        <div className='data-table-container' style={{"width":`${60+100*colHeaders.length}px`}}>
          <div className='data-table table'>
            <h3>Data</h3>
            <HotTable
              data={data}
              rowHeaders={rowHeaders}
              colHeaders={colHeaders}
              height="auto"
              width="auto"
              rowHeights={23}
              colWidths={100}
              rowHeaderWidth={60}
              licenseKey="non-commercial-and-evaluation"
              ref={hotRef}
            />
          </div>
        </div>
        <div className='table-axes-container'>
          <div className='column-table axis-table table' style={{"width":`${60*colHeaders.length}px`}}>
            <h3>Columns</h3>
            <HotTable
              data={[colHeaders]}
              afterChange={(changes) => {
                if (changes) {
                  handleHeadersChange(changes);
                }
              }}
              height="auto"
              colWidths={60}
              licenseKey="non-commercial-and-evaluation"
            />
            <button onClick={addColumn}>Add</button>
            <button onClick={removeColumn}>Remove</button>
          </div>
          <div className='row-table axis-table table' style={{"width":`${60*rowHeaders.length}px`}}>
            <h3>Rows</h3>
            <HotTable
              data={[rowHeaders]}
              afterChange={(changes) => {
                if (changes) {
                  handleHeadersChange(changes);
                }
              }}
              height="auto"
              colWidths={60}
              licenseKey="non-commercial-and-evaluation"
            />
            <button onClick={addRow}>Add</button>
            <button onClick={removeRow}>Remove</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditableTable