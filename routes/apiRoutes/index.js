const router = require("express").Router();
const path = require("path");
const { notes } = require('../../db/db.json');

router.get('/notes', (req,res ) => {
    let results = notes;
    console.log(notes);
    res.json(results);
})

module.exports = router;