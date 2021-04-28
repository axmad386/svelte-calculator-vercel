<script lang="ts">
    import number from "./Number.svelte";
    import operator from "./Operator.svelte";
    import type { Data, DisplayType } from "$lib/Contracts/Display";
    export let type: DisplayType, data: Data;
    const displays = {
        number,
        operator,
        startgroup: operator,
        endgroup: operator,
    };
    let display = null;
    $: if (type) {
        display = displays[type];
    }
</script>

<svelte:component this={display} {data} />
