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

//<><><><><>< GET REQUESTS ><><><><><>
router.get('/notes', (req,res ) => {
    let results = notes;
    console.log(req.body);
    
    res.json(results);
})

//<><><><><>< POST REQUESTS ><><><><><>
router.post('/notes' , (req,res) => {
    req.body.id = notes[notes.length-1].id + 1;
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

module.exports = router;