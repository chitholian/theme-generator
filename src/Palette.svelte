<script type="ts">
    import {buildThemeVars, fixInt, calcLuminance} from "./extra";
    import chroma from "chroma-js";

    export let theme = {};

    function getBgColor(l, a, b) {
        //return `lch(${l}%,${c}%,${h})`
        let col = chroma(l, a, b, 'lab').hsl()
        return `hsl(${fixInt(col[0])},${fixInt(col[1] * 100)}%,${fixInt(col[2] * 100)}%)`;
    }
</script>

<div class="flex">
    {#each Object.keys(theme) as k (k)}
        <div class="box">
            <h4 class="t-center">{k}</h4>
            <div class="flex">
                A: {theme[k].a}
                <span style="background: linear-gradient(90deg, green, red)">
                    <input type="range" min="-128" max="127" bind:value={theme[k].a}/>
                </span>
                B: {theme[k].b}
                <span style="background: linear-gradient(90deg, blue, yellow)">
                    <input type="range" min="-128" max="127" bind:value={theme[k].b}/>
                </span>
            </div>
            <div>
                {#each theme[k].l as l, i (i)}
                    <div class="color">
                        {i + 1}. L: {l}
                        <span style={`background: ${getBgColor(l, theme[k].a, theme[k].b)}`}>
                          <input type="range" min="0" max="100" bind:value={l}/>
                        </span>
                        Lum: {calcLuminance(l, theme[k].a, theme[k].b)}
                    </div>
                {/each}
            </div>
        </div>
    {/each}
    <textarea class="box">{buildThemeVars(theme)}</textarea>
</div>
