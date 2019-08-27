import instantiateComponent from './instantiateComponent';
import traverseAllChildren from './traverseAllChildren';
import shouldUpdateComponent from './shouldUpdateComponent';
import Reconciler from './Reconciler';

// This *right here* is why keys are critical to preventing reordering issues.
// React will reuse an existing instance if there is one in this subtree.
// The instance identity here is determined by the generated key based on
// depth in the tree, parent, and (in React) the key={} prop.
function instantiateChild(childInstances, child, name) {
  let isUnique = childInstances[name] === undefined;

  if (isUnique) {
    childInstances[name] = instantiateComponent(child);
  }
}

function instantiateChildren(children) {
  // We store the child instances here, which are in turn used passed to
  // instantiateChild. We'll store this object for reuse when doing updates.
  let childInstances = {};

  traverseAllChildren(children, instantiateChild, childInstances);

  return childInstances;
}

/**
 * similiar with instantiateChild, but without instantiateComponent
 * @param {*} children 
 */
function flattenChildren(children) {
  let flattenedChildren = {};
  traverseAllChildren(
    children,
    (context, child, name) => (context[name] = child),
    flattenedChildren
  );

  return flattenedChildren;
}

function updateChildren(
  prevChildren, // Instances, as created above
  nextChildren, // Actually elements
  mountImages,
  removedChildren
) {
  // Just make our code a little bit cleaner so we don't have to do null checks.
  // React skips this to avoid extraneous objects.
  prevChildren = prevChildren || {};

  // Loop over our new children and determine what is being updated, removed,
  // and created.
  Object.keys(nextChildren).forEach(childKey => {
    let prevChild = prevChildren[childKey];
    let prevElement = prevChild && prevChild._currentElement;
    let nextElement = nextChildren[childKey];

    // Update
    if (prevChild && shouldUpdateComponent(prevElement, nextElement)) {
      // Update the existing child with the reconciler. This will recurse
      // through that component's subtree.
      Reconciler.receiveComponent(prevChild, nextElement);

      // We no longer need the new instance, so replace it with the old one.
      nextChildren[childKey] = prevChild;
    } else {
      // Otherwise
      // Remove the old child. We're replacing.
      if (prevChild) {
        // TODO: make this work for composites
        removedChildren[childKey] = prevChild._domNode;
        Reconciler.unmountComponent(prevChild);
      }

      // Instantiate the new child.
      let nextChild = instantiateComponent(nextElement);
      nextChildren[childKey] = nextChild;

      // React does this here so that refs resolve in the correct order.
      mountImages.push(Reconciler.mountComponent(nextChild));
    }
  });

  // Last but not least, remove the old children which no longer have any presense.
  Object.keys(prevChildren).forEach(childKey => {
    // debugger;
    if (!Object.prototype.hasOwnProperty.call(nextChildren, childKey)) {
      const prevChild = prevChildren[childKey];
      removedChildren[childKey] = prevChild._domNode;
      Reconciler.unmountComponent(prevChild);
    }
  });
}

function unmountChildren(renderedChildren) {
  if (!renderedChildren) {
    return;
  }
  Object.keys(renderedChildren).forEach(childKey => {
    Reconciler.unmountComponent(renderedChildren[childKey]);
  });
}

export default {
  instantiateChildren,
  flattenChildren,
  updateChildren,
  unmountChildren,
};
