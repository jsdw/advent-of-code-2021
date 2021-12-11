import { match, strictEq } from "../utils"

export let star1: ThrowingSolver = (input) => {
    let lines = input.trim().split('\n').map(line => line.trim())

    let score = 0
    for (let line of lines) {
        let res = getOpeners(line)
        if (res.kind == 'err') {
            score += match(res.char, [
                [strictEq(')'), () => 3],
                [strictEq(']'), () => 57],
                [strictEq('}'), () => 1197],
                [strictEq('>'), () => 25137],
            ]) || 0
            continue
        }
    }

    return score
}

export let star2: ThrowingSolver = (input) => {
    let lines = input.trim().split('\n').map(line => line.trim())

    let scores = []
    for (let line of lines) {
        let res = getOpeners(line)
        if (res.kind == 'incomplete') {
            let score = 0
            for (opener of res.openers.reverse()) {
                let points = match(opener, [
                    [strictEq('('), () => 1],
                    [strictEq('['), () => 2],
                    [strictEq('{'), () => 3],
                    [strictEq('<'), () => 4],
                ]) || 0;
                score = score * 5 + points
            }
            scores.push(score)
        }
    }

    // Sort scores and take the middle one (odd number expected)
    scores.sort((a,b) => a < b ? -1 : 1)
    return scores[Math.floor(scores.length / 2)]
}

function getOpeners(line: string): { kind: 'incomplete', openers: string[] } | { kind: 'err', char: string } {
    let openers = []
    for (let char of line) {
        if (['(','{','<','['].includes(char)) {
            openers.push(char)
        } else if ([')','}','>',']'].includes(char)) {
            let matching = match(char, [
                [strictEq(')'), () => '('],
                [strictEq(']'), () => '['],
                [strictEq('}'), () => '{'],
                [strictEq('>'), () => '<'],
            ]) || ''
            let lastOpener = openers.pop()
            if (matching !== lastOpener) {
                return { kind: 'err', char }
            }
        }
    }
    return { kind: 'incomplete', openers }
}