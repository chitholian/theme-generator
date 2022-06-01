import chroma from 'chroma-js'

export function fixInt(val) {
    return Math.round(Number(val))
}

export function buildThemeVars(theme) {
    let lines = '';
    for (let i of Object.keys(theme)) {
        for (let j = 0; j < theme[i].l.length; j++) {
            let col = chroma(theme[i].l[j], theme[i].a, theme[i].b, 'lab').hsl()
            lines += ` --color-${i}-${j + 1}:hsl(${fixInt(col[0])},${fixInt(col[1] * 100)}%,${fixInt(col[2] * 100)}%);\n`
        }
    }
    return ':root{\n' + lines + '}'
}

export function buildTheme(levels, names, gap, shift, baseA, baseB) {
    let value = [];
    let lStart = 50 - Math.ceil(((levels - 1) / 2) * gap) - shift;

    for (let l = 1; l <= levels; l++) {
        let v = Math.abs((l - 1) * gap + lStart) % 101;
        value.push(v);
    }
    let ja = fixInt(10 + (Math.random() * 1000) % 100)
    let jb = fixInt(10 + (Math.random() * 1000) % 100)
    let darkTheme = {};
    let i = 0;
    for (let n of names) {
        darkTheme[n] = {
            l: [...value],
            a: (baseA + (ja * i)) % 128,
            b: (baseB + (jb * i)) % 128,
        };
        i++
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

export function calcLuminance(l, a, b) {
    let rgb = chroma(...chroma(l, a, b, 'lab').hsl(), 'hsl').rgb()
    return fixInt((.299 * rgb[0] / 255 + .587 * rgb[1] / 255 + .114 * rgb[2] / 255) * 100)
}
