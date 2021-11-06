import React, { useState, useEffect } from "react";
import { Fragment } from "react/cjs/react.production.min";
import { deleteNote, editNote } from "../functions";
import CustomButton from "./CustomButton";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import {
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Grid,
  Box,
} from "@mui/material";
import { MoreVert, Delete, Edit } from "@mui/icons-material";
import { height } from "@mui/system";
import moment from "moment";

export default function NoteItem({ note, onDelete }) {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [noteTitle, setNoteTitle] = useState(note.title);
  const [noteContent, setNoteContent] = useState(note.content);
  const [menuOpened, setMenuOpened] = useState(false);
  const [anchor, setAnchor] = useState(null);

  useEffect(() => {
    setNoteTitle(note.title);
    setNoteContent(note.content);
  }, [note]);

  const deleteNoteOnClick = async (id) => {
    setButtonDisabled(true);
    const response = await deleteNote(id);
    const data = await response.json();
    setButtonDisabled(false);
    const deletedNote = data.data;
    onDelete(deletedNote);
    setMenuOpened(false);
  };
  const editedNote = async () => {
    setButtonDisabled(true);
    const noteInfomation = {
      title: noteTitle,
      content: noteContent,
    };
    const response = await editNote(note._id, noteInfomation);
    const data = await response.json();
    setButtonDisabled(false);
    console.log(data);
    setIsEdit(!setIsEdit);
  };

  const getDate = (date) => moment(date).format("DD.MM.yyyy");
  const getTime = (date) => moment(date).format("HH.mm");

  return (
    <Card sx={{ position: "relative", height: "100%" }} fullWidth>
      <CardHeader
        sx={{ position: "absolute", right: 0, zIndex: 1 }}
        disableTypography
        action={
          <div>
            {!isEdit && (
              <IconButton
                onClick={(e) => {
                  setMenuOpened(true);
                  setAnchor(e.currentTarget);
                }}
              >
                <MoreVert />
              </IconButton>
            )}
            <Menu
              id="basic-menu"
              anchorEl={anchor}
              open={menuOpened}
              onClose={() => setMenuOpened(false)}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem
                onClick={() => {
                  setIsEdit(!isEdit);
                  setMenuOpened(false);
                }}
              >
                <Edit sx={{ mr: 2 }} /> Edit
              </MenuItem>
              <MenuItem onClick={() => deleteNoteOnClick(note._id)}>
                <Delete sx={{ mr: 2 }} /> Delete
              </MenuItem>
            </Menu>
          </div>
        }
      />
      <CardContent justifyContent="space-between">
        {!isEdit ? (
          <Typography noWrap gutterBottom variant="h5" component="div">
            {noteTitle}
          </Typography>
        ) : (
          <TextField
            fullWidth
            variant="outlined"
            label="Title"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
          />
        )}
        {!isEdit ? (
          <>
            <Grid container flexDirection="column" sx={{ height: "100%" }}>
              <Typography
                variant="body2"
                gutterBottom
                color="text.secondary"
                sx={{ maxHeight: 350, overflowY: "scroll" }}
              >
                {noteContent}
              </Typography>
              <Box>
                <Typography
                  variant="caption"
                  display="block"
                  sx={{ color: "text.disabled" }}
                >
                  {getTime(note.updatedAt)}
                </Typography>
                <Typography
                  variant="caption"
                  display="block"
                  sx={{ color: "text.disabled" }}
                >
                  {getDate(note.updatedAt)}
                </Typography>
              </Box>
            </Grid>
          </>
        ) : (
          <TextField
            sx={{ mt: 3 }}
            fullWidth
            variant="outlined"
            label="Content"
            multiline
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
          />
        )}
        {isEdit && (
          <LoadingButton
            sx={{
              mt: 2,
            }}
            fullWidth
            loading={buttonDisabled}
            variant="outlined"
            size="medium"
            onClick={() => editedNote()}
          >
            Save
          </LoadingButton>
        )}
      </CardContent>
    </Card>
  );
}
