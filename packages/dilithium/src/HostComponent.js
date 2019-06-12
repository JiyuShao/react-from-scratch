import assert from './assert';

let implementation;

function construct(element) {
  assert(implementation);

  return new implementation(element);
}

function constructTextComponent(element) {
  // Create wrapper element. It will just be a span.
  return construct({
    type: 'span',
    props: {
      children: element,
    },
  });
}

function inject(impl) {
  implementation = impl;
}

export default {
  inject,
  construct,
  constructTextComponent,
};
