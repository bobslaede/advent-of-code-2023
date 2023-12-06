const inputFile = Bun.file("03/input.txt");
const input = (await inputFile.text()).split("\n");

const range = (start: number, end: number) => [...Array(1 + end - start).keys()].map(v => start + v);

const numbersWithAdjecantParts = [];

const gears: {
    [gearId: string]: number[]
} = {}

for (const [lineNumber, line] of input.entries()) {
    for (const match of line.matchAll(/(?<number>\d+)/gmi) ?? []) {
        if (match?.groups?.number) {
            const numberOfSpaces = match.groups.number.length;
            const realNumber = parseInt(match.groups.number, 10);
            const index = match.index ?? 0;
            const positionsToCheck = [
                ...range(index - 1, index + numberOfSpaces)
            ]
            const linesToCheck = [
                lineNumber - 1,
                lineNumber,
                lineNumber + 1
            ];

            for (let i of linesToCheck) {
                if (input[i]) {
                    // console.log(`Checking line ${i}`);
                    for (let pos of positionsToCheck) {
                        const chartAtPosition = input[i][pos];
                        if (chartAtPosition === undefined) {
                            continue;
                        }
                        const isDot = chartAtPosition === '.';
                        const isNumber = /\d/.test(chartAtPosition);
                        const isGear = chartAtPosition === '*';
                        if (!isDot && !isNumber && isGear) {
                            const gearId = `${i}-${pos}`;
                            gears[gearId] = [
                                ...gears[gearId] ?? [],
                                realNumber
                            ];
                        }
                    }
                }
            }
        }
    }
}

const correctGears = Object.entries(gears)
    .filter(([gear, numbers]) => numbers.length === 2)
    .map(([gear, [a, b]]) => a * b)

    .reduce((sum, n) => {
        return n + sum;
    }, 0)

console.log(correctGears)