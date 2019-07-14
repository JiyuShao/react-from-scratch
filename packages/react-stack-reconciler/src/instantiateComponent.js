import CompositeComponent from './CompositeComponent';
import DOMComponent from './DOMComponent';

export default function instantiateComponent(element) {
  let type = element.type;
  if (typeof type === 'function') {
    // User-defined components
    return new CompositeComponent(element);
  } else if (typeof type === 'string') {
    // Platform-specific components
    return new DOMComponent(element);
  }
}
