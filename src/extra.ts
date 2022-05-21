export function fixInt(val) {
    return parseInt(Number(val).toFixed(0))
}

export function buildThemeVars(theme, mode = 'hsb') {
    let lines = '';
    for (let i of Object.keys(theme)) {
        for (let j = 0; j < theme[i].l.length; j++) {
            let hsl = mode === 'hsl' ? [theme[i].h, theme[i].s / 100, theme[i].l[j] / 100] : hsv2hsl(theme[i].h, theme[i].s / 100, theme[i].l[j] / 100);
            lines += ` --color-${i}-${j + 1}:hsl(${hsl[0]},${fixInt(hsl[1] * 100)}%,${fixInt(hsl[2] * 100)}%);\n`
        }
    }
    return ':root{\n' + lines + '}'
}
export function hsv2hsl(h, s, v, l = v - v * s / 2, m = Math.min(l, 1 - l)) {
    return [h, m ? (v - l) / m : 0, l]
}
export function hsl2rgb(h, s, l) {
    let a = s * Math.min(l, 1 - l);
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
            s: sat,
            l: [...value],
        };
    }
    darkTheme = {
        ...darkTheme,
        success: { h: 120, s: sat, l: [...value] },
        info: { h: 230, s: sat, l: [...value] },
        warning: { h: 60, s: sat, l: [...value] },
        danger: { h: 0, s: sat, l: [...value] },
        gray: { h: 0, s: 0, l: [...value] },
    };
    let lightTheme = JSON.parse(JSON.stringify(darkTheme));
    for (let t of Object.keys(lightTheme)) {
        for (let l = 0; l < lightTheme[t].l.length; l++) {
            lightTheme[t].l[l] = 100 - lightTheme[t].l[l];
        }
    }
    return { light: lightTheme, dark: darkTheme };
}

export function calcLuminance(h, s, v, mode) {
    let hsl = mode === 'hsl' ? [h, s / 100, v / 100] : hsv2hsl(h, s / 100, v / 100);
    let rgb = hsl2rgb(hsl[0], hsl[1], hsl[2]);

    return getLuminance(fixInt(rgb[0] * 255), fixInt(rgb[1] * 255), fixInt(rgb[2] * 255));
}
