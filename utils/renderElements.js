import React from 'react';

export default function renderElements(json) {
  if (typeof json === 'string') {
    return json;
  }

  const { type, attributes, children } = json;
  const props = { ...attributes };

  // Convert 'class' to 'className'
  if (props.class) {
    props.className = props.class;
    delete props.class;
  }

  // Convert 'charset' to 'charSet'
  if (props.charset) {
    props.charSet = props.charset;
    delete props.charset;
  }

  // Use a more stable key based on the content
  const childrenElements = (children || []).map((child, index) => (
    <React.Fragment key={getStableKey(child, index)}>
      {renderElements(child)}
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
function getStableKey(child, index) {
  if (typeof child === 'string') {
    return child;
  }
  const attributesString = child.attributes
    ? JSON.stringify(child.attributes)
    : `no-attributes-${index}`;
  return `${child.type}-${attributesString}`;
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
