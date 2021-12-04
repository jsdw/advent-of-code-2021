/// Yield each of the overlapping windows of values computed from the items provided.
export function* windows<T>(n: number, items: T[]) {
    let index = 0
    while (items.length >= index + n) {
        let window: T[] = [];
        for (let i = index; i < index + n; i++) {
            window.push(items[i])
        }
        index++
        yield window
    }
}

/// Map the output of a generator into something else.
export function* map<T, O>(gen: Generator<T,any,any>, f: (item: T) => O) {
    for (let item of gen) {
        yield f(item)
    }
}

/// Collect the output from a generator into an array.
export function collect<T>(gen: Generator<T,any,any>): T[] {
    let output = []
    for (let item of gen) {
        output.push(item)
    }
    return output
}