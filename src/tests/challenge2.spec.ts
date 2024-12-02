import { describe, expect, it } from "vitest";
const fs = require("fs");

enum ReportStatus {
    SAFE = "safe",
    UNSAFE = "unsafe"
}

describe("challenge 2", () => {
    it("should be safe list when decrising numbers", () => {
        expect(isListSafeFor([7, 6, 5, 3, 1])).toBe(ReportStatus.SAFE);
    })

    
    it("should be safe list when incrising numbers", () => {
        expect(isListSafeFor([1, 3, 5, 6, 7])).toBe(ReportStatus.SAFE);
    })

    it("should be unsafe list when gap between two decrising steps superior than 3", () => {
        expect(isListSafeFor([9, 7, 6, 2, 1])).toBe(ReportStatus.UNSAFE);
    })

    it("should be unsafe list when two numbers the same", () => {
        expect(isListSafeFor([9, 7, 6, 6, 4])).toBe(ReportStatus.UNSAFE);
    })

    it("should be unsafe list when gap between two incrising steps superior than 3", () => {
        expect(isListSafeFor([1, 2, 6, 7, 9])).toBe(ReportStatus.UNSAFE);
    })

    it("should be unsafe is list has not only decrising or incrising numbers", () => {
        expect(isListSafeFor([2, 4, 3, 5, 6, 7])).toBe(ReportStatus.UNSAFE);
    })

    
    it("should be unsafe is list has not only decrising or incrising numbers", () => {
        expect(isListSafeFor([1, 2, 7, 8, 9])).toBe(ReportStatus.UNSAFE);
    })

    it("should count safe reports in multiple list", () => {
        expect(numbersOfSafeListFor([[2, 3, 4, 5, 6, 7], [2, 4, 3, 5, 6, 7], [1, 2, 6, 7, 9], [9, 7, 6, 6, 4], [7, 6, 5, 3, 1]])).toBe(2);
    })

    it("should read file and return the number of safe list", () => {
        const lists = readFile("./src/tests/challenge2_input.txt");
        expect(numbersOfSafeListFor(lists)).toBe(670);
    })
})

const numbersOfSafeListFor = (lists: number[][]) => {
    return lists.reduce((acc, list) => {
        return isListSafeFor(list) === ReportStatus.SAFE ? acc + 1 : acc;
    }, 0);
}

const isListSafeFor = (list: number[]): ReportStatus => {
    for (let index = 1; index < list.length; index++) {
        const element = list[index];
        const previousElement = list[index-1];

        if(index !== list.length) {
            const nextElement = list[index+1];

            if((previousElement > element && element < nextElement) ||
             (previousElement < element && element > nextElement)) {
                return ReportStatus.UNSAFE;
            }
        }

        const gap = Math.abs(element - previousElement);

        if(gap > 3 || gap < 1) {
            return ReportStatus.UNSAFE;
        }
    }
    return ReportStatus.SAFE;
}


const readFile = (file: string) => {
    const text = fs.readFileSync(file, "utf8");

    const splittedText = text.split("\n");

    return splittedText.map((s: string) => s.split(" ").map(s => Number(s))).filter((l: number[]) => l.length > 0);    
}