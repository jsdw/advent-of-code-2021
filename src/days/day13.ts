import { KeyedSet, fold } from '../utils'

export let star1: ThrowingSolver = (input) => {
    let { points, folds } = parseInput(input)
    return step(points, folds[0]).size
}

export let star2: ThrowingSolver = (input) => {
    let { points, folds } = parseInput(input)

    for (let fold of folds) {
        points = step(points, fold)
    }

    console.log(drawPoints(points))
    return "Look in dev console.."
}

function drawPoints(points: Points): string {
    let [xMax, yMax] = fold(points, [0,0], 
        ([x1,y1], [x2,y2]) => [Math.max(x1,x2), Math.max(y1,y2)]
    )
    let s = ''
    for (let y = 0; y <= yMax; y++) {
        for (let x = 0; x <= xMax; x++) {
            if (points.has([x,y])) {
                s += '#'
            } else {
                s += '.'
            }
        }
        s += '\n'
    }
    return s
}

function step(points: Points, fold: Fold): Points {
    let newPoints = set()
    if (fold.to == 'up') {
        for (let [x,y] of points) {
            if (y < fold.y) newPoints.add([x,y])
            else if (y > fold.y) newPoints.add([x,fold.y - (y - fold.y)])
        }
    } else {
        for (let [x,y] of points) {
            if (x < fold.x) newPoints.add([x,y])
            else if (x > fold.x) newPoints.add([fold.x - (x - fold.x),y])
        }
    }
    return newPoints
}

type Points = KeyedSet<[number,number], string>
type Fold 
    = { to: 'up', y: number }
    | { to: 'left', x: number }

function parseInput(input: string): { points: Points, folds: Fold[] } {
    let [pointStr, foldStr] = input.trim().split('\n\n')
    let points = set()
    pointStr
        .trim()
        .split('\n')
        .map(xy => xy.split(',').map(n => parseInt(n, 10)) as [number,number])
        .forEach(xy => points.add(xy))
    
    let folds = foldStr
        .trim()
        .split('\n')
        .map(line => {
            let [_,xy,nStr] = line.match(/([xy])=([0-9]+)/)!;
            let n = parseInt(nStr, 10)
            return xy == 'x' 
                ? { to: 'left' as const, x: n }
                : { to: 'up' as const, y: n }
        })
    return { points, folds }
}

function set(): KeyedSet<[number,number], string> {
    return new KeyedSet(
        ([x,y]) => `${x},${y}` as string,
        (key) => key.split(',').map(n => parseInt(n, 10)) as [number,number]
    )
}
