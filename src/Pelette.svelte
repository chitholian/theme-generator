<script type="ts">
  import { buildThemeVars, hsv2hsl } from "./extra";
  export let theme = {};
  export let mode = "hsb";
  function getBgColor(h, s, v, mode) {
    let hsl =
      mode === "hsb" ? hsv2hsl(h, s / 100, v / 100) : [h, s / 100, v / 100];
    return `hsl(${hsl[0]}, ${(hsl[1] * 100).toFixed(0)}%, ${(
      hsl[2] * 100
    ).toFixed(0)}%)`;
  }
</script>

<div class="flex">
  {#each Object.keys(theme) as k (k)}
    <div class="box">
      <h4 class="t-center">{k}</h4>
      H: {theme[k].h}
      <input
        type="range"
        min="0"
        max="359"
        bind:value={theme[k].h}
        style="width:calc(50% - 4rem);"
      />
      S: {theme[k].s}
      <input
        type="range"
        min="0"
        max="100"
        bind:value={theme[k].s}
        style="width:calc(50% - 4rem);"
      />
      <ol style="padding-left: .5rem;">
        {#each theme[k].l as l, i (i)}
          <li
            style={`padding:.125rem .25rem;background: ${getBgColor(
              theme[k].h,
              theme[k].s,
              l,
              mode
            )}`}
          >
            V: {l}
            <input
              style="width:calc(100% - 4rem);"
              type="range"
              min="0"
              max="100"
              bind:value={l}
            />
          </li>
        {/each}
      </ol>
    </div>
  {/each}
  <textarea class="box">{buildThemeVars(theme, mode)}</textarea>
</div>

<style>
  * {
    margin: 0.25rem;
  }
  .flex {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .box {
    border: 1px solid gray;
    border-radius: 0.5rem;
    padding: 0.5rem;
    flex-basis: 30%;
    flex-grow: 1;
  }
  .t-center {
    text-align: center;
  }
</style>
