import React, { useState } from "react";
import Modal from "react-modal";
import Button from "../../../components/Button";
import InputBox from "../../../components/InputBox";
import "./ContactEdit.css";
import axios from "axios";
export default function ContactEdit(props) {
  const contactInfo = props.data;
  const [inputs, setInputs] = useState({});

  const handleChange = (e) =>
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  function ContactUpdate() {
    axios
      .put(
        `http://localhost:5000/api/jobtracker/updateContact/${contactInfo._id}`,
        inputs,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then(() => {
        window.alert("Contact Updated Successfully");
        props.setModalOpen(false);
        window.location.reload();
      });
  }
  return (
    <Modal
      className="contactEdit"
      isOpen={true}
      onRequestClose={() => props.setModalOpen(false)}
      ariaHideApp={false}
      overlayClassName="overlay"
    >
      <form className="contactForm">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center m-5">
          Contact Details
        </h1>
        <div className="inputboxes m-7">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="Designation"
              type="text"
              name="designation"
              value={
                inputs.designation
                  ? inputs.designation
                  : contactInfo.designation
              }
              textHandler={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="Email"
              type="email"
              name="email"
              value={inputs.email ? inputs.email : contactInfo.email}
              textHandler={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="Mobile"
              type="text"
              name="phoneno"
              value={inputs.phoneno ? inputs.phoneno : contactInfo.phoneno}
              textHandler={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="Location"
              type="text"
              name="location"
              value={inputs.location ? inputs.location : contactInfo.location}
              textHandler={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="LinkedIn Url"
              type="text"
              name="linkedin"
              value={inputs.linkedin ? inputs.linkedin : contactInfo.linkedin}
              textHandler={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="Github Url"
              type="text"
              name="github"
              value={inputs.github ? inputs.github : contactInfo.github}
              textHandler={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="Portfolio Url"
              type="text"
              name="portfolio"
              value={
                inputs.portfolio ? inputs.portfolio : contactInfo.portfolio
              }
              textHandler={handleChange}
            />
          </div>
        </div>
        <div className="buttons">
          <div className="m-5">
            <Button name="Cancel" onClick={() => props.setModalOpen(false)} />
          </div>
          <div className="m-5">
            <Button name="Submit" onClick={() => ContactUpdate()} />
          </div>
        </div>
      </form>
    </Modal>
  );
}
