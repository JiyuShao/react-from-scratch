// Lightweight replacement for invariant/node assert

export default function assert(condition) {
  if (!condition) {
    throw new Error('assertion failure');
  }
};
