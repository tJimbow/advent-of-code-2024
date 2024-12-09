import { describe, it, expect } from "vitest";
const fs = require("fs");

describe("find xmas", () => {
    it.each([
        {
            toTest: "sxmassxmasaaaxmas",
            expected: 3
        },
        {
            toTest: "sxmassxmasa",
            expected: 2
        },
    ])("should have $expected xmas in $toTest", ({ toTest, expected}) => {
        expect(countXmasFor(toTest)).toBe(expected);
    })

    it("should have 2 revert xmas for asamxssamxs", () => {
        expect(countReverseXmasFor("asamxssamxs")).toBe(2);
    })

    it("should have 4 xmas for samxaxmasxmasasamx", () => {
        expect(countReverseOrNotXmasFor("samxaxmasxmasasamx")).toBe(4);
    })

    it("should convert line from file into array of characters", () => {
        expect(transformTextIntoArrayOfCharacters("samx\nxmas\nsamx")).toEqual([
            ["s", "a", "m", "x"],
            ["x", "m", "a", "s"],
            ["s", "a", "m", "x"],
        ])
    });

    it("should count three xmas for ssamxs\nsxmass\nssamx", () => {
        expect(allXmasFor("ssamxs\nsxmass\nssamx")).toBe(3);
    })

    it("should reverse lines to columns", () => {
        expect(reverseTable([
            ["s", "x", "s"],
            ["a", "m", "a"],
            ["m", "a", "m"],
            ["m", "s", "x"],
        ])).toEqual([
            ["s", "a", "m", "m"],
            ["x", "m", "a", "s"],
            ["s", "a", "m", "x"],
        ]);
    });

    it("should count verticaly two xmas for sxs\nama\nmam\nmsx", () => {
        expect(allXmasFor("sxs\nama\nmam\nmsx")).toBe(2);
    });

    it("should create array of diagonal christmas", () => {
        expect(diagonalTableOfCharacters([
            ["s", "m", "a", "s", "m"],
            ["s", "x", "a", "s", "m"],
            ["s", "a", "m", "s", "m"],
            ["s", "m", "m", "a", "m"],
            ["s", "m", "a", "x", "s"],
            ["s", "m", "a", "s", "m"],
            ["s", "m", "a", "s", "m"],
        ])).toEqual([
            ["s", "x", "m", "a", "s"],
            ["m", "a", "s", "m"],
            ["a", "s", "m"],
            ["s", "m"],
            ["m"],
            ["s", "a", "m", "x", "m"],
            ["s", "m", "a", "s", "m"],
            ["s", "m", "a", "s"],
            ["s", "m", "a"],
            ["s", "m"],
            ["s"]
        ]);
    });

    it("should count diagonal xmas 2 for smasm\nsxasm\nsamsm\nsmmam\nsmaxs\nsmasm\nsmasm", () => {
        expect(allXmasFor("smasm\nsxasm\nsamsm\nsmmam\nsmaxs\nsmasm\nsmasm")).toBe(2);
    });


    it("should count diagonal xmas 2 for smasm\nsxasm\nsamsm\nsmmam\nsmaxs\nsmasm\nsmasm", () => {
        expect(allXmasFor(".....\n....x\n...m.\n..as.\n.sa..\n.m...\nx....")).toBe(2);
    });

    it(() => {
        const toTest = "MMMSXXMASM\nMSAMXMSMSA\nAMXSXMAAMM\nMSAMASMSMX\nXMASAMXAMM\nXXAMMXXAMA\nSMSMSASXSS\nSAXAMASAAA\nMAMMMXMMMM\nMXMXAXMASX";
    
        expect(allXmasFor(toTest)).toBe(18)
    })

    it("should read file and count xmas verticaly horizontaly and diagonal", () => {
        const text = fs.readFileSync("./tests/challenge4_input.txt", "utf8");
        
        expect(allXmasFor(text)).toBe(2517)
    });
})
const diagonalTableOfCharacters = (characterLines: string[][]) => {
    const toReturn: string[][] = [];
    let nbLinesColRow = 0;

    characterLines[0].forEach((character, index) =>{
        toReturn[nbLinesColRow] = [character];

        characterLines.slice(1).forEach((line, i) => {
            if(line[index+i+1]) {
                toReturn[nbLinesColRow].push(line[index+i+1]);
            }
        })
        
        nbLinesColRow++;
    })

    characterLines.slice(1).forEach((line, index) => {
        toReturn[nbLinesColRow] = [line[0]];

        characterLines.slice(index+2).forEach((l, i) => {
            if(l[i+1]) {
                toReturn[nbLinesColRow].push(l[i+1]);
            }
        })
        
        nbLinesColRow++;
    })

    return toReturn;
}

const reverseTable = (characters: string[][]): string[][] => {
    return characters.reduce((acc: string[][], line: string[]) => {
        for(let characterIndex = 0; characterIndex < line.length; characterIndex++) {
            if(acc[characterIndex] === undefined) {
                acc[characterIndex] = [];
            }

            acc[characterIndex].push(line[characterIndex]);
        }

        return acc;
    }, []);
}

const diagonalCount = (arrayOfCharacters: string[][]) => {
    const diagonal = diagonalTableOfCharacters(arrayOfCharacters);
    const reverseDiagonale = diagonalTableOfCharacters([...arrayOfCharacters].reverse());
    return horizontallyCount(diagonal) + horizontallyCount(reverseDiagonale);
}

const verticalyCount = (arrayOfCharacters: string[][]) => {
    const reverse = reverseTable(arrayOfCharacters);

    return horizontallyCount(reverse);
} 

const horizontallyCount = (arrayOfCharacters: string[][]) => arrayOfCharacters.reduce((acc: number, line: string[]) => {
    return countReverseOrNotXmasFor(line.join("")) + acc;
}, 0);

const allXmasFor = (fileText: string) => {
    const arrayOfCharacters = transformTextIntoArrayOfCharacters(fileText);

    return horizontallyCount(arrayOfCharacters) + verticalyCount(arrayOfCharacters) + diagonalCount(arrayOfCharacters);
}

const countReverseOrNotXmasFor = (text: string): number => 
    countXmasFor(text.toLowerCase()) + countReverseXmasFor(text.toLowerCase());


const countReverseXmasFor = (text: string): number =>
    countXmasFor(text.split("").reverse().join(""));


const countXmasFor = (text: string): number => 
    (text.match(/xmas/g) || []).length


const transformTextIntoArrayOfCharacters = (text: string) => {
    return text.split("\n").map(line => line.split(""));
}

