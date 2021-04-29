<script lang="ts">
    export let color: "red" | "gray" = "gray";
    const colors = {
        red: "bg-red-900 border-red-400 text-white",
        gray: "bg-gray-500 border-red-white text-black",
    };
</script>

<button
    class="{colors[
        color
    ]} border-l-2 border-b shadow h-8 rounded items-center flex justify-center"
    on:click
>
    <slot />
</button>
