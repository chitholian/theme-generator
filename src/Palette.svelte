<script type="ts">
    import {buildThemeVars, calcLuminance, fixInt, hueGradient, rgb2hsl} from "./extra";
    import {hsluvToRgb} from "hsluv";

    export let theme = {};

    function getBgColor(h, s, l) {
        let tmp = hsluvToRgb([h, s, l])
        let col = rgb2hsl(...tmp)
        return `hsl(${fixInt(col[0])},${fixInt(col[1])}%,${fixInt(col[2])}%)`
    }
</script>

<div class="flex">
    {#each Object.keys(theme) as k (k)}
        <div class="box">
            <h4 class="t-center">{k}</h4>
            <div class="flex">
                H: {theme[k].h}
                <span style="background: {hueGradient}">
                    <input type="range" min="0" max="359" bind:value={theme[k].h}/>
                </span>
                S: {theme[k].s}
                <span style="background: linear-gradient(90deg, hsl({theme[k].h}, 0%, 50%), hsl({theme[k].h}, 100%, 50%))">
                    <input type="range" min="0" max="100" bind:value={theme[k].s}/>
                </span>
            </div>
            <div>
                {#each theme[k].l as l, i (i)}
                    <div class="color">
                        {i + 1}. L: {l}
                        <span style={`background: ${getBgColor(theme[k].h, theme[k].s, l)}`}>
                          <input type="range" min="0" max="100" bind:value={l}/>
                        </span>
                        Lum: {calcLuminance(theme[k].h, theme[k].s, l)}
                    </div>
                {/each}
            </div>
        </div>
    {/each}
    <textarea class="box">{buildThemeVars(theme)}</textarea>
</div>
