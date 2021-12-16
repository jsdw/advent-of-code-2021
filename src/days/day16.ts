export let star1: ThrowingSolver = (input) => {
    let [packets, _rest] = parsePackets(hexToBinary(input.trim()), Infinity)

    function version(packets: Packet[]): number {
        let v = 0
        for (let p of packets) {
            v += p.version
            if (p.type !== 4) v += version(p.children)
        }
        return v
    }
    return version(packets)
}

export let star2: ThrowingSolver = (input) => {
    let [packets, _rest] = parsePackets(hexToBinary(input.trim()), Infinity)
    return evaluate(packets[0])
}

function evaluate(packet: Packet): number {
    if (packet.type === 0) {
        return packet
            .children
            .slice(1)
            .reduce((n,p) => n + evaluate(p), evaluate(packet.children[0]))
    } else if (packet.type === 1) {
        return packet
            .children
            .slice(1)
            .reduce((n,p) => n * evaluate(p), evaluate(packet.children[0]))
    } else if (packet.type === 2) {
        return packet
            .children
            .reduce((m,p) => Math.min(m, evaluate(p)), Infinity)
    } else if (packet.type === 3) {
        return packet
            .children
            .reduce((m,p) => Math.max(m, evaluate(p)), -Infinity)
    } else if (packet.type === 4) {
        return packet.value
    } else if (packet.type === 5) {
        return evaluate(packet.children[0]) > evaluate(packet.children[1])
            ? 1
            : 0
    } else if (packet.type === 6) {
        return evaluate(packet.children[0]) < evaluate(packet.children[1])
            ? 1
            : 0
    } else if (packet.type === 7) {
        return evaluate(packet.children[0]) == evaluate(packet.children[1])
            ? 1
            : 0
    }
    throw `unexpected type ${packet.type}`
}

/* convert hex string to binary string */
function hexToBinary(hex: string): string {
    let out = ""
    for (let char of hex) {
        let bits = Number(parseInt(char, 16)).toString(2)
        while (bits.length < 4) bits = '0' + bits
        out += bits
    }
    return out
}

/** Decode up to `n` packets from the input */
function parsePackets(binary: string, n: number): [Packet[], string] {
    let packets: Packet[] = []
    while (binary.length > 5 && n > 0) {
        let [packet, rest] = parsePacket(binary)
        binary = rest
        packets.push(packet)
        n--
    }
    return [packets, binary]
}

function parsePacket(binary: string): [Packet, string] {
    let version = parseInt(binary.slice(0,3), 2)
    let type = parseInt(binary.slice(3,6), 2)
    binary = binary.slice(6)

    if (type == 4) {
        let { value, rest } = parseLiteralGroups(binary)
        return [{ type, version, value }, rest]
    } else {
        let { children, rest } = parseOperatorChildren(binary)
        return [{ type: type as any, version, children }, rest]
    }
}

function parseOperatorChildren(binary: string): { children: Packet[], rest: string } {
    let mode = binary.slice(0,1)
    binary = binary.slice(1)

    if (mode === '0') {
        let len = parseInt(binary.slice(0,15), 2)
        let [children, _] = parsePackets(binary.slice(15, 15 + len), Infinity)
        return { children, rest: binary.slice(15 + len) }
    } else {
        let len = parseInt(binary.slice(0,11), 2)
        let [children, rest] = parsePackets(binary.slice(11), len)
        return { children, rest }
    }
}

function parseLiteralGroups(binary: string): { value: number, rest: string } {
    let bits = ''
    let more = true
    do {
        let o = parseLiteralGroup(binary)
        binary = o.rest
        bits += o.bits
        more = o.more
    } while (more)
    return {
        value: parseInt(bits, 2),
        rest: binary,
    }
}

function parseLiteralGroup(binary: string): { bits: string, rest: string, more: boolean } {
    let group = binary.slice(0, 5)
    let more = group[0] === '1'
    return {
        bits: group.slice(1),
        rest: binary.slice(5),
        more
    }
}

type Packet = LiteralPacket | OpPacket

type LiteralPacket = {
    version: number,
    type: 4,
    value: number
}
type OpPacket = {
    version: number,
    type: 0 | 1 | 2 | 3 | 5 | 6 | 7
    children: Packet[]
}