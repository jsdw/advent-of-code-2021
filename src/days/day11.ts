import { enumerate, KeyedSet } from '../utils' 

export let star1: ThrowingSolver = (input) => {
    let grid = parseInput(input)
    let flashes = 0
    for (let i = 0; i < 100; i++) {
        let next = step(grid)
        grid = next.grid
        flashes += next.flashes
    }
    return flashes
}

export let star2: ThrowingSolver = (input) => {
    let grid = parseInput(input)
    for (let i = 1;; i++) {
        let next = step(grid)
        grid = next.grid
        if (next.flashes === 100) return i
    }
}

function step(grid: readonly number[][]): { grid: number[][], flashes: number } {
    let next = clone(grid)
    let adjacent = adjacentMaker(grid)

    // Increment energy levels
    for (let { x, y, val } of iterGrid(grid)) {
        next[y][x] = val + 1
    }

    // Flash if greater than 9, recursively
    let flashedCoords = new KeyedSet(
        ([x,y]: [number,number]) => `${x},${y}`,
        (key) => key.split(',').map(n => parseInt(n,10)) as [number,number]
    )
    function tryFlash(x: number, y: number) {
        if (next[y][x] > 9 && !flashedCoords.has([x,y])) {
            flashedCoords.add([x,y])
            for (let [x2,y2] of adjacent(x,y)) {
                next[y2][x2] += 1
                tryFlash(x2,y2)
            }
        }
    }
    for (let { x, y } of iterGrid(next)) {
        tryFlash(x, y)
    }

    // Set energy to 0 for all flashed octopodes
    for (let [x,y] of flashedCoords) {
        next[y][x] = 0
    }

    return { grid: next, flashes: flashedCoords.size }
}

function* iterGrid(grid: readonly number[][]): Generator<{x: number, y: number, val: number},void,unknown> {
    for (let [y,row] of enumerate(grid)) {
        for (let [x,val] of enumerate(row)) {
            yield { x, y, val }
        }
    }
}

function clone(grid: readonly number[][]): number[][] {
    return grid.map(row => row.slice())
}

function adjacentMaker(grid: readonly number[][]) {
    let width = grid[0].length
    let height = grid.length

    function isInRange(x: number, y: number): boolean {
        return x >= 0 && x < width && y >= 0 && y < height
    }
    function* yieldIfInRange(x: number, y: number): Generator<[number,number],void,unknown> {
        if (isInRange(x, y)) yield [x, y]
    }
    return function* coords(x: number, y: number): Generator<[number,number],void,unknown> {
        yield *yieldIfInRange(x-1, y-1)
        yield *yieldIfInRange(x, y-1)
        yield *yieldIfInRange(x+1, y-1)
        yield *yieldIfInRange(x-1, y)
        yield *yieldIfInRange(x+1, y)
        yield *yieldIfInRange(x-1, y+1)
        yield *yieldIfInRange(x, y+1)
        yield *yieldIfInRange(x+1, y+1)
    } 
}

function parseInput(input: string): number[][] {
    return input
        .trim()
        .split('\n')
        .map(line => line.trim().split('').map(n => parseInt(n,10)))
}