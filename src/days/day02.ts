export let star1: ThrowingSolver = (input) => {
    let cmds = parseInput(input)

    let x = 0
    let y = 0
    for (let cmd of cmds) {
        if (cmd.direction == 'forward') {
            x += cmd.amount
        } else if (cmd.direction == 'down') {
            y += cmd.amount
        } else if (cmd.direction == 'up') {
            y -= cmd.amount
        }
    }

    return x * y
}

export let star2: ThrowingSolver = (input) => {
    let cmds = parseInput(input)

    let x = 0
    let y = 0
    let aim = 0
    for (let cmd of cmds) {
        if (cmd.direction == 'forward') {
            x += cmd.amount
            y += aim * cmd.amount
        } else if (cmd.direction == 'down') {
            aim += cmd.amount
        } else if (cmd.direction == 'up') {
            aim -= cmd.amount
        }
    }

    return x * y
}

function parseInput(input: string): Command[] {
    let cmds: Command[] = []
    for (let line of input.trim().split('\n')) {
        let arr = line.trim().match(/(forward|up|down)\s+([0-9]+)/)
        console.log(line, arr)
        if (!arr) continue
        cmds.push({ 
            direction: arr[1] as Direction,
            amount: Number(arr[2])
        })
    }
    return cmds
}

type Direction = 'forward' | 'up' | 'down'

type Command = { 
    direction: Direction, 
    amount: number 
}