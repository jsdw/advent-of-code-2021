import { filter, count, KeyedMap } from '../utils'

export let star1: ThrowingSolver = (input) => {
    let lines = parseInput(input).filter(({from, to}) => {
        return from.x == to.x || from.y == to.y
    })

    let overlaps = new KeyedMap<Point,number,string>(
        (point) => JSON.stringify(point),
        (key) => JSON.parse(key)
    )

    for (let line of lines) {
        for (let point of drawLine(line)) {
            let n = overlaps.get(point) || 0
            overlaps.set(point, n+1)
        }
    }

    return count(filter(overlaps.values(), val => val > 1))
}

export let star2: ThrowingSolver = (input) => {
    let lines = parseInput(input)

    let overlaps = new KeyedMap<Point,number,string>(
        (point) => JSON.stringify(point),
        (key) => JSON.parse(key)
    )

    for (let line of lines) {
        for (let point of drawLine(line)) {
            let n = overlaps.get(point) || 0
            overlaps.set(point, n+1)
        }
    }

    return count(filter(overlaps.values(), val => val > 1))
}

type Line = {
    from: Point,
    to: Point
}

type Point = {
    x: number
    y: number
}

function parseInput(input: string): Line[] {
    return input.trim().split('\n').map(line => {
        let [_,x1,y1,x2,y2] = line.trim().match(/([0-9]+),([0-9]+) -> ([0-9]+),([0-9]+)/)!
        return {
            from: {
                x: parseInt(x1, 10),
                y: parseInt(y1,10)
            },
            to: {
                x: parseInt(x2, 10),
                y: parseInt(y2,10)
            }
        }
    })
}

function* drawLine({from, to}: Line): Generator<Point, void, unknown> {
    let xInc = from.x < to.x ? 1 : from.x > to.x ? -1 : 0
    let yInc = from.y < to.y ? 1 : from.y > to.y ? -1 : 0

    if (xInc != 0) {
        for(let x = from.x, y = from.y; x != to.x + xInc; x += xInc) {
            yield { x, y }
            y += yInc
        }
    } else if (yInc != 0) {
        for(let x = from.x, y = from.y; y != to.y + yInc; y += yInc) {
            yield { x, y }
            x += xInc
        }
    }
}