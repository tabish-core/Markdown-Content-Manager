import express from "express";
import { supabase } from "../config/db.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Get all notes for the logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', req.user.id);

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// Create a note
router.post("/", auth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('notes')
      .insert([
        { 
          title: req.body.title, 
          content: req.body.content, 
          user_id: req.user.id 
        }
      ])
      .select();

    if (error) throw error;
    res.json(data[0]);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// Delete a note
router.delete("/:id", auth, async (req, res) => {
  try {
    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', req.params.id)
      .eq('user_id', req.user.id);

    if (error) throw error;
    res.json({ msg: "Note removed" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

export default router;