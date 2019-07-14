import Component from './src/Component';
import Element from './src/Element';
import Mount from './src/Mount';

export default {
  Component: Component,
  createElement: Element.createElement,
  render: Mount.mount,
  // unmountComponentAtNode: Mount.unmountComponentAtNode,
};
