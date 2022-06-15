import React from "react";
import Modal from "react-modal";
import Button from "../../../components/Button";
import InputBox from "../../../components/InputBox";
import "./ProfileEdit.css";
export default function ProfileEdit(props) {
  const handleForm = (e) => {
    console.log(e);
  };
  return (
    <Modal
      className="profileEdit"
      isOpen={true}
      onRequestClose={() => props.setModalOpen(false)}
      ariaHideApp={false}
      overlayClassName="overlay"
    >
      <form className="profileEditForm">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center m-5">
          Profile Details
        </h1>
        <div className="inputboxes m-7">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox title="Name" type="text" textHandler={handleForm} />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox title="Location" type="text" textHandler={handleForm} />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="Designation"
              type="text"
              textHandler={handleForm}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox title="Working" type="text" textHandler={handleForm} />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox title="Email" type="email" textHandler={handleForm} />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox title="Mobile" type="text" textHandler={handleForm} />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox title="About" type="text" textHandler={handleForm} />
          </div>
        </div>
        <div className="buttons">
          <div className="m-5">
            <Button name="Cancel" onClick={() => props.setModalOpen(false)} />
          </div>
          <div className="m-5">
            <Button name="Submit" />
          </div>
        </div>
      </form>
    </Modal>
  );
}
