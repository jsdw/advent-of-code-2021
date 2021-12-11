/** Yield each of the overlapping windows of values computed from the items provided. */
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

/** Return the last value from an iterable */
export function last<T>(gen: Iterable<T>): T | undefined {
    let val = undefined
    for (let item of gen) {
        val = item
    }
    return val
}

/** Map the output of an iterable into something else. */
export function* map<T, O>(gen: Iterable<T>, f: (item: T) => O): Generator<O, void, unknown> {
    for (let item of gen) {
        yield f(item)
    }
}

/** Filter the output of an iterable. */
export function* filter<T>(gen: Iterable<T>, f: (item: T) => boolean): Generator<T, void, unknown> {
    for (let item of gen) {
        if (f(item)) yield item
    }
}

/** Enumerate an iterable with an index */
export function* enumerate<T, O>(gen: Iterable<T>): Generator<[number,T], void, unknown> {
    let idx = 0
    for (let item of gen) {
        yield [idx, item]
        idx++
    }
}

/** Fold an iterable into a single item. */
export function fold<T, O>(gen: Iterable<T>, first: O, reducer: (last: O, next: T) => O): O {
    for (let item of gen) {
        first = reducer(first, item)
    }
    return first
}

/** Fold an iterable into a single item. */
export function count<T>(gen: Iterable<T>): number {
    let n = 0
    for (let _item of gen) {
        n++
    }
    return n
}

/** Zip two iterables together */
export function *zip<A,B>(a: Iterable<A>, b: Iterable<B>): Generator<[A,B], void, unknown> {
    let aIter = a[Symbol.iterator]()
    let bIter = b[Symbol.iterator]()
    while (true) {
        let aItem = aIter.next()
        let bItem = bIter.next()

        if (aItem.done || bItem.done) return
        else yield [aItem.value, bItem.value]
    }
}

/** Collect the output from an iterable into an array. */
export function collect<T>(gen: Iterable<T>): T[] {
    let output = []
    for (let item of gen) {
        output.push(item)
    }
    return output
}

/** Make an array of the length defined, filled with the item created from the function given. */
export function arrayOf<T>(length: number, input: () => T): T[] {
    let out = []
    for (let i = 0; i < length; i++) out.push(input())
    return out
}

/** Sort the smallest number first */
export function smallestFirst(a: number, b: number): [number, number] {
    return a < b ? [a, b] : [b, a]
}

/** Match some condition against an input and run the associated arm */
export function match<T,O>(input: T, arms: [(input: T) => boolean, (input: T) => O][]): O | undefined {
    for (let [condition, fn] of arms) {
        if (condition(input)) {
            return fn(input)
        }
    }
}

export function strictEq<T>(other: T) {
    return function isEqual(input:T) {
        return input === other
    }
}

/** 
 * A set for which you can specify a function to map from arbitrary key to some primitive
 * type, and anothr to reverse this mapping. This allows you to use objects and arrays as
 * entries, and have them compared structurally (based on the key functions) rather than
 * referentially.
 */
export class KeyedSet<V, P extends Primitive> {
    #keyFn: (item: V) => P
    #unKeyFn: (key: P) => V
    #set: Set<P>
    
    constructor(keyFn: (item: V) => P, unKeyFn: (key: P) => V) {
        this.#keyFn = keyFn
        this.#unKeyFn = unKeyFn
        this.#set = new Set()
    }
    
    has(value: V) {
        return this.#set.has(this.#keyFn(value))
    }
    add(value: V) {
        return this.#set.add(this.#keyFn(value))
    }
    delete(value: V) {
        return this.#set.delete(this.#keyFn(value))
    }
    *values() {
        for (let prim of this.#set.values()) {
            yield this.#unKeyFn(prim)
        }
    }
    keys() {
        return this.values()
    }
}

/** 
 * A map for which you can specify a function to map from arbitrary key to some primitive
 * type, and anothr to reverse this mapping. This allows you to use objects and arrays as
 * keys, and have them compared structurally (based on the key functions) rather than
 * referentially.
 */
export class KeyedMap<K,V,P extends Primitive> {
    #keyFn: (item: K) => P
    #unKeyFn: (key: P) => K
    #map: Map<P,V>
    
    constructor(keyFn: (item: K) => P, unKeyFn: (key: P) => K) {
        this.#keyFn = keyFn
        this.#unKeyFn = unKeyFn
        this.#map = new Map()
    }
    
    has(key: K) {
        return this.#map.has(this.#keyFn(key))
    }
    get(key: K) {
        return this.#map.get(this.#keyFn(key))
    }
    set(key: K, value: V) {
        return this.#map.set(this.#keyFn(key), value)
    }
    delete(key: K) {
        return this.#map.delete(this.#keyFn(key))
    }
    *keys() {
        for (let k of this.#map.keys()) {
            yield this.#unKeyFn(k)
        }
    }
    values() {
        return this.#map.values()
    }
    *entries() {
        for (let [k,v] of this.#map.entries()) {
            yield [this.#unKeyFn(k), v]
        }
    }
}

type Primitive = number | string | boolean