import React, { useEffect, useState } from "react";
import NoteItem from "../components/NoteItem";
import { getMyNotes, addNotes, deleteNote } from "../functions";

export default function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    myNotes();
  }, []);

  const newNote = async (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const content = event.target.content.value;
    const response = await addNotes(title, content);
    const data = await response.json();
    const addedNote = data.note;
    setNotes([...notes, addedNote]);
  };

  const onDelete = (deletedNote) => {
    const newList = notes.filter((item) => item._id != deletedNote._id);
    setNotes(newList);
  };

  const myNotes = async () => {
    const response = await getMyNotes();
    const data = await response.json();
    setNotes(data);
  };

  return (
    <div>
      <form onSubmit={newNote}>
        <input type="text" name="title"></input>
        <input type="text" name="content"></input>
        <button type="submit">Note Add</button>
      </form>
      <ul>
        {notes.map((note, index) => (
          <NoteItem note={note} key={index} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  );
}
