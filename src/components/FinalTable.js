import React, { useRef, useState } from 'react';
import { HotTable } from '@handsontable/react';
import ScatterPlot from './Plot';

function FinalTable( {tables} ) {
  const [showPlot, setShowPlot] = useState(false)

  let data = tables[0].data
  let rowHeaders = tables[0].rowHeaders
  let colHeaders = tables[0].colHeaders

  if (tables.length > 1) {
    for (let i = 0; i < tables.length; i++)
      for (let x = 0; x < tables[0].rowHeaders.length; x++) {
        for (let y = 0; y < tables[0].colHeaders.length; y++) {
          // put in logic to add the data to the var above
        }
        // put in logic to add the rowheaders to the var above
      }
      for (let y = 0; y < tables[0].colHeaders.length; y++) {
        // put in logic to add colheaders to the var above
      }
  }

  const hotRef = useRef(null);
  return (
    <div>
      <h2>Final Mapping</h2>
      <div className='main-table-container'>
        <div className='data-table-container' style={{"width":`${60+100*colHeaders.length}px`}}>
          <div className='data-table table'>
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

{/* change these two displays below to use a ternary opperator instead */}
        { !showPlot &&
          <div>
            <button onClick={() => {setShowPlot(true)}}>
              Show Graph
            </button>
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

export default FinalTable