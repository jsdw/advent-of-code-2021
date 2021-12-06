import { fold } from '../utils'

export let star1: ThrowingSolver = (input) => {
    let numbers = input.trim().split(',').map(n => parseInt(n, 10))

    let fishes = groupByAge(numbers)
    for (let i = 0; i < 80; i++) {
        fishes = step(fishes)
    }

    return fold(fishes.values(), 0, (n, c) => n + c)
}

export let star2: ThrowingSolver = (input) => {
    let numbers = input.trim().split(',').map(n => parseInt(n, 10))

    let fishes = groupByAge(numbers)
    for (let i = 0; i < 256; i++) {
        fishes = step(fishes)
    }

    return fold(fishes.values(), 0, (n, c) => n + c)
}

function groupByAge(numbers: number[]): Map<number,number> {
    let m = new Map<number,number>()
    for (let number of numbers) {
        let count = m.get(number) || 0
        m.set(number, count+1)
    }
    return m
}

function step(fishes: Map<number,number>) {
    let newFishes = new Map<number,number>()
    for (let [age, count] of fishes.entries()) {
        if (age == 0) {
            newFishes.set(6, count + (newFishes.get(6) || 0))
            newFishes.set(8, count)
        } else {
            newFishes.set(age - 1, count + (newFishes.get(age - 1) || 0))
        }
    }
    return newFishes
}