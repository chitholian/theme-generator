export function buildThemeVars(theme, mode = 'hsb') {
    let lines = '';
    for (let i of Object.keys(theme)) {
        for (let j = 0; j < theme[i].l.length; j++) {
            let hsl = mode === 'hsl' ? [theme[i].h, theme[i].s / 100, theme[i].l[j] / 100] : hsv2hsl(theme[i].h, theme[i].s / 100, theme[i].l[j] / 100);
            lines += ` --color-${i}-${j + 1}:hsl(${hsl[0]},${(hsl[1] * 100).toFixed(0)}%,${(hsl[2] * 100).toFixed(0)}%);\n`
        }
    }
    return ':root{\n' + lines + '}'
}
export function hsv2hsl(h, s, v, l = v - v * s / 2, m = Math.min(l, 1 - l)) {
    return [h, m ? (v - l) / m : 0, l]
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
