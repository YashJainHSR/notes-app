const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);
    if(!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.bgGreen('Note Added!'));
    } else {
        console.log(chalk.bgRed('Duplicate Note'));
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const updatedNoted = notes.filter((note) => note.title != title);

    if(updatedNoted.length != notes.length) {
        saveNotes(updatedNoted);
        console.log(chalk.bgGreen('Note removed!'));
    } else {
        console.log(chalk.bgRed('No note found with title: ' + title));
    }
} 

const listNodes = () => {
    const notes = loadNotes();
    console.log(chalk.yellow('Your Notes!'))
    notes.forEach((note) => console.log(note.title));
}

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title);
    if(note) {
        console.log(chalk.inverse(title));
        console.log(note.body);
    } else {
        console.log(chalk.red('Note not found!'));
    }
    
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const data = dataBuffer.toString();
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

const saveNotes = (notes) => {
    const data = JSON.stringify(notes);
    fs.writeFileSync('notes.json', data);
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNodes:listNodes,
    readNote:readNote
}