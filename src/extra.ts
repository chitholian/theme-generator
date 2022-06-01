import {hsluvToRgb} from "hsluv";

export const hueGradient = 'linear-gradient(90deg, red, yellow, green, cyan, blue, magenta, red)'

export function rgb2hsl(r, g, b) {
    // Find greatest and smallest channel values
    let cMin = Math.min(r, g, b),
        cMax = Math.max(r, g, b),
        delta = cMax - cMin,
        h = 0,
        s = 0,
        l = 0;
    // Calculate hue
    // No difference
    if (delta == 0) h = 0;
    // Red is max
    else if (cMax == r) h = ((g - b) / delta) % 6;
    // Green is max
    else if (cMax == g) h = (b - r) / delta + 2;
    // Blue is max
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    // Make negative hues positive behind 360°
    if (h < 0) h += 360;
    // Calculate lightness
    l = (cMax + cMin) / 2;

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return [h, s, l]
}

export function fixInt(val) {
    return Math.round(Number(val))
}

export function buildThemeVars(theme) {
    let lines = '';
    for (let i of Object.keys(theme)) {
        for (let j = 0; j < theme[i].l.length; j++) {
            let tmp = hsluvToRgb([theme[i].h, theme[i].s, theme[i].l[j]])
            let col = rgb2hsl(...tmp)
            lines += ` --color-${i}-${j + 1}:hsl(${fixInt(col[0])},${fixInt(col[1])}%,${fixInt(col[2])}%);\n`
        }
    }
    return ':root{\n' + lines + '}'
}

export function buildTheme(levels, names, gap, shift, baseHue, saturation, hueJump) {
    let value = [];
    let lStart = 50 - Math.ceil(((levels - 1) / 2) * gap) - shift;

    for (let l = 1; l <= levels; l++) {
        let v = Math.abs((l - 1) * gap + lStart) % 101;
        value.push(v);
    }
    let darkTheme = {};
    let i = 0;
    for (let n of names) {
        darkTheme[n] = {
            h: Math.abs(baseHue + i * hueJump) % 360,
            s: saturation,
            l: [...value],
        };
        i++
    }
    darkTheme = {
        ...darkTheme,
        success: {h: 120, s: saturation, l: [...value]},
        info: {h: 240, s: saturation, l: [...value]},
        warning: {h: 60, s: saturation, l: [...value]},
        danger: {h: 0, s: saturation, l: [...value]},
    };
    let lightTheme = JSON.parse(JSON.stringify(darkTheme));
    for (let t of Object.keys(lightTheme)) {
        for (let l = 0; l < lightTheme[t].l.length; l++) {
            lightTheme[t].l[l] = 100 - lightTheme[t].l[l];
        }
    }
    return {light: lightTheme, dark: darkTheme};
}

export function calcLuminance(h, s, l) {
    let rgb = hsluvToRgb([h, s, l])
    return fixInt((.299 * rgb[0] + .587 * rgb[1] + .114 * rgb[2]) * 100)
}
