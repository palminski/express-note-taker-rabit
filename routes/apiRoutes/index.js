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

    return note;
}

function filterByID(noteId, notesArray) {
    const result = notesArray.filter(note => note.id === noteId)[0];
    return result;
}

//<><><><><>< GET REQUESTS ><><><><><>
router.get('/notes', (req,res ) => {
    let results = notes;
    console.log(req.body);
    
    res.json(results);
})

//<><><><><>< POST REQUESTS ><><><><><>
router.post('/notes' , (req,res) => {
    newId = parseInt(notes[notes.length-1].id) + 1;
    newId = newId.toString();
    console.log(newId);

    req.body.id = newId;
    
    console.log(req.body);

    
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
router.get('/notes/:id', (req,res ) => {
    let results = filterByID(req.params.id, notes);
    console.log(results);
    
    res.json(results);
})



module.exports = router;