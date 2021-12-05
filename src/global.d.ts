/// <reference types="svelte" />

type ThrowingSolver = (input: string) => (string | number)

type Solver = (input: string) => SolverOutput

type SolverOutput 
    = { kind: 'success', value: string | number } 
    | { kind: 'error', value: string | number }