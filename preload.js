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

const scale = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

class Note {

    constructor(letter, octave, sharp) {
        this.letter = letter;
        this.octave = octave;
        this.sharp = sharp || false;
    }

    toString() {
        let base = this.letter + this.octave;
        if (this.sharp) {
            base += '+';
        }
        return base;
    }

    // sharp() {
    //     // assert(!this.sharp);
    //     if (this.letter === 'E') {
    //         return new Note('F', this.octave, false);
    //     } else if (this.letter === 'B') {
    //         return new Note('C', this.octave + 1, false);
    //     } else {
    //         return new Note(this.letter, this.octave, true);
    //     }
    // }
}


const notes = {
    2: ['z', 'x', 'c', 'v', 'b', 'n', 'm'], // C2-B2
    3: ['a', 's', 'd', 'f', 'g', 'h', 'j'], // C3-B3
    4: ['k', 'l', ';', 'q', 'w', 'e', 'r'], // C4-B4
    5: ['t', 'y', 'u', 'i', 'o', 'p'],      // C5-A5
};

for (let octave = 0; octave < 7; octave++) {
    for (let i = 0; i < 7; i++) {
        if (notes[octave] === undefined || notes[octave][i] === undefined) {
            continue;
        }
        let key = notes[octave][i];
        let letter = scale[i];
        // Bind common notes
        {
            let note = new Note(letter, octave);
            // console.log({key: key, note: note, note_string: note.toString()});
            mousetrap.bind(key, function () {
                play.play_one(note);
            });
        }
        // Bind sharp notes
        if (letter !== 'E' && letter !== 'B') {
            let sharp_key = `shift+${key}`;
            let sharp_note = new Note(letter, octave, true);
            // console.log({key: key, note: sharp_note, note_string: sharp_note.toString()});
            mousetrap.bind(sharp_key, function () {
                play.play_one(sharp_note);
            });
        }
    }
}

