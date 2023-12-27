import './App.css';
import React, { useState }from 'react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';
import EditableTable from './components/EditableTable';
import FormattedJsonDisplay from './utils/textdisplay'
// import { ExampleComponent } from './components/DemoTable';

registerAllModules();

function App() {
  // Add dark mode
  // should have option to show new table to the right where you can:
  // - custom define row and col intervals
  // - switch from AFR to lammbda and vice versa
  // should have a toggle button to show plotly 3d scatter plot: https://plotly.com/javascript/3d-scatter-plots/
  // for testing plotly chart should show both tables' data on it to make sure nothing is fubar
  const [tables, setTables] = useState([]);
  const [newTableName, setNewTableName] = useState('');
  const [removeTableName, setRemoveTableName] = useState('');

  const addTable = () => {
    if (newTableName) {
      const newTable = {
        key: newTableName,
        colHeaders: ['0','1','2'],
        rowHeaders: [800,1200,1600],
        data: [
          [10, 11, 12],
          [20, 11, 14],
          [30, 15, 12]
        ],
        fuelType: 'AFR (gas)'
      }
      setTables([...tables, newTable])
      setNewTableName('');
      setRemoveTableName(newTable.key);
    }
  };

  const removeTable = tableNameToRemove => {
    const newTableList = tables.filter(table => table.key !== tableNameToRemove)
    setTables(newTableList);
    if (newTableList.length > 0) {
      setRemoveTableName(newTableList[0].key);
    } else {
      setRemoveTableName('');
    }
  };

  return (
    <div className="App">
      <h1>Tuning App</h1>
      <div>
        <div>
          <input
            type="text"
            value={newTableName}
            onChange={(e) => setNewTableName(e.target.value)}
            placeholder="Table name"
          />
          <button onClick={addTable}>Add Table</button>
        </div>
        <br/>
        <div>
          <select 
            value={removeTableName}
            onChange={(e) => setRemoveTableName(e.target.value)}
          >
            {tables.map(table => (
              <option key={table.key} value={table.key}>{table.key}</option>
            ))}
          </select>
          <button onClick={() => removeTable(removeTableName)}>Remove Table</button>
        </div>
      </div>
      <div>
        {tables.map(table => (
          <div key={table.key}>
            <EditableTable
              tableName={table.key}
              tableInfo={table}
              updateTable={(updatedTable) => {
                const updatedTables = tables.map(t => 
                  t.key === updatedTable.key ? updatedTable : t
                );
                setTables(updatedTables);
              }}
            />
          </div>
        ))}
      </div>
      <div>
        {tables.map(table => (
          <div key={table.key}>
            <FormattedJsonDisplay data={table}/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
