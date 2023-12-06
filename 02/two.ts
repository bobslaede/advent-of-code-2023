const inputFile = Bun.file("02/input.txt");
const input = (await inputFile.text()).split("\n");

const cubesRegex = /((?<blue>\d{0,2}) blue)|((?<red>\d{0,2}) red)|((?<green>\d{0,2}) green)/gim;

const games = input
    .map(line => {
        const gameData = /^Game (?<id>\d{0,3})\: (?<runs>.*)$/.exec(line)?.groups
        return gameData as {
            id: string,
            runs: string
        };
    })
    .filter(gameData => !!gameData)
    .map(gameData => {
        const runs = gameData.runs;

        const allMatches = [...runs.matchAll(cubesRegex)]
            .reduce((all, match) => {
                if (match.groups) {
                    let { red, green, blue } = match.groups;
                    let r = parseInt(red, 10);
                    let g = parseInt(green, 10);
                    let b = parseInt(blue, 10);

                    return {
                        red: Math.max(all.red, Number.isNaN(r) ? 0 : r),
                        green: Math.max(all.green, Number.isNaN(g) ? 0 : g),
                        blue: Math.max(all.blue, Number.isNaN(b) ? 0 : b),
                    }
                }
                return all;
            }, {
                red: 0,
                blue: 0,
                green: 0
            })

        return {
            id: parseInt(gameData.id, 10),
            runs: allMatches
        }
    })

const gamesSum = games
    .map(game => {
        const {red, green, blue} = game.runs;

        const power = red * green * blue;
        console.log(`power of game ${game.id} is ${power}`)
        return power;
    })
    .reduce((sum, res) => {
        return res + sum;
    }, 0)

console.log('Sum of power of cubes in games', gamesSum);

