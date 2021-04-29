<script lang="ts">
    import type { Icon } from "$lib/Contracts/Icon";
    import delete_left from "./svg/delete_left.svelte";
    import caret_left from "./svg/caret_left.svelte";
    import caret_right from "./svg/caret_right.svelte";

    export let name: Icon;
    export let fill = "#000",
        width: string | number = 30,
        height: string | number = 30;

    const icons = {
        caret_left,
        caret_right,
        delete_left,
    };

    let icon = null;

    $: if (name) {
        icon = icons[name];
    }
</script>

<i class={$$props.class}>
    <svelte:component this={icon} {fill} {width} {height} />
</i>
