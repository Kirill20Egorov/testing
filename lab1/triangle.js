const isNotTriangleErr = "не треугольник";
const undefineErr = "неизвестная ошибка";
const equilateralTriangle = "равносторонний";
const isoscelesTriangle = "равнобедренный";
const regularTriangle = "обычный"

let t1 = process.argv[2];
let t2 = process.argv[3];
let t3 = process.argv[4];

function isValid(a, b, c) {
    if ((a < 0) || (b < 0) || (c < 0) || isNaN(a) || isNaN(b) || isNaN(c)) {
        return undefineErr
    } else if (((a + b) <= c) || ((a + c) <= b) || ((b + c) <= a)) {
        return isNotTriangleErr
    }
    return true
}

function typeDetect(a, b, c) {
    if ((a == b) && (a == c)) {
        return equilateralTriangle
    } else if (((a == b) && (a != c)) || ((c == b) && (c != a)) || ((a == c) && (a != b))) {
        return isoscelesTriangle
    } else {
        return regularTriangle
    }
}

function run(l1, l2, l3) {
    let a = parseFloat(l1);
    let b = parseFloat(l2);
    let c = parseFloat(l3);
    if (isValid(a, b, c) === true) {
        let output = typeDetect(a, b, c);
        switch (output) {
            case isNotTriangleErr:
                return isNotTriangleErr
            case undefineErr:
                return undefineErr
            case equilateralTriangle:
                return equilateralTriangle
            case isoscelesTriangle:
                return isoscelesTriangle
            case regularTriangle:
                return regularTriangle
        }
    } else {
        switch (isValid(a, b, c)) {
            case isNotTriangleErr:
                return isNotTriangleErr
            case undefineErr:
                return undefineErr
        }
    }
}

function isValidArgv() {
    if (process.argv.length != 5) {
        return false
    }
    return true
}

function printOutput(l1, l2, l3) {
    if (!isValidArgv()) {
        console.log(undefineErr)
        return undefineErr
    }
    let output = run(l1, l2, l3);
    console.log(output)
}

printOutput(t1, t2, t3);

module.exports = run;