import React from 'react';

export default function renderElement(json) {
  // If the node is a text node, return the text directly
  if (typeof json === 'string') {
    return json;
  }

  // Destructure type, attributes, and children from the JSON node
  const { type, attributes, children } = json;

  // Convert attributes object to JSX props
  const props = attributes || {};

  // Recursively render children
  const childrenElements = (children || []).map((child, index) => (
    <React.Fragment key={index}>{renderElement(child)}</React.Fragment>
  ));

  // Return JSX element, ignoring 'html' tag
  if (type.toLowerCase() === 'html') {
    return childrenElements;
  }
  return React.createElement(type, props, ...childrenElements);
}
