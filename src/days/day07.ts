import {smallestFirst } from '../utils'

export let star1: ThrowingSolver = (input) => {
    let ns = input.trim().split(',').map(n => parseInt(n, 10))
    return calcBestFuel(ns, (n, pos) => Math.abs(n - pos))
}

export let star2: ThrowingSolver = (input) => {
    let ns = input.trim().split(',').map(n => parseInt(n, 10))
    return calcBestFuel(ns, (n, pos) => {
        let [a, b] = smallestFirst(n, pos)
        let distance = b - a
        return(distance + 1) / 2 * distance
    })
}

function calcBestFuel(ns: number[], cost: (n: number, pos: number) => number): number {
    let [min, max] = ns.reduce(([min,max], n) => [Math.min(min,n),Math.max(max,n)], [0,0])
    let bestFuel = Number.MAX_SAFE_INTEGER

    for (let i = min; i < max; i++) {
        let fuel = ns.reduce((c,n) => c + cost(n, i), 0)
        if (fuel < bestFuel) bestFuel = fuel
        // Optimisation; it's a curve with a low point in the middle.
        // can stop when fuel use starts getting worse again.
        if (fuel > bestFuel) break
    }

    return bestFuel
}