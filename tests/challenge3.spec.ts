import { it, describe, expect } from 'vitest';
const fs = require("fs");

type NumberPair = {
    number1: number;
    number2: number;
}

describe('Challenge 3', () => {
  it('should return the correct value', () => {
    expect(getDigitNumbers(`how(){%}mul(764,432)/mul(464,877)`)).toEqual([{
        number1: 764,
        number2: 432,
        }, {
        number1: 464,
        number2: 877,
    }]);
  });

  it("should multiply numbers", () => {
    expect(multiplyPairNumber({
        number1: 764,
        number2: 432,
        })).toBe(330048);
  })

  it("should have list of pair numbers", () => {
    expect(multiplyPairNumbers([
        { number1: 764, number2: 432 },
        { number1: 464, number2: 877 },
    ])).toEqual([330048, 406928]);
  });

  it("should addition pair numbers", () => {
    expect(additionMultiplyPairNumbers([
        { number1: 764, number2: 432 },
        { number1: 464, number2: 877 },
        { number1: 3, number2: 2 },
    ])).toBe(736982);
  });

  it("should read file and opperate addition of mul(x,y)", () => {
    const text = fs.readFileSync("./tests/challenge3_input.txt", "utf8");
    const numbers = getDigitNumbers(text);

    expect(additionMultiplyPairNumbers(numbers)).toBe(192767529);
  });

  it("remove all string between don't and do instructions", () => {
    const text = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

    expect(removeBetweenDontAndDo(text)).toBe(
        "xmul(2,4)&mul[3,7]!^do()?mul(8,5))");
  });

  it("should read file and opperate addition of mul(x,y) without don't instructions", () => {
    const text = fs.readFileSync("./tests/challenge3_input.txt", "utf8");
    const textWithoutDont = removeBetweenDontAndDo(text);
    const numbers = getDigitNumbers(textWithoutDont);

    expect(additionMultiplyPairNumbers(numbers)).toBe(104083373);
  });
});

const additionMultiplyPairNumbers = (numbers: NumberPair[]) => numbers.reduce((acc, number) => acc + multiplyPairNumber(number), 0);

const multiplyPairNumbers = (numbers: NumberPair[]) => numbers.map(multiplyPairNumber);

const multiplyPairNumber = ({ number1, number2 }: NumberPair) => {
    return number1 * number2
}

const removeBetweenDontAndDo = (text: string) => {
    const regex = /don't\(\)[\s\S]*?do\(\)/g;
    
    return text.replace(regex, 'do()');
  }

const getDigitNumbers = (text: string) => {
    const regex = /mul\((\d+),(\d+)\)/g;
    let match;
    const results = [];

    while ((match = regex.exec(text)) !== null) {
        const number1 = Number(match[1]);
        const number2 = Number(match[2]);

        results.push({ number1, number2 });
    }

    return results;
}