const Pencil = require('../src/Pencil');

describe('Pencil', () => {
  test('paper starts empty', () => {
    const pencil = new Pencil();
    expect(pencil.readPaper()).toBe('');
  });
});
