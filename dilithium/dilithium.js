import Component from './src/Component';
import Element from './src/Element';
import Mount from './src/Mount';

// Do dependency injection to work around circular dependencies
import DOMComponentWrapper from './src/DOMComponentWrapper';

import HostComponent from './src/HostComponent';
HostComponent.inject(DOMComponentWrapper);

export default {
  Component: Component,
  createElement: Element.createElement,

  render: Mount.render,
  unmountComponentAtNode: Mount.unmountComponentAtNode,
};
