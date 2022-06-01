<script lang="ts">
    import {buildTheme, hueGradient} from "./extra";
    import Palette from "./Palette.svelte";

    let dark = localStorage.getItem("dark") === "yes";
    let levels = 5;
    let gap = 18;
    let shift = 0;
    let baseHue = Math.round(Math.random() * 1000) % 360;
    let hueJump = 45 //50 + Math.round(Math.random() * 1000) % 100;
    let saturation = 50 + Math.round(Math.random() * 1000) % 25;
    let names = ["one", "two", "three", "four", "five", "six", "seven", "eight"];
    let theme;
    $: theme = buildTheme(levels, names, gap, shift, baseHue, saturation, hueJump);

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
        Hue Jump: <input bind:value={hueJump} type="number"/>
        <hr/>
        Base Hue: {baseHue}
        <span style="background: {hueGradient}">
            <input bind:value={baseHue} type="range" min="0" max="359"/>
        </span>
        Base Saturation: {saturation}
        <span style="background: linear-gradient(90deg, hsl({baseHue}, 0%, 50%), hsl({baseHue}, 100%, 50%))">
            <input bind:value={saturation} type="range" min="0" max="100"/>
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
