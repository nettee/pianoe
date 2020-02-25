// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const mousetrap = require('mousetrap');
const play = require('./play');

const scale = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

const currentNote = document.querySelector("#current-note");

const letter2value = {
    C: 0,
    D: 2,
    E: 4,
    F: 5,
    G: 7,
    A: 9,
    B: 11,
};

const value2letter = [
    'C', '#C', 'D', '#D',
    'E', 'F', '#F', 'G',
    '#G', 'A', '#A', 'B',
];

class Note {

    constructor(value) {
        this.value = value;
    }

    static fromName(letter, octave, sharp) {
        let value = (octave * 12 + letter2value[letter] + (sharp ? 1 : 0)) - 8;
        return new Note(value);
    }

    sharp() {
        return new Note(this.value + 1);
    }

    flat() {
        return new Note(this.value - 1);
    }

    name() {
        let normValue = this.value + 8;
        let letter = value2letter[(normValue) % 12];
        let octave = Math.floor(normValue / 12);
        return letter + octave;
    }

}

const notes = {
    2: ['z', 'x', 'c', 'v', 'b', 'n', 'm'], // C2-B2
    3: ['a', 's', 'd', 'f', 'g', 'h', 'j'], // C3-B3
    4: ['k', 'l', ';', 'q', 'w', 'e', 'r'], // C4-B4
    5: ['t', 'y', 'u', 'i', 'o', 'p'],      // C5-A5
};

// for (let value = 1; value <= 88; value++) {
//     let note = new Note(value);
//     console.log(note.value, note.name());
// }

function bindKey(key, note) {
    mousetrap.bind(key, function () {
        play.play_one(note);
        currentNote.innerHTML = note.name();
        const key = document.querySelector(`.key[data-note-value="${note.value}"]`);
        if (!!key) {
            key.classList.add("playing");
        }
    });
}

// const hints = document.querySelectorAll(".hints");
// hints.forEach(function(e, index) {
//     e.setAttribute("style", "transition-delay:" + index * 50 + "ms");
// });

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener("transitionend", function (e) {
    if (e.propertyName !== "transform") {
        return;
    }
    this.classList.remove("playing");
}));

for (let octave = 0; octave < 7; octave++) {
    for (let i = 0; i < 7; i++) {
        if (notes[octave] === undefined || notes[octave][i] === undefined) {
            continue;
        }

        let letter = scale[i];
        let key = notes[octave][i];
        let note = Note.fromName(letter, octave);
        bindKey(key, note);
        bindKey(`shift+${key}`, note.sharp());
    }
}
