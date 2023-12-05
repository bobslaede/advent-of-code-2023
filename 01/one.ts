const inputFile = Bun.file("01/input.txt");
const inputString = await inputFile.text();

const result = inputString.split("\n")
    .map(line => line.replace(/[^\d]/g, ''))
    .map(l => {
        return l;
    })
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