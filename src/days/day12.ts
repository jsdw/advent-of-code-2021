export let star1: ThrowingSolver = (input) => {
    let graph = parseInput(input)
    let out = solve(graph, false)
    return out
}

export let star2: ThrowingSolver = (input) => {
    let graph = parseInput(input)
    let out = solve(graph, true)
    return out
}

/* Count of how many times a place has been visited, and the current location */
type Path = [Map<string,number>, string]
function newPath(): Path {
    return [new Map([['start', 1]]), 'start']
}
function extendPath(visited: Map<string,number>, next: string): Path {
    let nextVisited = new Map(visited)
    let visitedCount = (nextVisited.get(next) || 0) + 1
    nextVisited.set(next, visitedCount)
    return [nextVisited, next]
}

/* Find the number of routes through the graph */
function solve(graph: Map<string,string[]>, twoVisits: boolean): number {
    let winners = 0
    let paths = [newPath()]
    do {
        let { paths: next, done } = step(paths, graph, twoVisits)
        paths = next
        winners += done
    } while (paths.length > 0)
    return winners
}

/* Step once through the graph from each path provided */
function step(paths: Path[], graph: Map<string,string[]>, twoVisits: boolean): { paths: Path[], done: number } {
    let nextPaths: Path[] = []
    let done = 0
    for (let [visited, last] of paths) {
        for (let possibility of graph.get(last) || []) {
            // We're done!
            if (possibility === 'end') {
                done++
            }
            // Visit the next node if we are allowed.
            else if (canVisitNode([visited,last], possibility, twoVisits)) {
                nextPaths.push(extendPath(visited, possibility))
            }
        }
    }
    return { paths: nextPaths, done }
}

/* Can we visit a given node from our current path? */
function canVisitNode([visited, last]: Path, possibility: string, twoVisits: boolean): boolean {
    // Can't visit start again
    if (possibility === 'start') {
        return false
    }

    if (isLower(possibility)) {
        // We can visit any small node once.
        if (!visited.has(possibility)) {
            return true
        }

        // Normally we can't visit it again..
        if (!twoVisits) {
            return false
        }

        // ..unless we haven't visited another node twice yet:
        for (let [seen,seenCount] of visited) {
            if (isLower(seen) && seenCount == 2) {
                return false
            }
        }
        return true
    }

    // If we're currently on a lowercase node, we can jump to any uppercase
    // node regardless of number of times it's seen
    if (isLower(last)) {
        return true
    }

    // So, we're on an uppercase node and we're visiting an uppercase node.
    // don't allow repetition; we can't visit the node if we've been there already.
    return !visited.has(possibility)
}

function isLower(s: string): boolean { 
    return s.toLowerCase() === s
}

function parseInput(input: string): Map<string,string[]> {
    return input
        .trim()
        .split('\n')
        .map(line => line.trim().split('-'))
        .reduce((m, [a,b]) => {
            function connect(k:string,v:string) {
                let values = m.get(k) || []
                values.push(v)
                m.set(k,values); 
            }
            connect(a,b)
            connect(b,a)
            return m 
        }, new Map<string,string[]>())
}