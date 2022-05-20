export function buildThemeVars(theme) {
    let lines = '';
    for (let i of Object.keys(theme)) {
        for (let j = 0; j < theme[i].l.length; j++) {
            lines += `  --color-${i}-${j + 1}:hsl(${theme[i].h},${theme[i].s}%,${theme[i].l[j]}%);\n`
        }
    }
    return ':root{\n' + lines + '}'
}
