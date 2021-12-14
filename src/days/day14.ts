import { windows, fold } from '../utils'

export let star1: ThrowingSolver = (input) => {
    let { tpl, mappings, start, end } = parseInput(input)

    for (let i = 0; i < 10; i++) {
        tpl = step(tpl, mappings)
    }
    return score(tpl, start, end)
}

export let star2: ThrowingSolver = (input) => {
    let { tpl, mappings, start, end } = parseInput(input)

    for (let i = 0; i < 40; i++) {
        tpl = step(tpl, mappings)
    }
    return score(tpl, start, end)
}

function score(tpl: Map<string,number>, start: string, end: string): number {
    let [min,max] = fold(count(tpl, start, end).values(), [Infinity,-Infinity], ([a,b], n) => {
        return [Math.min(a,n), Math.max(b,n)]
    })
    return max - min
}

function count(tpl: Map<string,number>, start: string, end: string): Map<string,number> {
    // Sum up count of all elements seen in all pairs
    let m = new Map<string,number>()
    for (let [pair,n] of tpl.entries()) {
        for (let el of pair) {
            m.set(el, (m.get(el) || 0) + n)
        }
    }
    // Now, half all counts because all pairs overlap, 
    // compensating for start/end not overlapping once.
    for (let [el, n] of m.entries()) {
        if (el === start || el === end) n++
        m.set(el, n/2)
    }
    return m
}

function step(tpl: Map<string,number>, mappings: Map<string,string>): Map<string,number> {
    let out = new Map<string,number>()
    for (let [pair,n] of tpl.entries()) {
        let c = mappings.get(pair)
        if (!c) throw `${pair} does not match anything!`
        let [a,b] = pair.split('')
        out.set(`${a}${c}`, (out.get(`${a}${c}`) || 0) + n)
        out.set(`${c}${b}`, (out.get(`${c}${b}`) || 0) + n)
    }
    return out
}

type Input = { 
    /* start element */
    start: string
    /* end element */
    end: string
    /* counts of the pairs we have */
    tpl: Map<string,number>
    /* map from pair to new inserted element */
    mappings: Map<string,string> 
}

function parseInput(input: string): Input {
    let [tplStr, mappingsStr] = input.trim().split('\n\n')

    let tpl = new Map<string,number>() 
    for (let [a,b] of windows(2, tplStr.trim().split(''))) {
        tpl.set(`${a}${b}`, 1)
    }

    let mappings = new Map<string,string>()
    for (let line of mappingsStr.trim().split('\n')) {
        let [a, b] = line.split(' -> ')
        mappings.set(a,b)
    }

    return { tpl, mappings, start: tplStr[0], end: tplStr[tplStr.length - 1] }
}