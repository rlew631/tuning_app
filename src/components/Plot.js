import { useEffect } from 'react';
const Plotly = require('plotly.js-dist');

function colorscale(z) {
  const maxZ = Math.max(...z);
  const minZ = Math.min(...z);
  let scaledZ = [];

  if (maxZ === 1) { //Lambda
    // Rescale values with a floor of 0.68
    scaledZ = z.map(value => Math.max(0, (value - 0.68) / (1 - 0.68)));
  } else if (maxZ === 14.7) { //Gas AFR
    // Rescale values with a floor of 10
    scaledZ = z.map(value => Math.max(0, (value - 10) / (14.7 - 10)));
  } else { //any range
    scaledZ = z.map(value => (value - minZ) / (maxZ - minZ));
  }

  return scaledZ;
}

function mapMeshData(tableData) {
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
      intensity: colorscale(z),
      marker: {
        size: 6,
        // colorscale: 'Viridis',
        showscale: true,
      },
      type: 'mesh3d'
  };

  // console.log(plotData)
  return plotData;
}

function mapGridData(tableData) {
  const { rowHeaders, colHeaders, data } = tableData;
  let x = []
  let y = []
  let z = []
  let plotData = []
  for (let i = 0; i < rowHeaders.length; i++) {
    for (let j = 0; j < colHeaders.length; j++) {
        x.push(colHeaders[j]);
        y.push(rowHeaders[i]);
        z.push(data[i][j]);
    }
    plotData.push({
      x: [...x],
      y: [...y],
      z: [...z],
    })
    x = []
    y = []
    z = []
  }
  for (let i = 0; i < colHeaders.length; i++) {
    for (let j = 0; j < rowHeaders.length; j++) {
        x.push(colHeaders[i]);
        y.push(rowHeaders[j]);
        z.push(data[j][i]);
    }
    plotData.push({
      x: [...x],
      y: [...y],
      z: [...z],
    })
    x = []
    y = []
    z = []
  }
  plotData.forEach(data => {
    data.type = 'scatter3d';
    data.mode = 'lines';
    data.opacity = 1;
    data.line = {
      width: 6,
      color: "black"
    };
    data.hoverinfo = 'none'; // Disables hover tooltips for grid data
    data.showlegend = false; // Hides grid data from legend
  })
  return plotData;
}

const ScatterPlot = ({ tableInfo }) => {
  // Effect to handle rendering of the plot 
  useEffect(() => {
    // Dynamically create a new div for the plot
    const plotDiv = document.createElement('div');
    // plotDiv.style.width = '100%';
    // plotDiv.style.height = '800px';

    // Append the new div to the document body or a specific container
    document.body.appendChild(plotDiv);
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
    Plotly.newPlot(plotDiv, [mapMeshData(tableInfo), ...mapGridData(tableInfo)], layout);
    // Plotly.newPlot(plotDiv, [mapMeshData(tableInfo)], layout);

    return () => plotDiv.remove();
  }, [tableInfo]); // Rerun the effect if tableInfo changes

  return null; // This component doesn't render anything itself
};

export default ScatterPlot