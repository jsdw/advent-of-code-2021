export let star1: ThrowingSolver = (input) => {
    let pairs = parseInput(input)
    let pair = pairs.reduce(add)

    return magnitude(pair)
}

export let star2: ThrowingSolver = (input) => {
    let pairs = parseInput(input)

    let bestMagnitude = 0
    for (let i = 0; i < pairs.length; i++) {
        for (let j = 0; j < pairs.length; j++) {
            if (i === j) continue
            let m = magnitude(add(pairs[i], pairs[j]))
            if (m > bestMagnitude) bestMagnitude = m
        }
    }

    return bestMagnitude
}

function magnitude(pair: Pair): number {
    function leftMagnitude(pair: Pair): number {
        if (Array.isArray(pair)) {
            return leftMagnitude(pair[0]) * 3 + rightMagnitude(pair[1]) * 2
        } else {
            return pair
        }
    }
    function rightMagnitude(pair: Pair): number {
        if (Array.isArray(pair)) {
            return leftMagnitude(pair[0]) * 3 + rightMagnitude(pair[1]) * 2
        } else {
            return pair
        }
    }
    return leftMagnitude(pair)
}

function add(left: Pair, right: Pair): Pair {
    return reducePair([left,right])
}

function reducePair(pair: Pair): Pair {
    // Helpers to add values to leftmost or rightmost numbers in pairs
    function addToLeftmost(pair: Pair, value: number): Pair {
        if (Array.isArray(pair)) {
            return [addToLeftmost(pair[0], value), pair[1]]
        } else {
            return pair + value
        }
    }
    function addToRightmost(pair: Pair, value: number): Pair {
        if (Array.isArray(pair)) {
            return [pair[0], addToRightmost(pair[1], value)]
        } else {
            return pair + value
        }
    }

    // Stop after the first reduction is made
    let hasReduced = false

    function splitPair(pair: Pair): Pair {
        // Only do 1 split at a time before we try exploding again:
        if (hasReduced) return pair

        if (Array.isArray(pair)) {
            return [splitPair(pair[0]), splitPair(pair[1])]
        } else if (typeof pair === "number" && pair >= 10) {
            hasReduced = true
            return [Math.floor(pair/2), Math.ceil(pair/2)]
        } else {
            return pair
        }
    }

    function explodePair(pair: Pair): Pair {
        function explodePairAtDepth(pair: Pair, depth: number): { new: Pair, addToLeft?: number, addToRight?: number } {
            if (Array.isArray(pair) && depth < 4) {
                // Recurse in to left side of pair, and add digit to right side if needed.
                let left = explodePairAtDepth(pair[0], depth+1)
                pair = [left.new, pair[1]]
                if (left.addToRight) {
                    pair[1] = addToLeftmost(pair[1], left.addToRight)
                }

                // Recurse in to right side of pair and add digit to left if needed.
                let right = explodePairAtDepth(pair[1], depth+1)
                pair = [pair[0], right.new]
                if (right.addToLeft) {
                    pair[0] = addToRightmost(pair[0], right.addToLeft)
                }

                // We recursed both sides, left then right, and applied any additions we could
                // at this level. Hand back up any additions we could not apply.
                return { new: pair, addToLeft: left.addToLeft, addToRight: right.addToRight }
            }
            // Explode a pair of numbers found at depth 4
            else if (Array.isArray(pair) && depth == 4 && typeof pair[0] === "number" && typeof pair[1] === "number") {
                hasReduced = true
                return { new: 0, addToLeft: pair[0], addToRight: pair[1] }
            }

            // Nothing happened at this depth
            return { new: pair }
        }
        return explodePairAtDepth(pair, 0).new
    }


    // Keep reducing until no more reducing occurs:
    do {
        hasReduced = false
        pair = explodePair(pair)
        pair = splitPair(pair)
    } while (hasReduced)

    return pair
}

type Pair = [Pair,Pair] | number

function parseInput(input: string): Pair[] {
    return input.trim().split('\n').map(line => JSON.parse(line))
}