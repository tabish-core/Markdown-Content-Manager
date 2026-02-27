import express from "express";
import Note from "../models/Note.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Get all notes for the logged-in user
router.get("/", protect, async (req, res) => {
  try {
    const notes = await Note.find({ createdBy: req.user._id });
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Create a note
router.post("/", protect, async (req, res) => {
  try {
    const note = await Note.create({
      title: req.body.title,
      description: req.body.content,
      createdBy: req.user._id,
    });
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Update a note
router.put("/:id", protect, async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      { title: req.body.title, description: req.body.content },
      { new: true }
    );
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Delete a note
router.delete("/:id", protect, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json({ msg: "Note removed" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

export default router;