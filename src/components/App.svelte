<script lang="ts">
    import Day from './Day.svelte';
    import * as day01 from '../days/day01'
    import * as day02 from '../days/day02'
    import * as day03 from '../days/day03'
    import * as day04 from '../days/day04'
    import * as day05 from '../days/day05'

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
        margin: 0px 30px;
        margin-bottom: 30px;
    }

</style>