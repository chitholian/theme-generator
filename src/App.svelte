<script lang="ts">
  import { buildThemeVars } from "./extra";

  import Pelette from "./Pelette.svelte";

  let levels = 5;
  let gap = 18;

  let names = [
    "primary",
    "secondary",
    "tertiary",
    "quaternary",
    "quinary",
    "senery",
    "septenary",
    "octonary",
  ];

  function buildTheme(levels, names, gap) {
    let lightness = [];
    let lStart = 50 - Math.ceil(((levels - 1) / 2) * gap);
    for (let l = 1; l <= levels; l++) {
      lightness.push((lStart + (l - 1) * gap) % 101);
    }
    let darkTheme = {};

    let g = 100; //Math.ceil(360 / names.length);
    let i = 0;
    let baseHue = Math.floor(Math.random() * 1000) % 360;
    for (let n of names) {
      darkTheme[n] = {
        h: (baseHue + g * i++) % 360,
        s: 100,
        l: [...lightness],
      };
    }

    darkTheme = {...darkTheme,
      success: { h: 120, s: 100, l: [...lightness] },
      info: { h: 230, s: 100, l: [...lightness] },
      warning: { h: 60, s: 100, l: [...lightness] },
      danger: { h: 0, s: 100, l: [...lightness] },
    }

    let lightTheme = JSON.parse(JSON.stringify(darkTheme));
    for (let t of Object.keys(lightTheme)) {
      for (let l = 0; l < lightTheme[t].l.length; l++) {
        lightTheme[t].l[l] = 100 - lightTheme[t].l[l];
      }
    }

    let thm = { light: lightTheme, dark: darkTheme };

    console.log(thm);

    return thm;
  }

  let theme;
  $: theme = buildTheme(levels, names, gap);
</script>

<div class="p-4">
  <h2 class="t-center">Theme Builder</h2>

  <div class="t-center">
    Level Count:<input bind:value={levels} type="number" min="1" step="1" />
    Lightness Gap: <input bind:value={gap} type="number" />
  </div>

  <div class="flex">
    <div class="">
      <h4 class="t-center">Light</h4>
      <Pelette bind:theme={theme.light} />

      <textarea class="box">{buildThemeVars(theme.light)}</textarea>
    </div>
    <div class="">
      <h4 class="t-center">Dark</h4>
      <Pelette bind:theme={theme.dark} />

      <textarea class="box">{buildThemeVars(theme.dark)}</textarea>
    </div>
  </div>
</div>

<style>
  textarea {
    width: 100%;
    height: 28rem;
  }
  .t-center {
    text-align: center;
  }
  .p-4 {
    padding: 1rem;
  }

  .flex {
    display: flex;
    justify-content: space-evenly;
  }
  .box {
    border: 1px solid gray;
    border-radius: 0.5rem;
    padding: 0.5rem;
  }
</style>
