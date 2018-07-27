const DNC = require("./dom_node_collection.js");
function flattenDeep(arr1) {
   return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
}
$l = (selector) => {
  let result;
  if (typeof selector === 'string') {
    let nodeList = document.querySelectorAll(selector);
    let array = Array.from(nodeList);
    result = new DNC(array);
  }
  if (selector instanceof HTMLElement) {
    result = new DNC([selector]);
  }
  return result;
};

window.$l = $l;
window.flattenDeep = flattenDeep;
