const inputFile = Bun.file("01/input.txt");
const inputString = await inputFile.text();

const replaceNumbersMap = {
    'one': 'o1e',
    'two': 't2o',
    'three': 'th3ee',
    'four': 'fo4r',
    'five': 'fi5e',
    'six': 's6x',
    'seven': 'se7en',
    'eight': 'ei8ht',
    'nine': 'n9ne',
}


const replaceWordWithNumber = (str: string) => {
    let match = new RegExp(Object.keys(replaceNumbersMap).join('|'), 'gi');
    let matches;
    while (matches = str.match(match)) {
        for (const m of matches) {
            str = str.replaceAll(m, `${replaceNumbersMap[m as unknown as keyof typeof replaceNumbersMap]}`);
        }
    }
    return str;
};

const result = inputString.split("\n")
    .map(replaceWordWithNumber)
    .map(line => line.replace(/[^\d]/g, ''))
    .filter(n => !!n.trim())
    .map((numbersString) => {
        let numbers = numbersString
            .split('');
        let firstNumber = numbers.at(0);
        let lastNumber = numbers.at(-1);
        return parseInt(`${firstNumber}${lastNumber}`, 10);
    })
    .reduce((all, current) => all + current, 0);

console.log(result)