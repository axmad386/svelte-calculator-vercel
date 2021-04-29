<script lang="ts">
    import ButtonNumber from "$lib/comp/Button/ButtonNumber.svelte";
    import ButtonOperator from "$lib/comp/Button/ButtonOperator.svelte";
    import Cursor from "$lib/comp/Display/Cursor.svelte";
    import Display from "$lib/comp/Display/Display.svelte";
    import type { Data } from "$lib/Contracts/Display";
    import ButtonSmall from "$lib/comp/Button/ButtonSmall.svelte";
    import Icon from "$lib/comp/Icon.svelte";
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
        if (cursorIndex == 0) return;
        data.splice(cursorIndex - 1, 1);
        cursorIndex--;
        data = data;
        if (data.length == 0) {
            cursorIndex = 1;
            data = [
                {
                    type: "number",
                    out: "0",
                },
            ];
        }
    };
    const clearData = () => {
        data = [
            {
                type: "number",
                out: "0",
            },
        ];
    };
    let result = "0";
    $: {
        output = data
            .map((d, index) => {
                let out = d.out;
                const startGroupCount = data.filter(
                    (d) => d.type == "startgroup"
                ).length;
                const endGroupCount = data.filter((d) => d.type == "endgroup")
                    .length;
                // if data before startgorup isnot operator, append multiply opeartor
                if (
                    d.type == "startgroup" &&
                    data[index - 1].type != "operator"
                ) {
                    out = "*" + d.out;
                }
                // if startGroup not closed, add additional endGroup
                if (
                    index == data.length - 1 &&
                    startGroupCount > endGroupCount
                ) {
                    for (let i = 0; i < startGroupCount - endGroupCount; i++) {
                        out += ")";
                    }
                }
                return out;
            })
            .join("");
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
    <div class="grid grid-cols-5 gap-3 p-4 w-full">
        <ButtonSmall>SHIFT</ButtonSmall>
        <ButtonSmall on:click={() => updateCursorIndex(-1)}>
            <Icon name="caret_left" />
        </ButtonSmall>
        <ButtonSmall on:click={() => updateCursorIndex(1)}>
            <Icon name="caret_right" />
        </ButtonSmall>
        <ButtonSmall on:click={deleteData} color="red"
            ><Icon name="delete_left" fill="white" /></ButtonSmall
        >
        <ButtonSmall on:click={clearData} color="red">AC</ButtonSmall>

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
</div>

<style>
    :global(button):focus {
        @apply outline-none;
    }
</style>
