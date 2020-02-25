// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const mousetrap = require('mousetrap');
const play = require('./play');

const scale = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

const currentNote = document.querySelector(".nowplaying");

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

for (let octave = 0; octave < 7; octave++) {
    for (let i = 0; i < 7; i++) {
        if (notes[octave] === undefined || notes[octave][i] === undefined) {
            continue;
        }
        let key = notes[octave][i];
        let letter = scale[i];
        // Bind common notes
        let note = Note.fromName(letter, octave);
        mousetrap.bind(key, function () {
            play.play_one(note);
            currentNote.innerHTML = note.name();
        });

        // Bind sharp notes
        let sharp_note = note.sharp();
        let sharp_key = `shift+${key}`;
        // console.log({key: key, note: sharp_note, note_string: sharp_note.toString()});
        mousetrap.bind(sharp_key, function () {
            play.play_one(sharp_note);
            currentNote.innerHTML = sharp_note.name();
        });
    }
}
