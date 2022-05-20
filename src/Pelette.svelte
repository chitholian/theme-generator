<script type="ts">
  export let theme = {};
</script>

<div>
  {#each Object.keys(theme) as k (k)}
  <div class="box">
    <h4 class="t-center">{k}</h4>

    H: {theme[k].h} <input type="range" min="0" max="359" bind:value={theme[k].h} />
    S: {theme[k].s} <input type="range" min="0" max="100" bind:value={theme[k].s} />

    <ol style="padding-left: .5rem;">
      {#each theme[k].l as l, i (i)}
        <li style={`padding:.125rem .25rem;background: hsl(${theme[k].h},${theme[k].s}%,${l}%)`}>
          L: {l} <input style="width:calc(100% - 4rem);" type="range" min="0" max="100" bind:value={l} />
        </li>
      {/each}
    </ol>
    </div>
  {/each}
</div>

<style>
    * {
        margin: .25rem ;
    }
    .box {
        border: 1px solid gray;
        border-radius: .5rem;
        padding: .5rem;
    }
    .t-center {
        text-align: center;
    }
</style>
