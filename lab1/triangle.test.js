const run = require('./triangle.js');

const isNotTriangleErr = "не треугольник";
const undefineErr = "неизвестная ошибка";
const equilateralTriangle = "равносторонний";
const isoscelesTriangle = "равнобедренный";
const regularTriangle = "обычный"

test('empty line', () => {
    expect(run()).toEqual(undefineErr);
});

test('5, 4', () => {
    expect(run(5, 4)).toEqual(undefineErr);
});

test('1, 2, 4, 3', () => {
    expect(run(1, 2, 4, 3)).toEqual(isNotTriangleErr);
});


test('0 0 0', () => {
    expect(run(0, 0, 0)).toEqual(isNotTriangleErr);
});

test('0, 5, 7', () => {
    expect(run(0, 5, 7)).toEqual(isNotTriangleErr);
});

test('2, 3, 0', () => {
    expect(run(2, 3, 0)).toEqual(isNotTriangleErr);
});

test('5, 0, 4', () => {
    expect(run(5, 0, 4)).toEqual(isNotTriangleErr);
});


test('-1 -2 -3', () => {
    expect(run(-1, -2, -3)).toEqual(undefineErr);
});

test('5, 4, -3', () => {
    expect(run(5, 4, -3)).toEqual(undefineErr);
});

test('-5, 4, 3', () => {
    expect(run(-5, 4, 3)).toEqual(undefineErr);
});

test('5, -4, 3', () => {
    expect(run(5, -4, 3)).toEqual(undefineErr);
});

test('1, 1, 2', () => {
    expect(run(1, 1, 2)).toEqual(isNotTriangleErr);
});

test('1.1, 1.1, 2.2', () => {
    expect(run(1.1, 1.1, 2.2)).toEqual(isNotTriangleErr);
});

test('10, 10, 20', () => {
    expect(run(10, 10, 20)).toEqual(isNotTriangleErr);
});

test('2, 4, 2', () => {
    expect(run(2, 4, 2)).toEqual(isNotTriangleErr);
});

test('4, 4, 8', () => {
    expect(run(4, 4, 8)).toEqual(isNotTriangleErr);
});

test('8, 2, 5', () => {
    expect(run(8, 2, 5)).toEqual(isNotTriangleErr);
});

test('8.3, 2.4, 5.6', () => {
    expect(run(8.3, 2.4, 5.6)).toEqual(isNotTriangleErr);
});

test('2e30, 2e40, 2e50', () => {
    expect(run(2e30, 2e40, 2e50)).toEqual(isNotTriangleErr);
});

test('4e30, 3e30, 5e30', () => {
    expect(run(3e30, 4e30, 5e30)).toEqual(regularTriangle);
});

test('0.1, 0.1, 0.1', () => {
    expect(run(0.1, 0.1, 0.1)).toEqual(equilateralTriangle);
});

test('42, 42, 42', () => {
    expect(run(42, 42, 42)).toEqual(equilateralTriangle);
});

test('9007199254740991, 9007199254740991, 9007199254740991', () => {
    expect(run(9007199254740991, 9007199254740991, 9007199254740991)).toEqual(equilateralTriangle);
});

test('2, 2, 1', () => {
    expect(run(2, 2, 1)).toEqual(isoscelesTriangle);
});

test('2, 1, 2', () => {
    expect(run(2, 1, 2)).toEqual(isoscelesTriangle);
});

test('1, 2, 2', () => {
    expect(run(1, 2, 2)).toEqual(isoscelesTriangle);
});

test('0, 0, 0.1', () => {
    expect(run(0, 0, 0.1)).toEqual(regularTriangle);
});

test('5, 4, 3', () => {
    expect(run(5, 4, 3)).toEqual(regularTriangle);
});

test('5.2, 4, 3', () => {
    expect(run(5.2, 4, 3)).toEqual(regularTriangle);
});

test('0.3, 0.4, 0.5', () => {
    expect(run(0.3, 0.4, 0.5)).toEqual(regularTriangle);
});

test('a, b, c', () => {
    expect(run('a', 'b', 'c')).toEqual(undefineErr);
});

test('a, 4, 5', () => {
    expect(run('a', 4, 5)).toEqual(undefineErr);
});

test('5, b, 4', () => {
    expect(run(5, 'b', 4)).toEqual(undefineErr);
});

test('5, 4, s', () => {
    expect(run(5, 4, 's')).toEqual(undefineErr);
});