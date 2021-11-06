import React, { useEffect, useState } from "react";
import NoteItem from "../components/NoteItem";
import { getMyNotes, addNotes } from "../functions";
import Box from "@mui/material/Box";
import AddNotes from "../components/AddNotes";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    myNotes();
  }, []);

  const onSubmit = (newNote) => {
    setNotes([newNote, ...notes]);
    setIsModalOpen(false);
  };

  const onDelete = (deletedNote) => {
    const newList = notes.filter((item) => item._id != deletedNote._id);
    setNotes(newList);
  };

  const myNotes = async () => {
    const response = await getMyNotes();
    const data = await response.json();
    setNotes(data);
    console.log(data);
  };

  return (
    <Box>
      <Typography variant="h1" sx={{ my: 3 }}>
        Your Sticky Notes
      </Typography>
      <Grid alignItems={"stretch"} container spacing={2}>
        {notes.map((note, index) => (
          <Grid item xs={4}>
            <NoteItem note={note} key={index} onDelete={onDelete} />
          </Grid>
        ))}
      </Grid>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddNotes onSubmit={onSubmit} />
      </Modal>
      <Fab
        className="float-button"
        color="primary"
        onClick={() => setIsModalOpen(true)}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}
