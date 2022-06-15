import React, { useState } from "react";
import NoteEdit from "./NoteEdit/NoteEdit";

export default function NotesCard(props) {
  const note = props.note;
  const bg = `bg-${props.note.color}-500`;
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <div
        className={`${bg} rounded shadow border p-6 w-64`}
        onClick={() => setModalOpen(true)}
      >
        <h5 className="text-3xl font-bold mb-4 mt-0">{note.title}</h5>
        <p className="text-gray-700 text-sm">{note.descriptions}</p>
      </div>
      {isModalOpen ? (
        <NoteEdit setModalOpen={setModalOpen} data={note} />
      ) : null}
    </div>
  );
}
