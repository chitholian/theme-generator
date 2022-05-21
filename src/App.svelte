<script lang="ts">
  import { buildTheme, buildThemeVars, fixInt } from "./extra";
  import Pelette from "./Pelette.svelte";
  let dark = localStorage.getItem("dark") === "yes";
  let mode = localStorage.getItem("mode") ?? "hsl";
  let levels = 5;
  let gap = 18;
  let shift = 0;
  let hueJump = fixInt(((Math.random() * 1000) % 100) + 50);
  let baseHue = Math.floor(Math.random() * 1000) % 360;
  let sat = fixInt(((Math.random() * 1000) % 50) + 50);
  let names = ["one", "two", "three", "four", "five", "six", "seven", "eight"];
  let theme;
  $: theme = buildTheme(levels, names, gap, shift, baseHue, sat, hueJump);

  $: saveOptions(mode, dark);
  function saveOptions(mode, dark) {
    localStorage.setItem("mode", mode);
    localStorage.setItem("dark", dark ? "yes" : "no");
  }
</script>

<div class="p-4">
  <h2 class="t-center">Theme Builder</h2>
  <div class="t-center">
    Level Count:<input bind:value={levels} type="number" min="1" step="1" />
    Hue Jump: <input bind:value={hueJump} type="number" />
    Value Gap: <input bind:value={gap} type="number" />
    Value Shift: <input bind:value={shift} type="number" />
    <hr />
    Base Hue: {baseHue}
    <input bind:value={baseHue} type="range" min="0" max="359" />
    Base Saturation: {sat}
    <input bind:value={sat} type="range" min="0" max="100" />
    Mode:
    <label>
      <input type="radio" bind:group={mode} value="hsl" /> HSL
    </label>
    <label>
      <input type="radio" bind:group={mode} value="hsb" /> HSB
    </label>
    <label style="font-size: 1rem;">
      <input type="checkbox" bind:checked={dark} /> Show dark theme
    </label>
  </div>
  <hr />
  {#if dark}
    <div class="bg-dark">
      <h4 class="t-center">Dark</h4>
      <Pelette bind:theme={theme.dark} {mode} />
    </div>
  {/if}
  <div class="bg-light">
    <h4 class="t-center">Light</h4>
    <Pelette bind:theme={theme.light} {mode} />
  </div>
</div>
