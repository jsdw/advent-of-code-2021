import { arrayOf, fold, enumerate, last, map, zip } from '../utils'

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
type Board = Map<number, Position> & { readonly width: number, readonly height: number }

function createBoard(numbers: number[][]): Board {
    let height = numbers.length
    let width = numbers[0].length
    let board: Board = new Map<number,Position>() as Board

    for (let y = 0; y < height; y++) {
        let row = numbers[y]
        for(let x = 0; x < width; x++) {
            let number = row[x]
            board.set(number, { x, y })
        }
    }

    (board as any).width = width;
    (board as any).height = height;
    return board
}

function parseInput(input: string): { numbers: number[], boards: Board[] } {
    let lines: string[] = input.trim().split('\n')

    // The list of numbers along the top:
    let numbers = lines[0].split(',').map(n => parseInt(n.trim(), 10))
    
    // Group together the lines for the boards:
    let boards: Board[] = []
    let boardValues: number[][] = []
    for (let line of map(lines.slice(1), l => l.trim())) {
        if (line.length == 0) {
            if (boardValues.length) boards.push(createBoard(boardValues))
            boardValues = []
        } else {
            boardValues.push(line.split(/\s+/).map(n => parseInt(n, 10)))
        }
    }
    return { numbers, boards }
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
        for (let [i, [board, seen]] of enumerate(zip(boards, seenPositions))) {
            // Once a board has won, skip it:
            if (winners.has(i)) continue;

            // Does this board have the number we want?
            let position = board.get(number)
            if (!position) continue

            // We found a number on the board; note its position!
            seen.push(position)

            // Do these positions constitute a winning line?
            if (isWinningLine(board.width, board.height, seen)) {
                // Note the winner we've found.
                winners.add(i)
                // Sum up unmarked numbers, multiply by winning number.
                let sum = fold(board.entries(), 0, (sum, [number, { x, y }]) => {
                    return seen.find(p => p.x == x && p.y == y)
                        ? sum
                        : sum + number
                })
                yield sum * number
            }
        }
    }
}