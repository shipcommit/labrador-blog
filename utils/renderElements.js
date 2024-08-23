import React from 'react';

export default function renderElements(json, parentType = null) {
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
      {renderElements(child, type)}
    </React.Fragment>
  ));

  // Ensure <head> is not a child of invalid elements
  if (type.toLowerCase() === 'head' && !['html'].includes(parentType)) {
    console.warn('<head> cannot be a child of <' + parentType + '>');
    return null;
  }

  // Add check to prevent <head> as a child of <article>
  if (
    type.toLowerCase() === 'head' &&
    parentType &&
    parentType.toLowerCase() === 'article'
  ) {
    console.warn(
      '<head> cannot be a child of <article>. This will cause a hydration error.'
    );
    return null;
  }

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
