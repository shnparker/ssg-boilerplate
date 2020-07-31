/**
 * SVGR TEMPLATE
 * Template for svgr react components
 * @see https://github.com/smooth-code/svgr
 */

function template({ template }, opts, { componentName, props, jsx }) {
  const plugins = ["jsx"];
  if (opts.typescript) {
    plugins.push("typescript");
  }
  const typeScriptTpl = template.smart({ plugins: ["typescript"] });

  return typeScriptTpl.ast`
import React from 'react';

function ${componentName} (${props}) {
  return (
    ${jsx}
  );
};

export default ${componentName};
`;
}

module.exports = template;
