import React from 'react';

export default function renderElement(json) {
  if (typeof json === 'string') {
    return json;
  }

  const { type, attributes, children } = json;
  const props = attributes || {};

  // Use a more stable key based on the content
  const childrenElements = (children || []).map((child) => (
    <React.Fragment key={getStableKey(child)}>
      {renderElement(child)}
    </React.Fragment>
  ));

  if (type.toLowerCase() === 'html' || type.toLowerCase() === 'body') {
    return childrenElements;
  }

  // Wrap the element creation in a dynamic component
  return (
    <DynamicElement
      type={type}
      props={props}
      childrenElements={childrenElements}
    />
  );
}

// Helper function to generate a stable key
function getStableKey(child) {
  if (typeof child === 'string') {
    return child;
  }
  return `${child.type}-${JSON.stringify(child.attributes)}`;
}

// Dynamic element component
const DynamicElement = ({ type, props, childrenElements }) => {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // or a loading placeholder
  }

  return React.createElement(type, props, ...childrenElements);
};
