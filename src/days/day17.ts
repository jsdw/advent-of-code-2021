import { smallestFirst, zip } from '../utils'

export let star1: ThrowingSolver = (input) => {
    let bounds = parseInput(input)

    // It falls in an arc; by 0 it'll have same y velocity as start.
    // next step it'll have y valocity + 1. We assume that y bounds 
    // are negative.
    let yVelocity = Math.abs(bounds.bottom) - 1

    // yVelocity + yVelocity-1 + yVelocity-2 + ... + 1
    let maxY = (((yVelocity - 1) / 2) + 1) * yVelocity

    return maxY
}

export let star2: ThrowingSolver = (input) => {
    let bounds = parseInput(input)

    // Possible y values that would work?
    let minY = bounds.bottom
    let maxY = Math.abs(bounds.bottom)

    // Possible X values that would work?
    let minX = 1
    let maxX = bounds.right

    let count = 0;
    for (let xVelocity = minX; xVelocity <= maxX; xVelocity++) {
        for (let yVelocity = minY; yVelocity <= maxY; yVelocity++) {
            if (fallsWithinBounds(xVelocity,yVelocity,bounds)) count++
        }
    }

    return count
}

function fallsWithinBounds(xVel: number, yVel: number, bounds: Bounds): boolean {
    let x = 0
    let y = 0

    function isWithinBounds() {
        return x >= bounds.left 
            && x <= bounds.right 
            && y <= bounds.top 
            && y >= bounds.bottom
    }

    while (true) {
        x += xVel
        y += yVel
        if (isWithinBounds()) return true

        xVel = Math.max(xVel - 1, 0)
        yVel -= 1

        // Bail as soon as it's clear that we won't hit the target:
        if (xVel == 0 && (x < bounds.left || x > bounds.right)) return false
        if (x > bounds.right || y < bounds.bottom) return false
    }
}

type Bounds = {
    top: number
    left: number
    bottom: number
    right: number
}

function parseInput(input: string): Bounds {
    let [_,xa,xb,ya,yb] = input.match(/(-?[0-9]+)\.\.(-?[0-9]+)[^-0-9]+(-?[0-9]+)\.\.(-?[0-9]+)/)!
    let [x1,x2] = smallestFirst(parseInt(xa,10),parseInt(xb,10))
    let [y1,y2] = smallestFirst(parseInt(ya,10),parseInt(yb,10))
    return {
        top: y2,
        left: x1,
        bottom: y1,
        right: x2
    }
}