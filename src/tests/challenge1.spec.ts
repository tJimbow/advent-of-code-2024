import { describe, expect, it } from "vitest";
const fs = require("fs");

describe("challenge 1", () => {
    it("should read file into two list", () => {
        const {leftList, rightList} = readFile("./src/tests/challenge1_input_test.txt");

        expect(leftList).toEqual([3, 4, 2, 1, 3]);
        expect(rightList).toEqual([4, 3, 5, 3, 9]);
    })

    it("should compare two sorted lists", () => {
        const leftList = [2, 4, 3];
        const rightList = [3, 1, 2];

        const distance = getDistanceBetween(leftList, rightList);

        expect(distance).toBe(3)
    })

    it("should resolve challenge 1", () => {
        const {leftList, rightList} = readFile("./src/tests/input.txt");

        const distance = getDistanceBetween(leftList, rightList);

        expect(distance).toBe(2164381)
    })

    it("3 should appear 3 times in list", () => {
        const listToTest = [2, 3, 6, 3, 5, 3];

        expect(numberTimesAppear(listToTest, 3)).toBe(3);
    })

    it("should mulitply number by times appear in list", () => {
        const listToTest = [2, 3, 6, 3, 5, 3];

        expect(similarityCountInListForANumber(listToTest, 3)).toBe(9);
    })

    it("should calculate for a complete list the similary count", () => {
        const leftList = [2, 3, 6, 3, 5, 3];
        const rightList = [1, 3, 6, 3, 5, 3];

        expect(similarityCount(leftList, rightList)).toBe(38);
    })

    it("should calculate for a complete list the similary count from a file", () => {
        
        const {leftList, rightList} = readFile("./src/tests/input.txt");


        expect(similarityCount(leftList, rightList)).toBe(20719933);
    })
})

const similarityCount = (leftList: number[], rightList: number[]): number => {
    return leftList.reduce((acc, l) => {
        return similarityCountInListForANumber(rightList, l) + acc;
    }, 0)
}

const similarityCountInListForANumber = (list: number[], point: number) => {
    return numberTimesAppear(list, point) * point;
}

const numberTimesAppear = (list: number[], point: number) => {
    return list.filter(l => l === point).length;
}

const getDistanceBetween = (listA: number[], listB: number[]) => {
    return listA.sort((x, y) => x - y).reduce((cumul, a, index) => {
        const b = listB.sort((x, y) => x - y).at(index) ?? 0;

        return cumul + Math.abs(b - a);
    }, 0)
}

const readFile = (file: string) => {
    
    const text = fs.readFileSync(file, "utf8");

    const splittedText = text.split("\n");
    const leftList: number[] = [];
    const rightList: number[] = [];

    splittedText.forEach((line: string) => {
        const [A, B] = line.split("   ");

        leftList.push(Number(A));
        rightList.push(Number(B));
    });

    return {
        leftList, rightList
    }
    
}