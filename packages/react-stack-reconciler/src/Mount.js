import instantiateComponent from './instantiateComponent';

function mount(element, containerNode) {
  unmount(containerNode);

  // Create the top-level internal instance
  let rootComponent = instantiateComponent(element);

  // Mount the top-level component into the container
  let node = rootComponent.mount();
  containerNode.appendChild(node);

  // Save a reference to the internal instance
  node._internalInstance = rootComponent;

  // Return the public instance it provides
  let publicInstance = rootComponent.getPublicInstance();
  return publicInstance;
}

function unmount(containerNode) {
  // Read the internal instance from a DOM node:
  // (This doesn't work yet, we will need to change mountTree() to store it.)
  let node = containerNode.firstChild;
  let rootComponent = node._internalInstance;

  // Unmount the tree and clear the container
  rootComponent && rootComponent.unmount();
  containerNode.innerHTML = '';
}

export default {
  mount,
  unmount,
};
