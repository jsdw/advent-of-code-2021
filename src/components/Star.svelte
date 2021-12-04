<script lang="ts">
    export let number: number
    export let solver: Solver

    let dragging = false
    let dragover = false
    let result: string | number = ''
    let error: boolean = false

    function onDragStart() {
        dragging = true
    }

    function onDragEnd() {
        dragging = false
    }

    function onDragOver(ev: DragEvent) {
        ev.preventDefault()
        ev.stopPropagation()
        dragover = true
    }

    function onDragLeave(_ev: DragEvent) {
        dragover = false
    }

    function onDrop(ev: DragEvent) {
        ev.preventDefault()
        ev.stopPropagation()
        dragover = false

        let file = ev.dataTransfer?.files[0]
        if (!file) { return }
        solveFile(file)
    }

    function uploadInput(ev: MouseEvent) {
        let inputEl = document.createElement("input")
        inputEl.type = 'file'
        inputEl.oninput = function (ev) {
            let file = inputEl.files?.[0]
            if (!file) { return }
            solveFile(file)
        }
        inputEl.click()
    }

    function solveFile(file: File) {
        readFileAsText(file)
            .then((text) => {
                let res = solver(text)
                result = res.value
                if (res.kind == 'error') {
                    error = true
                } else {
                    error = false
                }
            }) 
    }

    function readFileAsText(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            let reader = new FileReader()
            reader.onload = () => {
                resolve(reader.result as string)
            }
            reader.onerror = () => {
                reject(reader.error)
            }
            reader.readAsText(file)
        })
    }

</script>

<div 
    class="star"
    class:dragover={dragover}
    class:dragging={dragging}
    on:dragstart={onDragStart}
    on:dragend={onDragEnd}
    on:dragover={onDragOver}
    on:dragleave={onDragLeave}
    on:drop={onDrop}
>
    <em class="text" on:click={uploadInput}>Star {number}:</em>
    <div class="result" class:error={error}>{result}</div>
</div>

<style>
    .text {
        padding-right: 10px;
        cursor: pointer;
    }

    .result {
        display: inline-flex;
        align-items: center;
        min-width: 200px;
        height: 24px;
        border: 1px solid #1d1d24;
        background-color: #111;
        border-radius: 5px;
        color: #ffff66;
        padding: 0px 5px;
    }

    .result.error {
        color: red;
    }

    .star {
        position: relative;
        display: inline-flex;
        align-items: center;
    }

    .star.dragging * {
        pointer-events: none;
    }

    .star.dragover::after {
        content: '';
        display: block;
        position: absolute;
        --position-vert: -4px;
        --position-hor: -10px;
        top: var(--position-vert);
        left: var(--position-hor);
        right: var(--position-hor);
        bottom: var(--position-vert);
        border: 1px dashed #ffffff;
        border-radius: 6px;
        z-index: 100;
    }
</style>