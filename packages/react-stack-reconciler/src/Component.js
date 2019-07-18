class Component {
  constructor(props) {
    this.props = props;
    // updated when instantiateComponent CompositeComponent
    this._currentElement;
    this._componentInstance;
    // updated when setState
    this._pendingState = {};
  }

  setState(partialState) {
    this._pendingState = {
      ...this.state,
      ...partialState,
    };

    this.updateComponent(this._currentElement);
  }

  updateComponent(nextElement) {
    const componentInstance = this._componentInstance;
    this._currentElement = nextElement;
    this.state = this._pendingState;
    this.props = nextElement.props;
    componentInstance.receive(nextElement);
  }
}

// Mark this class so we can easily differentiate from classes that don't extend
// this base class.
Component.isReactComponent = true;

export default Component;
