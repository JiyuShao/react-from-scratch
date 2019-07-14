import instantiateComponent from './instantiateComponent';

export default class DOMComponent {
  constructor(element) {
    this.currentElement = element;
    this.renderedChildren = [];
    this.node = null;
  }

  getPublicInstance() {
    // For DOM components, only expose the DOM node.
    return this.node;
  }

  mount() {
    let element = this.currentElement;
    let type = element.type;
    let props = element.props;
    let children = props.children || [];
    if (!Array.isArray(children)) {
      children = [children];
    }

    // Create and save the node
    let node = document.createElement(type);
    this.node = node;

    // Set the attributes
    Object.keys(props).forEach(propName => {
      if (!['children', 'style'].includes(propName)) {
        node.setAttribute(propName, props[propName]);
      } else if (propName === 'style') {
        Object.keys(props[propName]).map(
          currentKey =>
            (node[propName][currentKey] = props[propName][currentKey])
        );
      }
    });

    // Create and save the contained children.
    // Each of them can be a DOMComponent or a CompositeComponent,
    // depending on whether the element type is a string or a function.
    let renderedChildren = children.map(child => {
      return ['string', 'number'].includes(typeof child)
        ? child
        : instantiateComponent(child);
    });
    this.renderedChildren = renderedChildren;

    // Collect DOM nodes they return on mount
    renderedChildren.forEach(child => {
      node.append(
        ['string', 'number'].includes(typeof child) ? child : child.mount()
      );
    });

    // Return the DOM node as mount result
    return node;
  }
}
