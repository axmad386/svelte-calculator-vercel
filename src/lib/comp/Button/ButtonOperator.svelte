<script lang="ts">
    import type { Data } from "$lib/Contracts/Display";

    export let operator: string, data: Data[], cursorIndex: number;

    const operators: { [key: string]: Data } = {
        "(": {
            type: "startgroup",
            out: "(",
        },
        ")": {
            type: "endgroup",
            out: ")",
        },
        "+": {
            type: "operator",
            out: "+",
        },
        "-": {
            type: "operator",
            out: "-",
        },
        x: {
            type: "operator",
            out: "*",
            display: "&times;",
        },
        ":": {
            type: "operator",
            out: "/",
            display: ":",
        },
    };
    const insert = () => {
        let delLenght = 0;
        if (data.length == 1 && data[0].out == "0") {
            // operator cannot be in first place
            if (operators[operator].type != "startgroup") return false;
            delLenght = 1;
            cursorIndex = 0;
        }
        data.splice(cursorIndex, delLenght, operators[operator]);
        data = data;
        cursorIndex++;
    };
</script>

<button
    class="focus:outline-none rounded bg-gray-600 border-gray-500 border-l border-b text-white text-3xl"
    on:click={insert}
>
    {operator}
</button>
