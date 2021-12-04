<script lang="ts">
    import Day from './Day.svelte';
    import * as day01 from '../days/day01'
    import * as day02 from '../days/day02'
    import * as day03 from '../days/day03'

    type Days = { title: string, description: string, star1: Solver, star2?: Solver }[]

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
            description: "Gamme and epsilon rates from most/least common binary bits",
            star1: day03.star1,
            star2: day03.star2,
        },
    ]

    function catchExceptions(fn: Solver): Solver {
        return function solverCatchingExceptions(input: string) {
            try {
                return fn(input)
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
                star1={catchExceptions(day.star1)}
                star2={day.star2 ? catchExceptions(day.star2) : undefined}
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
    }

</style>