import React, { useEffect, useState } from "react";
import NoteItem from "../components/NoteItem";
import { getMyNotes } from "../functions";
import Box from "@mui/material/Box";
import AddNotes from "../components/AddNotes";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useHistory } from "react-router-dom";
import { IconButton } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Switch from "@mui/material/Switch";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [filteredNotes, setFilteredNotes] = useState([]);

  const history = useHistory();

  useEffect(() => {
    fetchMyNotes();
  }, []);

  const onSubmit = (newNote) => {
    setFilteredNotes([newNote, ...notes]);
    setNotes([newNote, ...notes]);
    setIsModalOpen(false);
    setIsSuccess(true);
  };

  const onDelete = (deletedNote) => {
    const newList = notes.filter((item) => item._id !== deletedNote._id);
    setNotes(newList);
    setFilteredNotes(newList);
  };

  const fetchMyNotes = async () => {
    const response = await getMyNotes();
    const data = await response.data;
    setNotes(data);
    setFilteredNotes(data);
  };

  const filterOnClick = (e) => {
    if (e.target.checked) {
      return setFilteredNotes(notes.filter((item) => item.favorited));
    }
    setFilteredNotes(notes);
  };

  return (
    <Box>
      <Snackbar
        open={isSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={() => setIsSuccess(false)}
      >
        <Alert variant="filled" severity="success">
          Note added successfully
        </Alert>
      </Snackbar>
      <Typography
        variant="h1"
        md={{ my: 3 }}
        sx={{ fontSize: "40px", my: 2, mr: "50px" }}
      >
        Your Sticky Notes
      </Typography>
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ display: "inline" }}>
          Favorites Only
        </Typography>
        <Switch
          onChange={filterOnClick}
          sx={{
            "& .MuiSwitch-switchBase": {
              "&.Mui-checked": {
                color: "red",
              },
              "& + .MuiSwitch-track": {
                backgroundColor: "red",
              },
            },
          }}
        />
      </Box>
      <Grid alignItems={"stretch"} container spacing={2}>
        {filteredNotes.map((note, index) => (
          <Grid item xs={12} md={4}>
            <NoteItem
              note={note}
              key={index}
              onDelete={onDelete}
              onUpdate={fetchMyNotes}
            />
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
      <IconButton
        size="large"
        sx={{
          position: "fixed",
          top: 30,
          right: 30,
          cursor: "pointer",
          color: "red",
        }}
        onClick={async () => {
          window.localStorage.clear();
          history.push("/");
        }}
      >
        <ExitToAppIcon fontSize="inherit" />
      </IconButton>
    </Box>
  );
}
