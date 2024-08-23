export default function jsObjectToHtml(obj, indent = 0) {
  const indentStr = '  '.repeat(indent);
  let result = '';

  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    obj.forEach((item) => {
      result += jsObjectToHtml(item, indent) + '\n';
    });
    return result;
  }

  if (obj.type) {
    result += `${indentStr}<${obj.type}`;

    if (obj.attributes) {
      Object.entries(obj.attributes).forEach(([key, value]) => {
        result += ` ${key}="${value}"`;
      });
    }

    result += '>\n';

    if (obj.children) {
      result += jsObjectToHtml(obj.children, indent + 1);
    }

    result += `${indentStr}</${obj.type}>\n`;
  } else {
    Object.entries(obj).forEach(([key, value]) => {
      if (key !== 'children' && key !== 'attributes') {
        result += `${indentStr}${jsObjectToHtml(value, indent)}\n`;
      }
    });
  }

  return result;
}

// Usage example:
const htmlString = jsObjectToHtml(yourJsObject);
console.log(htmlString);
