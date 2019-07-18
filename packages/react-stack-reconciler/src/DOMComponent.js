import instantiateComponent from './instantiateComponent';
import { isReactText } from './utils';

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

  getHostNode() {
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
      return instantiateComponent(child);
    });
    this.renderedChildren = renderedChildren;

    // Collect DOM nodes they return on mount
    renderedChildren.forEach(child => {
      node.append(child.mount());
    });

    // Return the DOM node as mount result
    return node;
  }

  receive(nextElement) {
    let node = this.node;
    let prevElement = this.currentElement;
    let prevProps = prevElement.props;
    let nextProps = nextElement.props;
    this.currentElement = nextElement;

    // Remove old attributes.
    Object.keys(prevProps).forEach(propName => {
      if (propName !== 'children' && !nextProps.hasOwnProperty(propName)) {
        node.removeAttribute(propName);
      }
    });
    // Set next attributes.
    Object.keys(nextProps).forEach(propName => {
      if (propName !== 'children') {
        if (propName === 'style' && typeof nextProps[propName] === 'object') {
          Object.keys(nextProps[propName]).forEach(
            currentStyle =>
              (node.style[currentStyle] = nextProps[propName][currentStyle])
          );
        } else {
          node.setAttribute(propName, nextProps[propName]);
        }
      }
    });

    // These are arrays of React elements:
    let prevChildren = prevProps.children || [];
    if (!Array.isArray(prevChildren)) {
      prevChildren = [prevChildren];
    }
    let nextChildren = nextProps.children || [];
    if (!Array.isArray(nextChildren)) {
      nextChildren = [nextChildren];
    }

    // These are arrays of internal instances:
    let prevRenderedChildren = this.renderedChildren;
    let nextRenderedChildren = [];

    // As we iterate over children, we will add operations to the array.
    let operationQueue = [];

    // Note: the section below is extremely simplified!
    // It doesn't handle reorders, children with holes, or keys.
    // It only exists to illustrate the overall flow, not the specifics.

    for (let i = 0; i < nextChildren.length; i++) {
      // Try to get an existing internal instance for this child
      let prevChild = prevRenderedChildren[i];

      // If there is no internal instance under this index,
      // a child has been appended to the end. Create a new
      // internal instance, mount it, and use its node.
      if (!prevChild || isReactText(nextChildren[i])) {
        let nextChild = instantiateComponent(nextChildren[i]);
        let node = nextChild.mount();

        // Record that we need to append a node
        operationQueue.push({ type: 'ADD', node });
        nextRenderedChildren.push(nextChild);
        continue;
      }

      // We can only update the instance if its element's type matches.
      // For example, <Button size="small" /> can be updated to
      // <Button size="large" /> but not to an <App />.
      let canUpdate = prevChildren[i].type === nextChildren[i].type;

      // If we can't update an existing instance, we have to unmount it
      // and mount a new one instead of it.
      if (!canUpdate) {
        let prevNode = prevChild.getHostNode();
        prevChild.unmount();

        let nextChild = instantiateComponent(nextChildren[i]);
        let nextNode = nextChild.mount();

        // Record that we need to swap the nodes
        operationQueue.push({ type: 'REPLACE', prevNode, nextNode });
        nextRenderedChildren.push(nextChild);
        continue;
      }

      // If we can update an existing internal instance,
      // just let it receive the next element and handle its own update.
      prevChild.receive(nextChildren[i]);
      nextRenderedChildren.push(prevChild);
    }

    // Finally, unmount any children that don't exist:
    for (let j = nextChildren.length; j < prevChildren.length; j++) {
      let prevChild = prevRenderedChildren[j];
      let node = prevChild.getHostNode();
      prevChild.unmount();

      // Record that we need to remove the node
      operationQueue.push({ type: 'REMOVE', node });
    }

    // Point the list of rendered children to the updated version.
    this.renderedChildren = nextRenderedChildren;
    while (operationQueue.length > 0) {
      let operation = operationQueue.shift();
      switch (operation.type) {
        case 'ADD':
          // here we only handle only one text child for now;
          // eg. <div>text<span>sdf</span></div> is not allowed because it has one text child and one dom child
          if (isReactText(operation.node)) {
            this.node.textContent = operation.node;
          } else {
            this.node.appendChild(operation.node);
          }
          break;
        case 'REPLACE':
          this.node.replaceChild(operation.nextNode, operation.prevNode);
          break;
        case 'REMOVE':
          this.node.removeChild(operation.node);
          break;
      }
    }
  }

  unmount() {
    // Unmount all the children
    let renderedChildren = this.renderedChildren;
    renderedChildren.forEach(child => child.unmount());
  }
}
