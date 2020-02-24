// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type])
    }
});

const mousetrap = require('mousetrap');
const play = require('./play');

const mapping = {
    a: 'C3',
    s: 'D3',
    d: 'E3',
    f: 'F3',
    g: 'G3',
    h: 'A3',
    j: 'B3',
    k: 'C4',
    l: 'D4',
    ';': 'E4',
    q: 'F4',
    w: 'G4',
    e: 'A4',
    r: 'B4',
    t: 'C5',
    y: 'D5',
    u: 'E5',
    i: 'F5',
    o: 'G5',
    p: 'A5',
    '1': 'B5',
    '2': 'C6',
};

console.log(Object.keys(mapping));

for (let key of Object.keys(mapping)) {
    mousetrap.bind(key, function () {
        let note = mapping[key];
        play.play_one(note);
    })
}
