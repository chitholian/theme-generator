import chroma from 'chroma-js'

export function fixInt(val) {
    return Math.round(Number(val))
}

export function buildThemeVars(theme) {
    let lines = '';
    for (let i of Object.keys(theme)) {
        for (let j = 0; j < theme[i].l.length; j++) {
            let rgb = chroma(theme[i].l[j], theme[i].c, theme[i].h, 'lch').rgb();
            lines += ` --color-${i}-${j + 1}:rgb(${rgb[0]},${rgb[1]},${rgb[2]});\n`
        }
    }
    return ':root{\n' + lines + '}'
}

export function hsv2hsl(h, c, v, l = v - v * c / 2, m = Math.min(l, 1 - l)) {
    return [h, m ? (v - l) / m : 0, l]
}

export function hsl2rgb(h, c, l) {
    let a = c * Math.min(l, 1 - l);
    let f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return [f(0), f(8), f(4)];
}

export function getLuminance(r, g, b) {
    let lum = (.299 * r + .587 * g + .114 * b);
    //console.log(r, g, b, lum);

    return fixInt(lum / 255 * 100);
}

export function buildTheme(levels, names, gap, shift, baseHue, sat, g) {
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
            h: Math.abs(baseHue + g * i++) % 360,
            c: sat,
            l: [...value],
        };
    }
    darkTheme = {
        ...darkTheme,
    };
    let lightTheme = JSON.parse(JSON.stringify(darkTheme));
    for (let t of Object.keys(lightTheme)) {
        for (let l = 0; l < lightTheme[t].l.length; l++) {
            lightTheme[t].l[l] = 100 - lightTheme[t].l[l];
        }
    }
    return {light: lightTheme, dark: darkTheme};
}

export function calcLuminance(l, c, h) {
    let rgb = chroma(l, c, h, 'lch').rgb()
    return getLuminance(fixInt(rgb[0]), fixInt(rgb[1]), fixInt(rgb[2]));
}
