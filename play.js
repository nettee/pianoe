const player = require('play-sound')(opts = {});

function play_one(note) {
    if (note.value < 1 || note.value > 88) {
        console.log(`Invalid note value ${note.value}`);
        return;
    }
    console.log(note.name());
    const file = `notes/${note.value}.mp3`;
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


