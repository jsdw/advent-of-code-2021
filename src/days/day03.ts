export let star1: Solver = (input) => {
    let lines = input.trim().split('\n').map(line => line.trim())

    let gammaBits = mostCommonBits(lines).map(z => z == '0' ? 0 : 1).join('')
    let epsilonBits = mostCommonBits(lines).map(z => z == '0' ? 1 : 0).join('')

    let gamma = parseInt(gammaBits, 2)
    let epsilon = parseInt(epsilonBits, 2)

    return {
        kind: 'success',
        value: gamma * epsilon
    }
}

export let star2: Solver = (input) => {
    let lines = input.trim().split('\n').map(line => line.trim())
    let n = lines[0].length
    
    let o2GenLines = lines.slice()
    for (let i = 0; i < n; i++) {
        let mostCommon = mostCommonBit(o2GenLines, i)
        o2GenLines = o2GenLines.filter(l => (
            mostCommon == '=' ? l[i] == '1' : mostCommon == l[i]
        ))
        if (o2GenLines.length == 1) break
    }

    let co2ScrubberLines = lines.slice()
    for (let i = 0; i < n; i++) {
        let mostCommon = mostCommonBit(co2ScrubberLines, i)
        co2ScrubberLines = co2ScrubberLines.filter(l => (
            mostCommon == '=' ? l[i] == '0' : mostCommon != l[i]
        ))
        if (co2ScrubberLines.length == 1) break
    }

    return {
        kind: 'success',
        value: parseInt(o2GenLines[0], 2) * parseInt(co2ScrubberLines[0], 2)
    }
}

function mostCommonBits(lines: string[]): ('0' | '1' | '=')[] {
    let n = lines[0].length
    let mostCommon: ('0' | '1' | '=')[] = []
    for (let i = 0; i < n; i++) {
        mostCommon.push(mostCommonBit(lines, i))
    }
    return mostCommon
}

function mostCommonBit(lines: string[], i: number): '0' | '1' | '=' {
    let n = lines[0].length

    let zeros = 0
    let ones = 0
    for (let line of lines) {
        if (line[i] == '1') {
            ones += 1
        } else {
            zeros += 1
        }
    }

    return zeros > ones ? '0' 
         : zeros < ones ? '1' 
         : '='
}