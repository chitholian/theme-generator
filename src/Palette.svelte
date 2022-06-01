<script type="ts">
    import {buildThemeVars, fixInt, calcLuminance} from "./extra";
    import chroma from "chroma-js";

    export let theme = {};

    function getBgColor(l, c, h) {
        //return `lch(${l}%,${c}%,${h})`
        let col = chroma(l, c, h, 'lch').hsl()
        return `hsl(${col[0]},${fixInt(col[1] * 100)}%,${fixInt(col[2] * 100)}%)`;
    }
</script>

<div class="flex">
    {#each Object.keys(theme) as k (k)}
        <div class="box">
            <h4 class="t-center">{k}</h4>
            <div class="flex">
                H: {theme[k].h}
                <input type="range" min="0" max="359" bind:value={theme[k].h}/>
                C: {theme[k].c}
                <input type="range" min="0" max="230" bind:value={theme[k].c}/>
            </div>
            <div>
                {#each theme[k].l as l, i (i)}
                    <div class="color">
                        {i + 1}. L: {l}
                        <span style={`background: ${getBgColor(l, theme[k].c, theme[k].h)}`}>
                          <input type="range" min="0" max="100" bind:value={l}/>
                        </span>
                        Lum: {calcLuminance(l, theme[k].c, theme[k].h)}
                    </div>
                {/each}
            </div>
        </div>
    {/each}
    <textarea class="box">{buildThemeVars(theme)}</textarea>
</div>
