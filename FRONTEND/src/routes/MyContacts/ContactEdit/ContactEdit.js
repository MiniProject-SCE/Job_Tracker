import React from "react";
import Modal from "react-modal";
import Button from "../../../components/Button";
import InputBox from "../../../components/InputBox";
import "./ContactEdit.css";
export default function ContactEdit(props) {
  const handleForm = (e) => {
    console.log(e);
  };
  return (
    <Modal
      className="contactEdit"
      isOpen={true}
      onRequestClose={() => props.setModalOpen(false)}
      ariaHideApp={false}
      overlayClassName="overlay"
    >     <form className="contactForm">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center m-5">
          Contact Details
        </h1>
        <div className="inputboxes m-7">
          <InputBox title="Name" type="text" textHandler={handleForm} />
          <InputBox title="Designation" type="text" textHandler={handleForm} />
          <InputBox title="Email" type="email" textHandler={handleForm} />
          <InputBox title="Mobile" type="text" textHandler={handleForm} />
          <InputBox title="Location" type="text" textHandler={handleForm} />
          <InputBox title="LinkedIn Url" type="text" textHandler={handleForm} />
          <InputBox title="Github Url" type="text" textHandler={handleForm} />
          <InputBox title="Portfolio Url" type="text" textHandler={handleForm} />
        </div>
        <div className="buttons">
          <Button name="Cancel" onClick = {() => props.setModalOpen(false)}/>
          <Button name="Submit" />
        </div>
      </form>
    </Modal>
  );
}
