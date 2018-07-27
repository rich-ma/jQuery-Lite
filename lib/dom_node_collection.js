
class DOMNodeCollection {
  constructor(els) {
    this.store = els;
  }
  
  flattenDeep(arr1) {
    return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
  }
  
  html(string) {
    if (string) {
      this.store.forEach( (e) => e.innerHTML = string);
    } 
    else {
      return this.store[0].innerHTML;
    }
  }
  
  empty() {
    this.html("");
  }
  
  attr(attribute, value = null) {
    if (value === null){
      return this.store[0].getAttribute(attribute);
    } else {
      this.store.forEach( el => {
        el.setAttribute(attribute, value);
      });
    }
  }
  
  addClass(className) {
    this.store.forEach( (el) => {
      if (el.className) el.className += ` ${className}`;
      else el.className = className;
    });
  }
  
  removeClass(className) {
    this.store.forEach( (el) => {
      let curClasses = el.className.split(" ");
      let newClasses = curClasses.filter( (e) => e !== className);
      el.className = newClasses.join(" ");
    });
  }
  
  append($el) {
    let newHTML = "";
    $el.store.forEach( (el) => newHTML += el.outerHTML);
    
    this.store.forEach( (el) => {
      let currentHTML = el.innerHTML;
      el.innerHTML = currentHTML + newHTML;
    });
  }
  
  children() {
    let childs = [];
    this.store.forEach((el) => childs.push(Array.from(el.children)));
    let flatChildren = flattenDeep(childs);
    return new DOMNodeCollection(flatChildren);
    
    // let children = [];
    // this.store.forEach( (el) => children.push(el.children));
    // let flatChildren = [];
    // let childArr = Array.from(children[0]);
    // childArr.forEach(e => {
    //   flatChildren = flatChildren.concat(e);
    // });
    // console.log(flatChildren);
    // return new DOMNodeCollection(Array.from(flatChildren));
  }
  
  parent() {
    let parents = [];
    this.store.forEach( (el) => parents.push(el.parent()));
    return new DOMNodeCollection(parents);
  }
  
  find(selector) {
    const matchedEls = [];
    let childrens = this.children();
    let childElements = Array.from(childrens.store);
    childElements.forEach( e => {
      if (e.tagName === selector.toUpperCase()) matchedEls.push(e);
    });
    return matchedEls;
  }
  
  
  
}

module.exports = DOMNodeCollection;