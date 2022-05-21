<script type="ts">
  import { buildThemeVars, calcLuminance, fixInt, hsv2hsl } from "./extra";
  export let theme = {};
  export let mode = "hsb";
  function getBgColor(h, s, v, mode) {
    let hsl =
      mode === "hsb" ? hsv2hsl(h, s / 100, v / 100) : [h, s / 100, v / 100];
    return `hsl(${hsl[0]}, ${fixInt(hsl[1] * 100)}%, ${fixInt(hsl[2] * 100)}%)`;
  }
</script>

<div class="flex">
  {#each Object.keys(theme) as k (k)}
    <div class="box">
      <h4 class="t-center">{k}</h4>
      <div class="flex">
        H: {theme[k].h}
        <input type="range" min="0" max="359" bind:value={theme[k].h} />
        S: {theme[k].s}
        <input type="range" min="0" max="100" bind:value={theme[k].s} />
      </div>
      <div>
        {#each theme[k].l as l, i (i)}
          <div class="color">
            {i + 1}. V: {l}
            <span
              style={`background: ${getBgColor(
                theme[k].h,
                theme[k].s,
                l,
                mode
              )}`}
            >
              <input type="range" min="0" max="100" bind:value={l} />
            </span>
            Lum: {calcLuminance(theme[k].h, theme[k].s, l, mode)}
          </div>
        {/each}
      </div>
    </div>
  {/each}
  <textarea class="box">{buildThemeVars(theme, mode)}</textarea>
</div>
