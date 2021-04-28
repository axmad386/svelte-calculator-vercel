<script lang="ts">
    import type { Data } from "$lib/Contracts/Display";

    export let number, data: Data[], cursorIndex: number;

    const insert = () => {
        let delLenght = 0;
        if (data.length == 1 && data[0].out == "0") {
            delLenght = 1;
            cursorIndex = 0;
        }
        data.splice(cursorIndex, delLenght, {
            type: "number",
            out: number.toString(),
        });
        data = data;
        cursorIndex++;
    };
</script>

<button
    class="focus:outline-none rounded border-gray-500 border-l border-b bg-black text-white text-3xl"
    on:click={insert}
>
    {number}
</button>
