module.exports = {
  commands: [
    '8',
    'move 7 onto 1',
    'move 5 onto 1',
    'move 1 onto 6',
    'move 4 onto 3',
    'move 1 onto 4',
    'move 3 onto 1', // throws error
    'move 5 onto 2',
    'move 7 onto 5',
    'move 4 onto 5'
  ],
  expected: {
    0: [0],
    1: [1],
    2: [2, 5, 4],
    3: [3],
    4: [],
    5: [],
    6: [],
    7: []
  },
  exceptions: [
    'move 3 onto 1'
  ]
};
