import { KeyedSet, map, enumerate, collect } from '../utils'

export let star1: ThrowingSolver = (input) => {
    let [mapping, image] = parseInput(input)
    image = enhance(image, mapping, 2)
    return image.size
}

export let star2: ThrowingSolver = (input) => {
    let [mapping, image] = parseInput(input)
    image = enhance(image, mapping, 50)
    return image.size
}

function enhance(image: Canvas, mapping: boolean[], steps: number): Canvas {
    // The "real" input data turns any entirely off position/surround to to on,
    // and any entirely "on" position/surround to be off. The demo data does not
    // do this. Allow the demo data to be provided and assume that this flipping
    // will happen or not based on the first mapping value causing a flip or not.
    const flipAll = mapping[0]

    let bounds = getBounds(image)
    let def = false

    for (let i = 0; i < steps; i++) {
        image = step(image, mapping, bounds, def)
        def = flipAll ? !def : def
        bounds = expandBounds(bounds, 1)
    }

    return image
}

function step(image: Canvas, mapping: boolean[], bounds: Bounds, def: boolean): Canvas {
    let newImage = canvas()
    let {top, left, bottom, right} = bounds

    // Since we look at surrounding values, the image area that may contain interesting
    // info will grow by 1 either side each time. Anything outside of the current bounds is
    // assumed to be all '#' or '.' depending on the step we're on.
    for (let y = top - 1; y <= bottom + 1; y++) {
        for (let x = left - 1; x <= right + 1; x++) {
            let idx = coordsToMappingIndex([x,y], image, bounds, def)
            if (mapping[idx]) newImage.add([x,y])
        }
    }
    return newImage
}

function getBounds(image: Canvas): Bounds {
    let top = Infinity
    let bottom = -Infinity
    let left = Infinity
    let right = -Infinity

    for (let [x,y] of image) {
        top = Math.min(top, y)
        bottom = Math.max(bottom, y)
        left = Math.min(left, x)
        right = Math.max(right, x)
    }

    return { top, bottom, left, right }
}

function expandBounds({top,bottom,left,right}: Bounds, amount: number): Bounds {
    return {
        top: top - amount,
        bottom: bottom + amount,
        left: left - amount,
        right: right + amount
    }
}

type Bounds = { top: number, left: number, bottom: number, right: number }

function coordsToMappingIndex([x,y]: Coords, image: Canvas, bounds: Bounds, def: boolean): number {
    let s = ''
    for (let [xd,yd] of offsets()) {
        let newCoords: Coords = [x + xd, y + yd]
        if (getPixelValue(newCoords, image, bounds, def)) {
            s += '1'
        } else {
            s += '0'
        }
    }
    return parseInt(s, 2)
}

// Bounds are fully inclusive. Anything outside the bounds is assumed to be the same `def` value.
function getPixelValue([x,y]: Coords, image: Canvas, bounds: Bounds, def: boolean): boolean {
    if (x < bounds.left || x > bounds.right || y < bounds.top || y > bounds.bottom) {
        return def
    } else {
        return image.has([x, y])
    }
}

function *offsets(): Generator<Coords,void,unknown> {
    yield [-1,-1]
    yield [0,-1]
    yield [1,-1]
    yield [-1,0]
    yield [0,0]
    yield [1,0]
    yield [-1,1]
    yield [0,1]
    yield [1,1]
}

// Max area: -16384 to 16383 in each dimension.
// We pack 2 digits into one to try and help performance.
function canvas(): Canvas {
    const MID = 16384
    return new KeyedSet(
        ([x,y]) => (x + MID << 15) | (y + MID),
        (n) => [(n >> 15) - MID, (n & 32767) - MID]
    )
}
type Canvas = KeyedSet<Coords,number>
type Coords = [number,number]

// First line is mapping, rest is original image
function parseInput(input: string): [boolean[], Canvas] {
    let lines = input.trim().split('\n').filter(line => line.length > 0)

    let mapping = collect(map(lines.shift()!, char => char === '#'))
    let image = canvas()

    for (let [y,line] of enumerate(lines)) {
        for (let [x,char] of enumerate(line)) {
            if (char == '#') image.add([x,y])
        }
    }

    return [mapping, image]
}