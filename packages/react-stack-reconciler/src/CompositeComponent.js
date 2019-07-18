import instantiateComponent from './instantiateComponent';

function isClass(type) {
  // React.Component subclasses have this flag
  return Boolean(type.isReactComponent);
}

export default class CompositeComponent {
  constructor(element) {
    this.currentElement = element;
    this.renderedComponent = null;
    this.publicInstance = null;
  }

  getPublicInstance() {
    // For composite components, expose the class instance.
    return this.publicInstance;
  }

  getHostNode() {
    // Ask the rendered component to provide it.
    // This will recursively drill down any composites.
    return this.renderedComponent.getHostNode();
  }

  mount() {
    let element = this.currentElement;
    let type = element.type;
    let props = element.props;

    let publicInstance;
    let renderedElement;
    if (isClass(type)) {
      // Component class
      publicInstance = new type(props);
      // Set the props
      publicInstance.props = props;
      // Call the lifecycle if necessary
      if (publicInstance.componentWillMount) {
        publicInstance.componentWillMount();
      }
      renderedElement = publicInstance.render();
    } else if (typeof type === 'function') {
      // Component function
      publicInstance = null;
      renderedElement = type(props);
    }

    // Save the public instance
    this.publicInstance = publicInstance;

    // Instantiate the child internal instance according to the element.
    // It would be a DOMComponent for <div /> or <p />,
    // and a CompositeComponent for <App /> or <Button />:
    let renderedComponent = instantiateComponent(renderedElement);
    this.renderedComponent = renderedComponent;

    // Component class set renderedComponent(componentInstance)
    if (isClass(type)) {
      publicInstance._componentInstance = this;
      publicInstance._currentElement = element;
    }

    // Mount the rendered output
    return renderedComponent.mount();
  }

  receive(nextElement) {
    // let prevProps = this.currentElement.props;
    let prevRenderedComponent = this.renderedComponent;
    let prevRenderedElement = prevRenderedComponent.currentElement;
    let publicInstance = this.publicInstance;

    // Update *own* element
    this.currentElement = nextElement;
    let type = nextElement.type;
    let nextProps = nextElement.props;

    // Figure out what the next render() output is
    let nextRenderedElement;
    if (isClass(type)) {
      // Component class
      // Call the lifecycle if necessary
      if (publicInstance.componentWillUpdate) {
        publicInstance.componentWillUpdate(nextProps);
      }
      // Update the props
      publicInstance.props = nextProps;
      // Re-render
      nextRenderedElement = publicInstance.render();
    } else if (typeof type === 'function') {
      // Component function
      nextRenderedElement = type(nextProps);
    }

    // If the rendered element type has not changed,
    // reuse the existing component instance and exit.
    if (prevRenderedElement.type === nextRenderedElement.type) {
      prevRenderedComponent.receive(nextRenderedElement);
      return;
    }

    // If we reached this point, we need to unmount the previously
    // mounted component, mount the new one, and swap their nodes.

    // Find the old node because it will need to be replaced
    let prevNode = prevRenderedComponent.getHostNode();

    // Unmount the old child and mount a new child
    prevRenderedComponent.unmount();
    let nextRenderedComponent = instantiateComponent(nextRenderedElement);
    let nextNode = nextRenderedComponent.mount();

    // Replace the reference to the child
    this.renderedComponent = nextRenderedComponent;

    // Replace the old node with the new one
    // Note: this is renderer-specific code and
    // ideally should live outside of CompositeComponent:
    prevNode.parentNode.replaceChild(nextNode, prevNode);
  }

  unmount() {
    // Call the lifecycle method if necessary
    let publicInstance = this.publicInstance;
    if (publicInstance) {
      if (publicInstance.componentWillUnmount) {
        publicInstance.componentWillUnmount();
      }
    }

    // Unmount the single rendered component
    let renderedComponent = this.renderedComponent;
    renderedComponent.unmount();
  }
}
