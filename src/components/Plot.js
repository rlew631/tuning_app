import React, { useEffect } from 'react';
var Plotly = require('plotly.js-dist');

function mapData(tableData) {
  const plotData = {
    x: [0,1,2,3],
    y: [0,1,2,3],
    z: [0,1,2,3],
    mode: 'markers',
    marker: {
		size: 6,
		line: {
		color: 'rgba(217, 217, 217, 0.14)',
		width: 0.5},
		opacity: 0.8},
	type: 'scatter3d'
  }
  return plotData
}

// function scatterPlot (tableInfo) {
//   console.log(tableInfo)
//   const data = mapData(tableInfo)
//   var layout = {margin: {
//     l: 0,
//     r: 0,
//     b: 0,
//     t: 0
//     }};
//   Plotly.newPlot(`${tableInfo.key}-plot`, data, layout);
// }

const ScatterPlot = ({ tableInfo }) => {
  // Effect to handle rendering of the plot
  useEffect(() => {
    // Dynamically create a new div for the plot
    const plotDiv = document.createElement('div');

    // Apply styles or class names to the div as needed
    plotDiv.style.width = '100%';
    plotDiv.style.height = '400px'; // You can adjust the size

    // Append the new div to the document body or a specific container
    document.body.appendChild(plotDiv);

    // Convert table data to plot data
    const plotData = [mapData(tableInfo)];

    // Define the layout for the plot
    const layout = {
      margin: { l: 0, r: 0, b: 0, t: 0 },
    };

    // Render the plot using Plotly
    Plotly.newPlot(plotDiv, plotData, layout);

    // Cleanup function to remove the div when component unmounts
    return () => plotDiv.remove();
  }, [tableInfo]); // Rerun the effect if tableInfo changes

  return null; // This component doesn't render anything itself
};

export default ScatterPlot