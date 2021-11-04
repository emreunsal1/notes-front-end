import React, { useEffect, useState } from "react";
import { getMyNotes } from "../functions";
export default function Notes() {
  const myNotes = async () => {
    const response = await getMyNotes();
    const data = await response.json();
    console.log(data);
  };
  const [notes, setnotes] = useState([myNotes]);
  useEffect(() => {
    myNotes();
  }, []);

  return <div></div>;
}
