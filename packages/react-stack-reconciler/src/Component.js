class Component {
  setState(state) {
    console.error(state);
  }
}

// Mark this class so we can easily differentiate from classes that don't extend
// this base class.
Component.isReactComponent = true;

export default Component;
