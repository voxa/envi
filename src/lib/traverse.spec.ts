import test from 'ava';

import { traverse } from './traverse.js';

test('traversing an empty object', (t) => {
  t.is(traverse({}), '');
});

test('traversing a nested record with an empty object', (t) => {
  t.is(
    traverse({
      a: {},
    }),
    ''
  );
});

test('traversing a simple record with an empty string as a value', (t) => {
  const record = {
    a: '',
  };

  const result = traverse(record);

  t.is(result, 'A=""');
});

test('traversing a simple record with a single key', (t) => {
  const record = {
    a: 1,
  };

  const result = traverse(record);

  t.is(result, 'A="1"');
});

test('traversing a simple record with an array', (t) => {
  const record = {
    a: [1, 2, 3],
  };

  const result = traverse(record);

  t.is(result, 'A="1,2,3"');
});

test('traversing a simple record with multiple keys', (t) => {
  const record = {
    a: 1,
    b: 2,
  };

  const result = traverse(record);

  t.is(result, `A="1"\nB="2"`);
});

test('traversing a nested record', (t) => {
  const record = {
    a: 1,
    b: {
      c: 2,
    },
  };

  const result = traverse(record);

  t.is(result, `A="1"\nB_C="2"`);
});

test('traversing a nested record with an array', (t) => {
  const record = {
    a: 1,
    b: {
      c: [1, 2, 3],
    },
  };

  const result = traverse(record);

  t.is(result, `A="1"\nB_C="1,2,3"`);
});

test('traversing a nested record with multiple keys', (t) => {
  const record = {
    a: 1,
    b: {
      c: 2,
      d: 3,
    },
  };

  const result = traverse(record);

  t.is(result, `A="1"\nB_C="2"\nB_D="3"`);
});

test('traversing a nested record with multiple keys and an array', (t) => {
  const record = {
    a: 1,
    b: {
      c: 2,
      d: [1, 2, 3],
    },
  };

  const result = traverse(record);

  t.is(result, `A="1"\nB_C="2"\nB_D="1,2,3"`);
});

test('traversing a nested record with multiple keys and multiple arrays', (t) => {
  const record = {
    a: 1,
    b: {
      c: 2,
      d: [1, 2, 3],
      e: [4, 5, 6],
    },
  };

  const result = traverse(record);

  t.is(result, `A="1"\nB_C="2"\nB_D="1,2,3"\nB_E="4,5,6"`);
});

test('traversing a record with multiple nested records', (t) => {
  const record = {
    a: 1,
    b: 2,
    c: [3, 4, 5],
    d: {
      e: 6,
      f: 7,
    },
    g: {
      h: {
        i: 8,
        j: [9, 10],
      },
    },
  };

  const result = traverse(record);

  t.is(
    result,
    `A="1"\nB="2"\nC="3,4,5"\nD_E="6"\nD_F="7"\nG_H_I="8"\nG_H_J="9,10"`
  );
});
