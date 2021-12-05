import { arrayOf, fold, enumerate, last } from '../utils'

export let star1: ThrowingSolver = (input) => {
    let { numbers, boards } = parseInput(input)

    let val = winningValues(numbers, boards).next().value

    if (typeof val === "number") {
        return val
    } else {
        throw "Winning board not found"
    }
}

export let star2: ThrowingSolver = (input) => {
    let { numbers, boards } = parseInput(input)

    let val = last(winningValues(numbers, boards))

    if (typeof val === "number") {
        return val
    } else {
        throw "Winning board not found"
    }
}

type Position = { x: number, y: number }
class Board {
    #numberToPosition: Map<number, Position>

    readonly height: number
    readonly width: number

    constructor(numbers: number[][]) {
        let height = numbers.length
        let width = numbers[0].length
        let numberToPosition = new Map<number,Position>()
    
        for (let y = 0; y < height; y++) {
            let row = numbers[y]
            for(let x = 0; x < width; x++) {
                let number = row[x]
                numberToPosition.set(number, { x, y })
            }
        }

        this.#numberToPosition = numberToPosition
        this.height = height
        this.width = width
    }

    getPosition(num: number): Position | undefined {
        return this.#numberToPosition.get(num)
    }
    *values() {
        for (let [number, position] of this.#numberToPosition.entries()) {
            yield [position, number] as const
        }
    }
}

// Turn input string into something more useful to work with
function parseInput(input: string): { numbers: number[], boards: Board[] } {
    let lines: string[] = input.trim().split('\n')

    // The list of numbers along the top:
    let numbers = lines[0].split(',').map(n => parseInt(n.trim(), 10))
    
    // Group together the lines for the boards:
    let boards: Board[] = []
    let boardGroup: number[][] = []
    for (let i = 1; i < lines.length; i++) {
        let line = lines[i].trim()
        if (line.length == 0) {
            if (boardGroup.length) boards.push(new Board(boardGroup))
            boardGroup = []
        } else {
            boardGroup.push(line.split(/\s+/).map(n => parseInt(n, 10)))
        }
    }

    return {
        numbers,
        boards
    }
}

// Given some positions and a board width/height, do we have a winning line?
function isWinningLine(width: number, height: number, positions: Position[]): boolean {
    let xs = new Map<number,number>()
    let ys = new Map<number,number>()
    for (let { x, y } of positions) {
        let n = xs.get(x) || 0
        xs.set(x, n + 1)
        if (n + 1 == width) return true

        n = ys.get(y) || 0
        ys.set(y, n + 1)
        if (n + 1 == height) return true
    }
    return false
}

function* winningValues(numbers: number[], boards: Board[]) {
    // Winners to ignore:
    let winners = new Set<number>()
    // Positions we've seen per board
    let seenPositions = arrayOf(boards.length, () => [] as Position[])

    // Draw each number
    for (let number of numbers) {
        // Check each board for it
        for (let [i, board] of enumerate(boards)) {
            // Once a board has won, skip it:
            if (winners.has(i)) continue;

            // Does this board have the number we want?
            let position = board.getPosition(number)
            if (!position) continue

            // We found a number on the board; note its position!
            seenPositions[i].push(position)

            // Do these positions constitute a winning line?
            if (isWinningLine(board.width, board.height, seenPositions[i])) {
                // Note the winner we've found.
                winners.add(i)
                // Sum up unmarked numbers, multiply by winning number.
                let sum = fold(board.values(), 0, (sum, [{ x, y }, number]) => {
                    return seenPositions[i].find(p => p.x == x && p.y == y)
                        ? sum
                        : sum + number
                })
                yield sum * number
            }
        }
    }
}