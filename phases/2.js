module.exports = {
  commands: [
    '6',
    'move 4 onto 1',
    'move 3 onto 2',
    'move 2 over 1',
    'move 4 onto 2', // throws error
    'move 5 over 0',
    'move 4 over 0'
  ],
  expected: {
    0: [0, 5, 4],
    1: [1],
    2: [2],
    3: [3],
    4: [],
    5: []
  },
  exceptions: [
    'move 4 onto 2'
  ]
};
