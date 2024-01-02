import React, { useRef, useState } from 'react';
import { HotTable } from '@handsontable/react';
import ScatterPlot from './Plot';

function EditableTable( {tableName, tableInfo, updateTable} ) {
  // add some smart functionality for fuel type that can:
  // - be passed to the plotting function
  // - provide error feedback if values appear fucky
  
  const hotRef = useRef(null);
  const [enableEdit, setEnableEdit] = useState(true)
  const [showPlot, setShowPlot] = useState(false)
  const [fuelType, setFuelType] = useState('gas')
  const [colHeaders, setColHeaders] = useState(['0', '1', '2']);
  const [rowHeaders, setRowHeaders] = useState([800, 1600, 2000]);
  const [data, setData] = useState([
    [10, 11, 12],
    [20, 11, 14],
    [30, 15, 12]
  ]);

  const handleFuelTypeChange = (newVal) => {
    const updatedTableInfo = {
      ...tableInfo,
    };
    updatedTableInfo.fuelType = newVal
    setFuelType(newVal)
    updateTable(updatedTableInfo)
  }

  const handleColHeadersChange = (changes) => {
    const updatedTableInfo = {
      ...tableInfo,
    };
    updatedTableInfo.colHeaders[changes[1]] = changes[3]
    setColHeaders(updatedTableInfo.colHeaders)
    updateTable(updatedTableInfo)
  };

  const handleRowHeadersChange = (changes) => {
    const updatedTableInfo = {
      ...tableInfo,
    };
    updatedTableInfo.rowHeaders[changes[1]] = changes[3]
    setRowHeaders(updatedTableInfo.rowHeaders)
    updateTable(updatedTableInfo)
  };

  const handleDataChange = (changes) => {
    const updatedTableInfo = {
      ...tableInfo
    };
    updatedTableInfo.data[changes[0][changes[1]]] = changes[3]
    setData(updatedTableInfo.data)
    updateTable(updatedTableInfo)
  }

  const addColumn = () => {
    const updatedTableInfo = {
      ...tableInfo,
      colHeaders: [...colHeaders, `NewCol${colHeaders.length + 1}`],
      data: data.map(row => [...row, row[row.length - 1]])
    };
    setColHeaders(updatedTableInfo.colHeaders);
    setData(updatedTableInfo.data);
    updateTable(updatedTableInfo);
  };

  const removeColumn = () => {
    if (data[0].length > 1) {
      const updatedTableInfo = {
        ...tableInfo,
        colHeaders: colHeaders.slice(0, -1),
        data: data.map(row => row.slice(0, -1))
      };
      setColHeaders(updatedTableInfo.colHeaders);
      setData(updatedTableInfo.data);
      updateTable(updatedTableInfo);
    }
  };

  const addRow = () => {
    const updatedTableInfo = {
      ...tableInfo,
      rowHeaders: [...rowHeaders, 1200 + 400*rowHeaders.length],
      data: [...data, [...data[data.length - 1]]]
    };
    setRowHeaders(updatedTableInfo.rowHeaders);
    setData(updatedTableInfo.data);
    updateTable(updatedTableInfo);
  };

  const removeRow = () => {
    if (data.length > 1) {
      const updatedTableInfo = {
        ...tableInfo,
        rowHeaders: rowHeaders.slice(0, -1),
        data: data.slice(0, -1)
      };
      setRowHeaders(updatedTableInfo.rowHeaders);
      setData(updatedTableInfo.data);
      updateTable(updatedTableInfo);
    }
  };
  return (
    <div>
      <h2>{tableName}</h2>
      <div className='main-table-container'>
        <div className='data-table-container' style={{"width":`${60+100*colHeaders.length}px`}}>
          <div className='data-table table'>
            <h3>Fuel Scaling: {fuelType}</h3>
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
              afterChange={(changes)=> {
                if (changes) {
                  handleDataChange(changes)
                }
              }}
            />
          </div>
        </div>

        { (!enableEdit && !showPlot) &&
          <div>
            <button onClick={() => setEnableEdit(true)}>Edit</button>
            <br/>
            <button onClick={() => {setShowPlot(true)}}>
              Show Graph
            </button>
            <br/>
            <button>MOVE THE "Remove Table" button here instead of having the dropdown!!</button>
          </div>
        }

        { enableEdit &&
          <div className='table-axes-container edit-section'>
            <div>
              <button onClick={() => setEnableEdit(false)}>Done Editing</button>
            </div>
            <div>
              <b>Units: </b>
              <select
                value={fuelType}
                onChange={(e) => handleFuelTypeChange(e.target.value)}
              >
                <option value='gas'>AFR (gas)</option>
                <option value='e85'>AFR (e85)</option>
                <option value='lambda'>Lambda</option>
              </select>
            </div>
            <div className='column-table axis-table table' style={{"width":`${60*colHeaders.length}px`}}>
              <h3>Columns</h3>
              <HotTable
                data={[colHeaders]}
                afterChange={(changes) => {
                  if (changes) {
                    handleColHeadersChange(changes);
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
                    handleRowHeadersChange(changes);
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
        }

        {showPlot && 
          <div>
            <button onClick={() => setShowPlot(false)}>Hide Graph</button>
            <ScatterPlot tableInfo={tableInfo}/>
          </div> 
        }
        </div>
    </div>
  )
}

export default EditableTable