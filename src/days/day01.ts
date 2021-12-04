import { map, windows, collect } from '../utils'

export let star1: Solver = (input) => {
    let numbers: number[] = input.split('\n')
        .map(line => parseInt(line.trim(), 10))

    let increases = 0;
    for (let [a, b] of windows(2, numbers)) {
        if (b > a) increases++
    }

    return {
        kind: 'success',
        value: increases
    }
}

export let star2: Solver = (input) => {
    let numbers: number[] = input.split('\n')
        .map(line => parseInt(line.trim(), 10))

    let sums = map(windows(3, numbers), ([a,b,c]) => a+b+c)

    let increases = 0;
    for (let [a, b] of windows(2, collect(sums))) {
        if (b > a) increases++
    }

    return {
        kind: 'success',
        value: increases
    }
}