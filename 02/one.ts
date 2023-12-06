const inputFile = Bun.file("02/input.txt");
const input = (await inputFile.text()).split("\n");

const maxCubes = {
    red: 12,
    green: 13,
    blue: 14
}

const cubesRegex = /((?<blue>\d{0,2}) blue)|((?<red>\d{0,2}) red)|((?<green>\d{0,2}) green)/gim;

const isGamePossible = (gameData: { id: number, runs: { red: number, green: number, blue: number } }) => {
    const run = gameData.runs;
    let tooManyBlue = run.blue > maxCubes.blue;
    let tooManyGreen = run.green > maxCubes.green;
    let tooManyRed = run.red > maxCubes.red;
    if (tooManyBlue) {
        console.log(`Too many blues in game ${gameData.id} has ${run.blue} only allowed ${maxCubes.blue}`)
    }
    if (tooManyGreen) {
        console.log(`Too many greens in game ${gameData.id} has ${run.green} only allowed ${maxCubes.green}`)
    }
    if (tooManyRed) {
        console.log(`Too many reds in game ${gameData.id} has ${run.red} only allowed ${maxCubes.red}`)
    }
    if (tooManyBlue || tooManyGreen || tooManyRed) {
        return false;
    }
    return true;
}

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
                    let {red, green, blue} = match.groups;
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
    .filter(game => {
        return isGamePossible(game)
    });

const gamesSum = games
    .reduce((sum, gameData) => {
        return gameData.id + sum;
    }, 0)

console.log('Number of possible games', games.length);
console.log('Sum of games possible', gamesSum);

