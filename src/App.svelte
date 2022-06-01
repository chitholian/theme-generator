<script lang="ts">
    import {buildTheme} from "./extra";
    import Palette from "./Palette.svelte";

    let dark = localStorage.getItem("dark") === "yes";
    let levels = 5;
    let gap = 20;
    let shift = 0;
    let baseA = -128 + Math.floor(Math.random() * 1000) % 256;
    let baseB = -128 + Math.floor(Math.random() * 1000) % 256;
    let names = ["one", "two", "three", "four", "five", "six", "seven", "eight"];
    let theme;
    $: theme = buildTheme(levels, names, gap, shift, baseA, baseB);

    $: saveOptions(dark);

    function saveOptions(dark) {
        localStorage.setItem("dark", dark ? "yes" : "no");
    }
</script>

<div class="p-4">
    <h2 class="t-center">Theme Builder</h2>
    <div class="t-center">
        Level Count:<input bind:value={levels} type="number" min="1" step="1"/>
        Value Gap: <input bind:value={gap} type="number"/>
        Value Shift: <input bind:value={shift} type="number"/>
        <hr/>
        Base A: {baseA}
        <span style="background: linear-gradient(90deg, green, red)">
            <input bind:value={baseA} type="range" min="-128" max="127"/>
        </span>
        Base B: {baseB}
        <span style="background: linear-gradient(90deg, blue, yellow)">
            <input bind:value={baseB} type="range" min="-128" max="127"/>
        </span>
        <label style="font-size: 1rem;">
            <input type="checkbox" bind:checked={dark}/> Show dark theme
        </label>
    </div>
    <hr/>
    {#if dark}
        <div class="bg-dark">
            <h4 class="t-center">Dark</h4>
            <Palette bind:theme={theme.dark}/>
        </div>
    {/if}
    <div class="bg-light">
        <h4 class="t-center">Light</h4>
        <Palette bind:theme={theme.light}/>
    </div>
</div>
