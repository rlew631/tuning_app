import React, { useEffect } from 'react';
var Plotly = require('plotly.js-dist');

function mapData(tableData) {
  const { rowHeaders, colHeaders, data } = tableData;
  let x = []
  let y = []
  let z = []
  for (let i = 0; i < rowHeaders.length; i++) {
    for (let j = 0; j < colHeaders.length; j++) {
        x.push(colHeaders[j]);
        y.push(rowHeaders[i]);
        z.push(data[i][j]);
    }
  }
  let plotData = {
      x: x,
      y: y,
      z: z,
      mode: 'markers',
      marker: {
        size: 6,
        line: {
          color: z,
          colorscale: 'Viridis', // This is an example color scale
          showscale: true,
        },
      },
      type: 'mesh3d'
  };

  
  console.log(plotData)
  return plotData;
}

const ScatterPlot = ({ tableInfo }) => {
  // Effect to handle rendering of the plot 
  useEffect(() => {
    // Dynamically create a new div for the plot
    const plotDiv = document.createElement('div');
    plotDiv.style.width = '100%';
    plotDiv.style.height = '800px';

    // Append the new div to the document body or a specific container
    document.body.appendChild(plotDiv);

    const plotData = [mapData(tableInfo)];
    const layout = {
      margin: { l: 0, r: 0, b: 0, t: 0 },
      title: {
        text:'Plot Title',
      },
      xaxis: {
        title: {
          text: 'x Axis',
        },
      },
      yaxis: {
        title: {
          text: 'y Axis',
        }
      },
      zaxis: {
        title: {
          text: 'z Axis',
        }
      }
    };
    Plotly.newPlot(plotDiv, plotData, layout);

    return () => plotDiv.remove();
  }, [tableInfo]); // Rerun the effect if tableInfo changes

  return null; // This component doesn't render anything itself
};

export default ScatterPlot