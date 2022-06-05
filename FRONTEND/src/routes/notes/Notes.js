import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import NoteAdd from "./NoteAdd/NoteAdd";
export default function Notes() {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <Navbar />
      <div className="notes">
        <button
          className="bg-pink-500 hover:bg-pink-300 text-white font-bold py-2 px-4 border-b-4 border-white-700 hover:border-white-500 m-5 rounded"
          onClick={() => setModalOpen(true)}
        >
          + Add Notes
        </button>
      </div>
      {isModalOpen ? <NoteAdd setModalOpen={setModalOpen} /> : null}
    </div>
  );
}
