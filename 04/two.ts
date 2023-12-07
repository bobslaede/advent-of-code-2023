const inputFile = Bun.file("04/input.txt");
const cards = (await inputFile.text()).split("\n");


type Scratchcard = {
    index: number;
    numberOfWinners: number;
    numberOfCopies: number;
    cardName: string;
}


const scratchcards = cards
    .map((line, index) => {
        const [cardName, numbers] = line.split(':');
        let [winningPart, myNumbersPart] = numbers.split('|');

        let winningNumbers = winningPart.split(' ').filter(x => !!x.trim()).map(s => parseInt(s.trim(), 10));
        let myNumbers = myNumbersPart.split(' ').filter(x => !!x.trim()).map(s => parseInt(s.trim(), 10));

        let myWinningNumbers = winningNumbers
            .filter(n => myNumbers.includes(n));

        return {
            index,
            numberOfCopies: 1,
            numberOfWinners: myWinningNumbers.length,
            cardName
        } satisfies Scratchcard
    });

scratchcards
    .forEach(scratchcard => {
        if (scratchcard.numberOfWinners > 0) {
            const copies = scratchcards.slice(scratchcard.index + 1, scratchcard.index + 1 + scratchcard.numberOfWinners);
            copies.forEach(copy => {
                copy.numberOfCopies += scratchcard.numberOfCopies
            })
        }
    });

const sum = scratchcards
    .reduce((sum, card) => sum + card.numberOfCopies, 0);

console.log(scratchcards, sum);
