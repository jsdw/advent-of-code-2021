import { KeyedMap } from '../utils'

export let star1: ThrowingSolver = (input) => {
    type Dice = Generator<number,void,unknown>
    function *deterministicDice(): Dice {
        for (let n = 1;; n++) {
            yield n
            if (n === 100) n = 0
        }
    }

    function nextPosition(position: number, dice: Dice): number {
        let pos = position + dice.next().value! + dice.next().value! + dice.next().value!
        return rotatePosition(pos)
    }

    let positions = parseInput(input)
    let scores = [0,0]
    let dice = deterministicDice()
    let player = 0
    let turns = 0

    while (scores[0] < 1000 && scores[1] < 1000) {
        let nextPos = nextPosition(positions[player], dice)
        scores[player] += nextPos
        positions[player] = nextPos
        player = player == 0 ? 1 : 0
        turns++
    }

    let losingScore = scores[0] < 1000 ? scores[0] : scores[1]
    return turns * 3 * losingScore
}

export let star2: ThrowingSolver = (input) => {
    let positions = parseInput(input)

    let table = diracState()
    let wins = [0,0]

    // Insert our starting entry:
    table.set({
        players: [{ score: 0, position: positions[0] }, { score: 0, position: positions[1] }],
        nextPlayer: 0
    }, 1)

    while (table.size) {
        let [entry, count] = popEntry(table)!
        let currentPlayerIdx = entry.nextPlayer
        let currentPlayer = entry.players[currentPlayerIdx]
        for (let nextPos of nextDiracPositions(currentPlayer.position)) {
            let nextScore = currentPlayer.score + nextPos
            if (nextScore >= 21) {
                wins[currentPlayerIdx] += count
            } else {
                entry.players[currentPlayerIdx] = { position: nextPos, score: nextScore }
                entry.nextPlayer = currentPlayerIdx == 0 ? 1 : 0
                let nextCount = (table.get(entry) || 0) + count
                table.set(entry, nextCount)
            }
        }
    }

    return Math.max(...wins)
}

// Note that we have a finite number of combinations of different player scores and positions,
// so we can store them all in a big table against a count of them.
type DiracState = KeyedMap<DiracEntry,number,string>

// Each player's current state, and a 0 or 1 for which players turn is due next
type DiracEntry = { players: [DiracPlayer, DiracPlayer], nextPlayer: number }
type DiracPlayer = { score: number, position: number }

function diracState(): DiracState {
    return new KeyedMap(
        // scores 0-21, positions 1-10, so easy to encode as a string:
        ({ players, nextPlayer }) =>
                   String.fromCharCode(players[0].score)
                 + String.fromCharCode(players[0].position)
                 + String.fromCharCode(players[1].score)
                 + String.fromCharCode(players[1].position)
                 + String.fromCharCode(nextPlayer),
        (s) => ({
            players: [
                { score: s.charCodeAt(0), position: s.charCodeAt(1) },
                { score: s.charCodeAt(2), position: s.charCodeAt(3) },
            ],
            nextPlayer: s.charCodeAt(4)
        })
    )
}

function *nextDiracPositions(p: number): Generator<number,void,unknown> {
    for (let i = 1; i <= 3; i++) {
        for (let j = 1; j <= 3; j++) {
            for (let k = 1; k <= 3; k++) {
                yield rotatePosition(p+i+j+k)
            }
        }
    }
}

function popEntry(table: DiracState): [DiracEntry,number] | undefined {
    let entry = table.entries().next().value
    if (!entry) return
    table.delete(entry[0])
    return entry
}

function rotatePosition(position: number): number {
    return (position - 1) % 10 + 1
}

function parseInput(input: string): [number,number] {
    return input
        .split('\n')
        .map(line => parseInt(line.match(/position: ([0-9]+)/)![1])) as [number,number]
}