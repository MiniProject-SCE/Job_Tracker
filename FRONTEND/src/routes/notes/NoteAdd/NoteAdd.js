import React, { useState } from "react";
import Modal from "react-modal";
import Button from "../../../components/Button";
import axios from "axios";
import "./NoteAdd.css";
export default function NoteAdd(props) {
  const [inputs, setInputs] = useState({});

  const handleChange = (e) =>
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  function NotesPost() {
    axios
      .post(
        "http://localhost:5000/api/jobtracker/addNotes",
        { 
          title: inputs.title,
          descriptions: inputs.description,
          color: inputs.colorPick
        },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then(() => {
        window.alert("Note Added Successfully");
        props.setModalOpen(false);
        window.location.reload();
      });
  }
  console.log(inputs)
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
          type="text"
          name="title"
          value={inputs.title? inputs.title: ""}
          onChange={handleChange}
        />
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Description
        </label>
        <textarea
          rows={10}
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white resize rounded-md"
          name="description"
          value={inputs.description? inputs.description: ""}
          type="text"
          onChange={handleChange}
        ></textarea>
        <div className="color-picker">
          <input
            type="radio"
            name="colorPick"
            value="pink"
            id="color1"
            onChange={handleChange}
          />
          <label
            htmlFor="color1"
            style={{ backgroundColor: "#F06292" }}
          ></label>
          <input
            type="radio"
            name="colorPick"
            value="purple"
            id="color2"
            onChange={handleChange}
          />
          <label
            htmlFor="color2"
            style={{ backgroundColor: "#BA68C8" }}
          ></label>
          <input
            type="radio"
            name="colorPick"
            value="yellow"
            id="color3"
            onChange={handleChange}
          />
          <label
            htmlFor="color3"
            style={{ backgroundColor: "#FFD54F" }}
          ></label>
          <input
            type="radio"
            name="colorPick"
            value="blue"
            id="color4"
            onChange={handleChange}
          />
          <label
            htmlFor="color4"
            style={{ backgroundColor: "#4FC3F7" }}
          ></label>
          <input
            type="radio"
            name="colorPick"
            value="green"
            id="color5"
            onChange={handleChange}
          />
          <label
            htmlFor="color5"
            style={{ backgroundColor: "#AED581" }}
          ></label>
        </div>
      </div>

      <div className="buttons">
        <Button name="Cancel" onClick={() => props.setModalOpen(false)} />
        <Button name="Submit" onClick={() => NotesPost()} />
      </div>
    </Modal>
  );
}
