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
             <div className="color-picker">
          <input type="radio" name="color-pick" value="#F06292" id="color1" />
          <label htmlFor="color1" style={{backgroundColor: "#F06292"}}></label>
          <input type="radio" name="color-pick" value="#BA68C8" id="color2" />
          <label htmlFor="color2" style={{backgroundColor: "#BA68C8"}}></label>
          <input type="radio" name="color-pick" value="#FFD54F" id="color3" />
          <label htmlFor="color3" style={{backgroundColor: "#FFD54F"}}></label>
          <input type="radio" name="color-pick" value="#4FC3F7" id="color4" />
          <label htmlFor="color4" style={{backgroundColor: "#4FC3F7"}}></label>
          <input type="radio" name="color-pick" value="#AED581" id="color5" />
          <label htmlFor="color5" style={{backgroundColor: "#AED581"}}></label>
        </div>
      </div>
   
      <div className="buttons">
        <Button name="Cancel" onClick={() => props.setModalOpen(false)} />
        <Button name="Submit" />
      </div>
    </Modal>
  );
}
