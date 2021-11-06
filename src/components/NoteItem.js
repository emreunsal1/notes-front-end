import React, { useState } from "react";
import { Fragment } from "react/cjs/react.production.min";
import { deleteNote, editNote } from "../functions";
import CustomButton from "./CustomButton";
export default function NoteItem({ note, onDelete }) {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [noteTitle, setNoteTitle] = useState(note.title);
  const [noteContent, setNoteContent] = useState(note.content);

  const deleteNoteOnClick = async (id) => {
    setButtonDisabled(true);
    const response = await deleteNote(id);
    const data = await response.json();
    setButtonDisabled(false);
    const deletedNote = data.data;
    onDelete(deletedNote);
  };
  const editedNote = async () => {
    const noteInfomation = {
      title: noteTitle,
      content: noteContent,
    };
    const response = await editNote(note._id, noteInfomation);
    const data = await response.json();
    console.log(data);
    setIsEdit(!setIsEdit);
  };

  return (
    <>
      {!isEdit && (
        <li>
          {noteContent}{" "}
          <CustomButton
            text="Delete"
            onClick={() => deleteNoteOnClick(note._id)}
            disabled={buttonDisabled}
          />
          <CustomButton text="Edit" onClick={() => setIsEdit(true)} />
        </li>
      )}
      {isEdit && (
        <>
          <input
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            type="text"
          ></input>
          <input
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            type="text"
          ></input>
          <CustomButton
            text="Save"
            onClick={() => {
              editedNote();
            }}
          />
        </>
      )}
    </>
  );
}
