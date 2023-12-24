import './App.css';
import React, { useState }from 'react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';
import EditableTable from './components/EditableTable';
// import { ExampleComponent } from './components/DemoTable';

registerAllModules();

function customStringify(object) {
  if (Array.isArray(object)) {
      // Join the array values with comma and space for inline display.
      return `[${object.map(item => customStringify(item)).join(", ")}]`;
  } else if (typeof object === 'object' && object !== null) {
      // Create an array of stringified key-value pairs.
      const properties = Object.keys(object).map(key => {
          const value = customStringify(object[key]);
          return `"${key}": ${value}`;
      });
      // Join the properties with a comma and newline for each key/value pair.
      return `{\n\t${properties.join(",\n\t")}\n}`;
  } else {
      // Directly return the stringified version of the value.
      return JSON.stringify(object);
  }
}

function FormattedJsonDisplay({ data }) {
  return (
      <pre style={{"text-align" : "left"}}>
          <code>
              {customStringify(data)}
          </code>
      </pre>
  );
}

function App() {
  const [tables, setTables] = useState([]);
  const [newTableName, setNewTableName] = useState('');
  const [removeTableName, setRemoveTableName] = useState('');

  const addTable = () => {
    if (newTableName) {
      // const newTable = <EditableTable key={newTableName} tableName={newTableName} />;
      const newTable = {
        key: newTableName,
        colHeaders: ['0','1','2'],
        rowHeaders: [800,1200,1600],
        data: [
          [10, 11, 12],
          [20, 11, 14],
          [30, 15, 12]
        ]
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
                // console.log(updatedTables);
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
