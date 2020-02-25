#!/usr/bin/env python3

from pathlib import Path
import os

os.chdir('notes')

def name2value(name):
    letter = name[0]
    octave = int(name[1])
    sharp = 1 if len(name) > 2 else 0
    return (octave * 12 + scale[letter] + sharp) - 8


scale = {
    'C': 0,
    'D': 2,
    'E': 4,
    'F': 5,
    'G': 7,
    'A': 9,
    'B': 11,
}

notes = []

for note in Path('.').iterdir():
    name = note.stem
    value = name2value(name)
    notes.append((name, value))

notes.sort(key=lambda e: e[1])
for (name, value) in notes:
    print(f'mv {name}.mp3 {value}.mp3')

