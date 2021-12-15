<script lang="ts">
    import Day from './Day.svelte';
    import * as day01 from '../days/day01'
    import * as day02 from '../days/day02'
    import * as day03 from '../days/day03'
    import * as day04 from '../days/day04'
    import * as day05 from '../days/day05'
    import * as day06 from '../days/day06'
    import * as day07 from '../days/day07'
    import * as day08 from '../days/day08'
    import * as day09 from '../days/day09'
    import * as day10 from '../days/day10'
    import * as day11 from '../days/day11'
    import * as day12 from '../days/day12'
    import * as day13 from '../days/day13'
    import * as day14 from '../days/day14'
    import * as day15 from '../days/day15'

    type Days = { 
        title: string, 
        description: string, 
        star1: ThrowingSolver, 
        star2?: ThrowingSolver 
    }[]

    let days: Days = [
        {
            title: "Sonar Sweep",
            description: "How many times does the depth increase?",
            star1: day01.star1,
            star2: day01.star2,
        },
        {
            title: "Dive!",
            description: "Submarine forward/up/down piloting",
            star1: day02.star1,
            star2: day02.star2,
        },
        {
            title: "Binary Diagnostic",
            description: "Gamma and epsilon rates from most/least common binary bits",
            star1: day03.star1,
            star2: day03.star2,
        },
        {
            title: "Giant Squid",
            description: "Playing bingo with a squid",
            star1: day04.star1,
            star2: day04.star2,
        },
        {
            title: "Hydrothermal Venture",
            description: "Avoiding lines of hydrothermal vents",
            star1: day05.star1,
            star2: day05.star2,
        },
        {
            title: "Lanternfish",
            description: "Array of fish multiplying every 7 days",
            star1: day06.star1,
            star2: day06.star2,
        },
        {
            title: "The Treachery of Whales",
            description: "Align crabs horizontally using least fuel",
            star1: day07.star1,
            star2: day07.star2,
        },
        {
            title: "Seven Segment Search",
            description: "Read digits from digital displays with scrambled wires",
            star1: day08.star1,
            star2: day08.star2,
        },
        {
            title: "Smoke Basin",
            description: "Find lowest points and basin sizes in the cave",
            star1: day09.star1,
            star2: day09.star2,
        },
        {
            title: "Syntax Scoring",
            description: "Working with {[<( syntax chunks",
            star1: day10.star1,
            star2: day10.star2,
        },
        {
            title: "Dumbo Octopus",
            description: "10x10 grid, octopus flashing when energy hits 9; count them",
            star1: day11.star1,
            star2: day11.star2,
        },
        {
            title: "Passage Pathing",
            description: "Find routes through a graph with upper and lowercase letters",
            star1: day12.star1,
            star2: day12.star2,
        },
        {
            title: "Transparent Origami",
            description: "Fold up transparent paper with dots on",
            star1: day13.star1,
            star2: day13.star2,
        },
        {
            title: "Extended Polymerization",
            description: "'CH -> B' Inserting elements between pairs (fun!)",
            star1: day14.star1,
            star2: day14.star2,
        },
        {
            title: "Chiton",
            description: "Find the path with minimal risk through the 2D cavern",
            star1: day15.star1,
            star2: day15.star2,
        },
    ]

    function toSolver(fn: ThrowingSolver): Solver {
        return function solverCatchingExceptions(input: string) {
            try {
                return { kind: 'success', value: fn(input) }
            } catch(e) {
                return { kind: 'error', value: String(e) }
            }
        }
    }

</script>

<div class="outer">
    <main>
        <h1><a href="https://adventofcode.com/2021">Advent of Code 2021</a></h1>
        <p>Drag a file onto one of the stars for a given day to compute the result.</p>
    
        {#each days as day, index}
            <Day
                title={day.title}
                number={index + 1}
                description={day.description}
                star1={toSolver(day.star1)}
                star2={day.star2 ? toSolver(day.star2) : undefined}
            />
        {/each}
    </main>
</div>

<style>
    .outer {
        display: flex;
        justify-content: center;
    }

    main {
        max-width: 800px;
        margin: 0px var(--margin);
        margin-bottom: var(--margin);
    }

</style>