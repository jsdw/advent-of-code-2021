import { collect, KeyedSet, map } from '../utils'

// If we find more than this amount of overlap we're gravy
const OVERLAP_THRESHOLD = 12

export let star1: ThrowingSolver = (input) => {
    let scannerCoords = parseInput(input)

    let res = alignAllCoords(scannerCoords)
    let uniqueCoords = coordSet()
    for (let { coords } of res) {
        for (let c of coords) {
            uniqueCoords.add(c)
        }
    }

    return uniqueCoords.size
}

export let star2: ThrowingSolver = (input) => {
    let scannerCoords = parseInput(input)

    let res = alignAllCoords(scannerCoords)
    let biggestDistance = 0
    for (let i = 0; i < res.length; i++) {
        for (let j = i + 1; j < res.length; j++) {
            biggestDistance = Math.max(biggestDistance, manhatten(res[i].scanner, res[j].scanner))
        }
    }

    return biggestDistance
}

function manhatten(a: Coords, b: Coords): number {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z)
}

function alignAllCoords(unknownCoords: Coords[][]): { coords: CoordSet, scanner: Coords }[] {
    let known = [
        { coords: coordSetFrom(swapRemove(unknownCoords, 0)!), scanner: zero() }
    ]

    for(let knownIdx = 0; knownIdx < known.length; knownIdx++) {
        console.log(`${known.length} found, ${unknownCoords.length} to go`)
        let { coords: knownCoords, scanner: knownScanner } = known[knownIdx]
        for (let i = 0; i < unknownCoords.length; i++) {
            for (let res of allPossibleAlignmentsWithRotation(knownCoords, unknownCoords[i])) {
                // Count the overlaps with this transformation of the unknown coords
                let numOverlapping = 0
                let bs = collect(res.bs)
                for (let b of bs) {
                    if (knownCoords.has(b)) numOverlapping++
                }

                // If we find enough overlap, bail and add the transform to our known set
                if (numOverlapping >= OVERLAP_THRESHOLD) {
                    // Remove from the original list:
                    swapRemove(unknownCoords, i)
                    // The scanner relative to known[0]:
                    let s = { x: knownScanner.x + res.scanner.x, y: knownScanner.y + res.scanner.y, z: knownScanner.z + res.scanner.z }
                    // Push the adjusted (rotate+alignment) coords to our known list
                    known.push({ coords: coordSetFrom(bs), scanner: res.scanner })
                    // SwapRemove means we need to look at same index again
                    i--
                    // don't need to look at any more alignments for the one we've solved.
                    break
                }
            }
        }
    }

    return known
}

// Remove an item from the array in constant time (does not preserve order)
function swapRemove<T>(arr: T[], idx: number): T {
    let res = arr[idx]
    arr[idx] = arr[arr.length-1]
    arr.pop()
    return res
}

// Store sets of coords
function coordSetFrom(items: Iterable<Coords>): CoordSet {
    let s = coordSet()
    for (let item of items) {
        s.add(item)
    }
    return s
}
function coordSet(): CoordSet {
    return new KeyedSet(
        ({x,y,z}: Coords) => `${x},${y},${z}` as string,
        (key) => {
            let [x,y,z] = key.split(',')
            return { x: parseInt(x,10), y: parseInt(y,10), z: parseInt(z,10) }
        }
    )
}
type CoordSet = KeyedSet<Coords, string>

// Find overlapping points given two sets of coords that could be rotated any which way and need aligning
// return the max number of overlaps found, and the adjusted coords for `b` to bring them into alignment.
function *allPossibleAlignmentsWithRotation(as: Iterable<Coords>, bs: Iterable<Coords>): Generator<{ bs: Iterable<Coords>, scanner: Coords },void,unknown> {
    for (let rotationFn of rotations()) {
        let newBs = collect(map(bs, rotationFn))
        yield *allPossibleAlignments(as, newBs)
    }
}

// Find overlapping points given two sets of coords that need aligning.
// return the max number of overlaps found, and the adjusted coords for `b` to bring them into alignment.
function *allPossibleAlignments(as: Iterable<Coords>, bs: Coords[]): Generator<{ bs: Iterable<Coords>, scanner: Coords },void,unknown> {
    for (let center of alignmentCentres(as,bs)) {
        let newBs = realignBy(bs, center)
        yield { bs: newBs, scanner: center }
    }
}

// For every combination of coords from the first and second set, produce the potential
// diffs to add to `bs` to align them with `as`
function *alignmentCentres(as: Iterable<Coords>, bs: Coords[]): Generator<Coords,void,unknown> {
    for (let a of as) {
        for (let b of bs) {
            yield { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z }
        }
    }
}

// Realign coords based on the diff provided.
function *realignBy(coords: Iterable<Coords>, center: Coords): Generator<Coords,void,unknown> {
    for (let b of coords) {
        yield { x: b.x + center.x, y: b.y + center.y, z: b.z + center.z }
    }
}

// Each set of coords could be rotated one of 24 ways. Return each of these in a fixed order.
function *rotations(): Generator<(coords: Coords) => Coords,void,unknown> {
    function *rotationsAroundX() {
        yield ({x,y,z}: Coords) => ({x, y, z})
        yield ({x,y,z}: Coords) => ({x, y: -z, z: y})
        yield ({x,y,z}: Coords) => ({x, y: -y, z: -z})
        yield ({x,y,z}: Coords) => ({x, y: z, z: -y})
    }
    function *rotationsAroundY(f: (coords: Coords) => Coords) {
        yield ({x,y,z}: Coords) => f({x: z, y, z: -x})
        yield ({x,y,z}: Coords) => f({x: -x, y, z: -z})
        yield ({x,y,z}: Coords) => f({x: -z, y, z: x})
    }
    function *rotationsAroundZ(f: (coords: Coords) => Coords) {
        yield ({x,y,z}: Coords) => f({x: y, y: -x, z})
        yield ({x,y,z}: Coords) => f({x: -y, y: x, z})
    }
    for (let cs of rotationsAroundX()) {
        yield cs
        yield *rotationsAroundY(cs)
        yield *rotationsAroundZ(cs)
    }
}

function zero(): Coords {
    return {x:0, y:0, z:0}
}

function parseInput(input: string): Coords[][] {
    return input
    .trim()
    .split(/--- scanner [0-9]+ ---/)
    .filter(l => l.trim().length > 0)
    .map(coords => coords
        .trim()
        .split('\n')
        .map(xyz => {
            let [x,y,z] = xyz.trim().split(',').map(n => parseInt(n, 10))
            return { x, y, z }
        })
    )
}

type Coords = { x: number, y: number, z: number }