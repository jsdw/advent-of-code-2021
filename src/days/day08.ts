export let star1: ThrowingSolver = (s) => {
    let lines = parseInput(s)

    let count = 0
    for (let line of lines) {
        for (let digit of line.output) {
            if ([2, 4, 3, 7].includes(digit.length)) count++
        }
    }

    return count
}

export let star2: ThrowingSolver = (s) => {
    let lines = parseInput(s)

    let total = 0
    for (let line of lines) {
        let solved = solveWires(line.input)
        let solvedStr = line.output.map(labels => solved.get(labels)!).join("")
        total += parseInt(solvedStr, 10)
    }

    return total
}

function solveWires(input: Input): Map<string,number> {
    // Known mappings based on length:
    let digit1 = input.find(l => l.length == 2)!
    let digit4 = input.find(l => l.length == 4)!
    let digit7 = input.find(l => l.length == 3)!
    let digit8 = input.find(l => l.length == 7)!
    
    // split up 2, 3, 5... (all length 5)
    let length5s = input.filter(l => l.length == 5)!

    // - Digit 3 contains all of digit 1 (2 and 5 don't)
    let [digit3, length5s1] = removeMatching(length5s, ls => contains(ls, digit1))
    // - Digit 5 contains (Digit 4 - Digit 1)
    let [digit5, length5s2] = removeMatching(length5s1, ls => contains(ls, minus(digit4, digit1)))
    // - Digit 2 is the remaining one.
    let digit2 = length5s2[0]

    // split up 0, 6, 9... (all length 6)
    let length6s = input.filter(l => l.length == 6)!

    // - Digit 6 does not contain all of digit 1.
    let [digit6, length6s2] = removeMatching(length6s, ls => !contains(ls, digit1))
    // - Digit 0 does not contain (Digit 4 - Digit 1)
    let [digit0, length6s3] = removeMatching(length6s2, ls => !contains(ls, minus(digit4, digit1)))
    // - Digit 9 is the remaining one.
    let digit9 = length6s3[0]

    // Return our map of string to digit:
    return new Map([
        [digit0, 0],
        [digit1, 1],
        [digit2, 2],
        [digit3, 3],
        [digit4, 4],
        [digit5, 5],
        [digit6, 6],
        [digit7, 7],
        [digit8, 8],
        [digit9, 9],
    ])
}

// Remove and return the first input matching the predicate fn provided
function removeMatching(inputs: string[], f: (input: string) => boolean): [string, string[]] {
    let match = inputs.filter(f)[0]
    if (typeof match != "string") throw Error("Match not found in " + inputs + " with fn "+f.toString())
    return [match, inputs.filter(i => i != match)]
}

// does a contain b?
function contains(a: string, b: string): boolean {
    for (let char of b) {
        if (!a.includes(char)) return false
    }
    return true
}

// a - b
function minus(a: string, b: string): string {
    let out = ''
    for (let char of a) {
        if (!b.includes(char)) {
            out += char
        }
    }
    return out
}

type Input = [string,string,string,string,string,string,string,string,string,string]
type Output = [string,string,string,string]

function parseInput(input: string): { input: Input, output: Output }[] {
    return input.trim().split('\n').map(line => {
        let [inS, outS] = line.trim().split(' | ')

        let input = inS.split(' ').map(digits => digits.split('').sort().join(''))
        let output = outS.split(' ').map(digits => digits.split('').sort().join(''))

        return {
            input: input as unknown as Input,
            output: output as unknown as Output
        }
    })
}