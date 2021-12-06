<script lang="ts">
    import Star from './Star.svelte'

    export let title: string
    export let number: number
    export let description: string
    export let star1: Solver
    export let star2: undefined | Solver = undefined

</script>

<div class="day">
    <h2>
        Day {number}: 
        <a href="https://adventofcode.com/2021/day/{number}">{title}</a> 
    </h2>
    <p>{description}</p>
    <Star
        number={1}
        solver={star1}
    />
    {#if star2}
        ,
        <Star
            number={2}
            solver={star2}
        />
    {/if}
</div>

<style>
    h2 {
        margin-bottom: 10px;
    }

    p {
        margin: 10px 0px;
    }
</style>