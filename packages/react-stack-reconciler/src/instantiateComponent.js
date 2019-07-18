import CompositeComponent from './CompositeComponent';
import DOMComponent from './DOMComponent';
import TextComponent from './TextComponent';
import { isReactText } from './utils';

export default function instantiateComponent(element) {
  let type = element.type;
  let wrapperInstance;
  if (typeof type === 'function') {
    // User-defined components
    wrapperInstance = new CompositeComponent(element);
  } else if (typeof type === 'string') {
    // Platform-specific components
    wrapperInstance = new DOMComponent(element);
  } else if (isReactText(element)) {
    wrapperInstance = new TextComponent(element);
  }
  return wrapperInstance;
}
