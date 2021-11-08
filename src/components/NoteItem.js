import React, { useState, useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Card from "@mui/material/Card";
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
import moment from "moment";

import { deleteNote, editNote, updateFavorited } from "../functions";

export default function NoteItem({ note, onDelete, onUpdate }) {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [noteTitle, setNoteTitle] = useState(note.title);
  const [noteContent, setNoteContent] = useState(note.content);
  const [menuOpened, setMenuOpened] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const [isLiked, setIsLiked] = useState(note.favorited);
  const [favoriteButtonDisabled, setFavoriteButtonDisabled] = useState(false);

  useEffect(() => {
    setNoteTitle(note.title);
    setNoteContent(note.content);
    setIsLiked(note.favorited);
  }, [note]);

  const deleteNoteOnClick = async (id) => {
    setButtonDisabled(true);
    const response = await deleteNote(id);
    const data = await response.data;
    onUpdate();
    setButtonDisabled(false);
    const deletedNote = data.data;
    onDelete(deletedNote);
    setMenuOpened(false);
  };

  const upddateNoteFavorite = async () => {
    setFavoriteButtonDisabled(true);
    const response = await updateFavorited(note._id, !isLiked);
    const data = await response.data;
    onUpdate();

    if (data.success) {
      const currentState = data.note.favorited;
      setIsLiked(currentState);
    }
    setFavoriteButtonDisabled(false);
  };

  const editedNote = async () => {
    setButtonDisabled(true);
    const noteInfomation = {
      title: noteTitle,
      content: noteContent,
    };
    await editNote(note._id, noteInfomation);
    setButtonDisabled(false);
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
              <>
                <IconButton
                  onClick={() => upddateNoteFavorite()}
                  disabled={favoriteButtonDisabled}
                  sx={{ color: isLiked ? "red" : "gray" }}
                  size="small"
                >
                  <FavoriteIcon />
                </IconButton>
                <IconButton
                  onClick={(e) => {
                    setMenuOpened(true);
                    setAnchor(e.currentTarget);
                  }}
                >
                  <MoreVert />
                </IconButton>
              </>
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
      <CardContent justifyContent="space-between" sx={{ height: "100%" }}>
        {!isEdit ? (
          <Typography
            noWrap
            gutterBottom
            variant="h5"
            component="div"
            sx={{ mr: "70px" }}
          >
            {noteTitle}
          </Typography>
        ) : (
          <TextField
            sx={{ mb: 3 }}
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
                sx={{
                  minHeight: 350,
                  maxHeight: 350,
                  overflowY: "scroll",
                  mb: "36px",
                }}
              >
                {noteContent}
              </Typography>
              <Box sx={{ position: "absolute", bottom: "12px", left: "12px" }}>
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
            sx={{ maxHeight: 350, overflowY: "scroll", pt: 1 }}
            fullWidth
            variant="standard"
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
