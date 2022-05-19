const express = require('express');
const router = express.Router();
const fetchusers = require('../middleware/fetchusers');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required
router.get('/fetchallnotes', fetchusers, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error 2");
    }
})

// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post('/addnote', fetchusers, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
        try {
            const { title, description, tag } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title, description, tag, user: req.user.id
            })

            console.log(note);
            const savedNote = await note.save()

            res.json(savedNote)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error 3");
        }
    })

// ROUTE :  3  update  notes  : Put "/api/notes/update  .login required
router.put("/updatenote/:id", fetchusers, async (req, res) => {
    const { title, description, tag } = req.body;

    //create  a new note object
    try {
        const newNote = {};
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }
        // Find note  to be updated
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.sendStatus(404).send("not found");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("not allowed");
        }
        note = await Note.findByIdAndUpdate(
            req.params.id,
            { $set: newNote },
            { new: true }
        );
        res.json({ note });
    } catch (error) {
        res.status(500).send("Inernal server error occured");
    }
});
// ROUTE :  4  delete  an existing notes  : delete "/api/notes/update  .login required
router.delete("/deletenotes/:id", fetchusers, async (req, res) => {
    try {
        // Find note  to be deleted
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.sendStatus(404).send("not found");
        }
        //allow deleteion  if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("not allowed");
        }
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ success: "NOTE HAs BEEN DELETED" });
    } catch (error) {
        res.status(500).send("Inernal server error occured");
    }
});
module.exports = router;
