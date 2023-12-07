const inputFile = Bun.file("04/input.txt");
const input = (await inputFile.text()).split("\n");

const points = input.map(line => {
    const [card, numbers] = line.split(':');
    let [winningPart, myNumbersPart] = numbers.split('|');

    let winningNumbers = winningPart.split(' ').filter(x => !!x.trim()).map(s => parseInt(s.trim(), 10));
    let myNumbers = myNumbersPart.split(' ').filter(x => !!x.trim()).map(s => parseInt(s.trim(), 10));

    let myWinningNumbers = winningNumbers
        .filter(n => myNumbers.includes(n));


    let numberOfWinningNumbers = myWinningNumbers.length;

    if (numberOfWinningNumbers === 0) {
        return 0;
    }

    let myPoints = myWinningNumbers
        .slice(1)
        .reduce((sum, currentWinningNumber, index) => {
            return sum * 2;
        }, 1)


    return myPoints;
})
.reduce((sum, p) => sum + p, 0)

console.log(points);
