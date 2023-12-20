import './App.css';
import React from 'react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';
import EditableTable from './components/EditableTable';
// import { ExampleComponent } from './components/DemoTable';

registerAllModules();


function App() {
  return (
    <div className="App">
      {/* <ExampleComponent/> */}
      <EditableTable tableName="Table 1"/>
      <EditableTable tableName="Table 2"/>
    </div>
  );
}

export default App;
