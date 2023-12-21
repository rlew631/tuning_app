import './App.css';
import React, { useState }from 'react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';
import EditableTable from './components/EditableTable';
// import { ExampleComponent } from './components/DemoTable';

registerAllModules();


function App() {
  const [tables, setTables] = useState([]);
  const [newTableName, setNewTableName] = useState('');
  const [removeTableName, setRemoveTableName] = useState('');

  const addTable = () => {
    if (newTableName) {
      const newTable = <EditableTable key={newTableName} tableName={newTableName} />;
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
      {tables.map(table => (
        <div key={table.key}>
          {table}
        </div>
      ))}
    </div>
  );
}

export default App;
