import React from "react";
import Modal from "react-modal";
import Button from "../../../components/Button";

import "./NoteAdd.css";
export default function NoteAdd(props) {
  const handleForm = (e) => {
    console.log(e);
  };
  return (
    <Modal
      className="noteAdd"
      isOpen={true}
      onRequestClose={() => props.setModalOpen(false)}
      ariaHideApp={false}
      overlayClassName="overlay"
    >
      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center m-5">
        Note
      </h1>
      <div className="noteinputboxes m-7">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Title
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          placeholder="Title"
        />
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Description
        </label>
        <textarea
          rows={10}
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white resize rounded-md"
        ></textarea>
      </div>
      <div className="buttons">
        <Button name="Cancel" onClick={() => props.setModalOpen(false)} />
        <Button name="Submit" />
      </div>
    </Modal>
  );
}
