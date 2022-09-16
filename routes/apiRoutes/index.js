const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const { notes } = require('../../db/db.json');

function validateBody (body) {
    if (!body.title || typeof body.title !== "string") {
        return false;
    }
    if (!body.text || typeof body.text !== "string") {
        return false;
    }
    return true;
}

function createNote (body, noteArray) {
    const note = body;
    noteArray.push(note);
    

    fs.writeFileSync(
        path.join(__dirname,'../../db/db.json'),
        JSON.stringify({ notes: noteArray},null,2)
    );
    console.log(`New note created!`);
    return note;
}

function deleteNote (noteId, noteArray) {
    
    const indexToDelete = noteArray.findIndex(element => element.id === noteId); //Finds correct note to delete

    noteArray.splice(indexToDelete,1); //deletes 1 item at index to delete
    console.log(`Deleted item with id of ${noteId}`);

    fs.writeFileSync(
        path.join(__dirname,'../../db/db.json'),
        JSON.stringify({ notes: noteArray},null,2)
    );
}

function filterByID(noteId, notesArray) {
    const result = notesArray.filter(note => note.id === noteId)[0];
    return result;
}

//<><><><><>< GET REQUESTS ><><><><><>
router.get('/notes', (req,res ) => {
    let results = notes;
    res.json(results);

    console.log(`All notes are being displayed!`);
})

//<><><><><>< POST REQUESTS ><><><><><>
router.post('/notes' , (req,res) => {
    newId = parseInt(notes[notes.length-1].id) + 1;
    newId = newId.toString();

    req.body.id = newId;
        
    if (!validateBody(req.body))
    {
        res.status(400).send("Illigal Note Found");
    }
    else
    {
        const note = createNote(req.body, notes);
        res.json(note);
        
    }
})

//<><><><><>< DELETE REQUESTS ><><><><><>
router.delete('/notes/:id', (req,res ) => {
    let results = filterByID(req.params.id, notes);
    
    deleteNote(req.params.id, notes);
    res.json(results);
})



module.exports = router;