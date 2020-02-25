const player = require('play-sound')(opts = {});

function play_one(note) {
    console.log(note.toString());
    const file = `notes/${note.toString()}.mp3`;
    player.play(file, function (err) {
        if (err) {
            throw err;
        }
    });
}

async function play_all(notes) {
    for (let note of notes) {
        play_one(note);
        await new Promise(r => setTimeout(r, 1000));
    }
}

module.exports = {
    play_one: play_one,
    play_all: play_all,
};


