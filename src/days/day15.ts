export let star1: ThrowingSolver = (input) => {
    let grid = parseInput(input)
    
    let riskGrid = grid.map(line => line.map(n => ({ risk: n, totalRisk: Infinity })))
    riskGrid[0][0].totalRisk = 0
    return solveRiskGrid(riskGrid)
}

export let star2: ThrowingSolver = (input) => {
    let grid = parseInput(input)
    
    let riskGrid = buildBiggerRiskGrid(grid)
    riskGrid[0][0].totalRisk = 0
    return solveRiskGrid(riskGrid)
}

type RiskGrid = { risk: number, totalRisk: number }[][] 

function solveRiskGrid(riskGrid: RiskGrid): number {
    riskGrid[0][0].totalRisk = 0

    let adjacent = adjacentMaker(riskGrid)
    let toVisit: [number,number][] = [[0,0]]

    while (toVisit.length > 0) {
        let [x,y] = toVisit.pop()!
        let lastRisk = riskGrid[y][x].totalRisk
        for (let [ax,ay] of adjacent(x,y)) {
            let o = riskGrid[ay][ax]
            if (o.risk + lastRisk < o.totalRisk) {
                o.totalRisk = o.risk + lastRisk
                // A priority queue style thing would be faster..
                toVisit.push([ax,ay])
                // Sort "best" to the back so we can pop them cheaply:
                toVisit.sort(([x1,y1],[x2,y2]) => {
                    let aScore = riskGrid[y1][x1].totalRisk
                    let bScore = riskGrid[y2][x2].totalRisk
                    return aScore < bScore ? 1 : -1
                })
            }
        }
    }

    let lastRow = riskGrid[riskGrid.length - 1]
    let lastVal = lastRow[lastRow.length - 1]
    return lastVal.totalRisk
}

function buildBiggerRiskGrid(grid: number[][]): RiskGrid {
    let tileWidth = grid[0].length
    let tileHeight = grid.length
    let out: RiskGrid = []

    // Risk wraps around from 9 to 1
    function rotateRisk(n: number): number {
        return ((n - 1) % 9) + 1
    }

    // First, make wider
    for (let y = 0; y < tileHeight; y++) {
        let row: { risk: number, totalRisk: number }[] = []
        for (let tile = 0; tile < 5; tile++) {
            for (let x = 0; x < tileWidth; x++) {
                row.push({ 
                    risk: rotateRisk(grid[y][x] + tile),
                    totalRisk: Infinity 
                })
            }
        }
        out.push(row)
    }

    // Next, make taller
    for (let tile = 1; tile < 5; tile++) {
        for (let y = 0; y < tileHeight; y++) {
            out.push(out[y].map(row => ({
                risk: rotateRisk(row.risk + tile),
                totalRisk: Infinity
            })))
        }
    }

    return out
}

function adjacentMaker<T>(grid: T[][]) {
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
        .map(line => line.split('').map(n => parseInt(n, 10)))
}