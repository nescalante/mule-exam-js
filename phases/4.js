module.exports = {
  commands: [
    '10',
    'move 9 onto 1',
    'move 8 over 1',
    'move 7 over 1',
    'move 6 over 1',
    'pile 8 over 6', // throws error
    'pile 8 over 5',
    'move 2 over 1',
    'move 4 over 9'
  ],
  expected: {
    0: [0],
    1: [1, 9, 2, 4],
    2: [],
    3: [3],
    4: [],
    5: [5, 8, 7, 6],
    6: [],
    7: [],
    8: [],
    9: []
  },
  exceptions: [
    'pile 8 over 6'
  ]
};
