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

/// Return the last value from an iterable
export function last<T>(gen: Iterable<T>): T | undefined {
    let val = undefined
    for (let item of gen) {
        val = item
    }
    return val
}

/// Map the output of an iterable into something else.
export function* map<T, O>(gen: Iterable<T>, f: (item: T) => O): Generator<O, void, unknown> {
    for (let item of gen) {
        yield f(item)
    }
}

/// Filter the output of an iterable.
export function* filter<T>(gen: Iterable<T>, f: (item: T) => boolean): Generator<T, void, unknown> {
    for (let item of gen) {
        if (f(item)) yield item
    }
}

/// Enumerate an iterable with an index
export function* enumerate<T, O>(gen: Iterable<T>): Generator<[number,T], void, unknown> {
    let idx = 0
    for (let item of gen) {
        yield [idx, item]
        idx++
    }
}

/// Fold an iterable into a single item.
export function fold<T, O>(gen: Iterable<T>, first: O, reducer: (last: O, next: T) => O): O {
    for (let item of gen) {
        first = reducer(first, item)
    }
    return first
}

/// Collect the output from an iterable into an array.
export function collect<T>(gen: Iterable<T>): T[] {
    let output = []
    for (let item of gen) {
        output.push(item)
    }
    return output
}

/// make an array of the length defined, filled with the item created from the function given.
export function arrayOf<T>(length: number, input: () => T): T[] {
    let out = []
    for (let i = 0; i < length; i++) out.push(input())
    return out
}

type Primitive = number | string | boolean

/// A set for which you can specify a function to map from arbitrary key to some primitive
/// type. Without this, using arrays/objects as keys doesn't do what you'd probably expect.
export class KeyedSet<T> {
    #keyFn: (item: T) => Primitive
    #set: Set<any>

    constructor(keyFn: (item: T) => Primitive) {
        this.#keyFn = keyFn
        this.#set = new Set()
    }

    has(value: T) {
        this.#set.has(this.#keyFn(value))
    }
    add(value: T) {
        this.#set.add(this.#keyFn(value))
    }
    delete(value: T) {
        this.#set.delete(this.#keyFn(value))
    }
}