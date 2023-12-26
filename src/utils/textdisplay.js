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

export default FormattedJsonDisplay