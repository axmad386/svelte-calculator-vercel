<script lang="ts">
    import ButtonNumber from "$lib/comp/Button/ButtonNumber.svelte";
    import ButtonOperator from "$lib/comp/Button/ButtonOperator.svelte";
    import Cursor from "$lib/comp/Display/Cursor.svelte";
    import Display from "$lib/comp/Display/Display.svelte";
    import type { Data } from "$lib/Contracts/Display";
    let cursorIndex = 1;
    let data: Data[] = [
        {
            type: "number",
            out: "0",
        },
    ];
    let output = "";
    const updateCursorIndex = (inc) => {
        cursorIndex += inc;
        if (cursorIndex < 0) cursorIndex = 0;
        if (cursorIndex > data.length) cursorIndex = data.length;
    };
    const deleteData = () => {
        data.splice(cursorIndex - 1, 1);
        cursorIndex--;
        data = data;
    };
    let result = "0";
    $: {
        output = data.map((x) => x.out).join("");
        try {
            result = eval(output);
        } catch (error) {
            result = "";
        }
    }
    $: if (cursorIndex < 0) {
        cursorIndex = 0;
    }
</script>

<div class="h-screen bg-gray-700 bg-">
    <div class="p-2">
        <div class="bg-green-100 rounded h-64 relative p-4">
            {#if cursorIndex == 0}
                <Cursor />
            {/if}
            {#each data as d, i}
                <Display type={d.type} data={d} />
                {#if i == cursorIndex - 1}
                    <Cursor />
                {/if}
            {/each}
            <div class="absolute bottom-0 right-0 text-3xl p-3">
                = {result ?? "Error"}
            </div>
        </div>
    </div>
    <div class="flex flex-row">
        <div class="grid grid-cols-5 gap-4 p-4 w-full">
            <button on:click={() => updateCursorIndex(-1)}>prev</button>
            <button on:click={() => updateCursorIndex(1)}>next</button>
            <button on:click={deleteData}>Del</button>
            <button />
            <button />

            <ButtonNumber number={7} bind:data bind:cursorIndex />
            <ButtonNumber number={8} bind:data bind:cursorIndex />
            <ButtonNumber number={9} bind:data bind:cursorIndex />
            <ButtonOperator operator="(" bind:data bind:cursorIndex />
            <ButtonOperator operator=")" bind:data bind:cursorIndex />

            <ButtonNumber number={4} bind:data bind:cursorIndex />
            <ButtonNumber number={5} bind:data bind:cursorIndex />
            <ButtonNumber number={6} bind:data bind:cursorIndex />
            <ButtonOperator operator="x" bind:data bind:cursorIndex />
            <ButtonOperator operator=":" bind:data bind:cursorIndex />

            <ButtonNumber number={1} bind:data bind:cursorIndex />
            <ButtonNumber number={2} bind:data bind:cursorIndex />
            <ButtonNumber number={3} bind:data bind:cursorIndex />
            <ButtonOperator operator="+" bind:data bind:cursorIndex />
            <ButtonOperator operator="-" bind:data bind:cursorIndex />

            <ButtonNumber number={0} bind:data bind:cursorIndex />
            <ButtonNumber number={"."} bind:data bind:cursorIndex />
        </div>
        <pre class="w-1/2 text-white" />
    </div>
</div>
