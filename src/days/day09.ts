import { enumerate, fold } from '../utils' 

export let star1: ThrowingSolver = (input) => {
    let grid = parseInput(input)
    let adjacent = adjacentMaker(grid)

    let risk = 0
    for (let { x, y, val } of iterGrid(grid)) {
        let isSmallest = fold(adjacent(x, y), true, (b, [x2,y2]) => b && grid[y2][x2] > val)
        if (isSmallest) risk += val+1
    }

    return risk
}

export let star2: ThrowingSolver = (input) => {
    let grid = parseInput(input)
    let adjacent = adjacentMaker(grid)

    let basinSizes: number[] = []
    for (let { x, y, val } of iterGrid(grid)) {
        let isSmallest = fold(adjacent(x, y), true, (b, [x2,y2]) => b && grid[y2][x2] > val)
        if (!isSmallest) continue
        basinSizes.push(findBasin(x, y, grid).size)
    }

    basinSizes.sort((a,b) => b > a ? -1 : 1)
    return basinSizes.pop()! * basinSizes.pop()! * basinSizes.pop()!
}

function findBasin(x: number, y: number, grid: number[][]) {
    let adjacent = adjacentMaker(grid)
    let basinCoords = new Set<string>()

    function inner(x: number, y: number) {
        for(let [x2,y2] of adjacent(x, y)) {
            let key = `${x2},${y2}`
            if (grid[y2][x2] != 9 && !basinCoords.has(key)) {
                basinCoords.add(key)
                inner(x2, y2)
            }
        }
    }

    inner(x,y)
    return basinCoords
}

function* iterGrid(grid: number[][]): Generator<{x: number, y: number, val: number},void,unknown> {
    for (let [y,row] of enumerate(grid)) {
        for (let [x,val] of enumerate(row)) {
            yield { x, y, val }
        }
    }
}

function adjacentMaker(grid: number[][]) {
    let width = grid[0].length
    let height = grid.length

    return function* coords(x: number, y: number): Generator<[number,number],void,unknown> {
        if (x-1 >= 0) yield [x-1, y]
        if (y-1 >= 0) yield [x, y-1]
        if (x+1 < width) yield [x+1, y]
        if (y+1 < height) yield [x, y+1]
    } 
}

function parseInput(input: string): number[][] {
    return input
        .trim()
        .split('\n')
        .map(line => line.trim().split('').map(d => parseInt(d, 10)))
}