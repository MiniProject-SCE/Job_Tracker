import React from "react";
import Modal from "react-modal";
import Button from "../../../components/Button";
import InputBox from "../../../components/InputBox";
import SelectInputBox from "../../../components/SelectInputBox";
import "./JobActivityAdd.css";
export default function JobActivityAdd(props) {
  const handleForm = (e) => {
    console.log(e);
  };
  return (
    <Modal
      className="jobAdd"
      isOpen={true}
      onRequestClose={() => props.setModalOpen(false)}
      ariaHideApp={false}
      overlayClassName="overlay"
    >
      <form className="jobAddForm">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center m-5">
          Job Details
        </h1>
        <div className="inputboxes m-7">
          <InputBox title="Company" type="text" textHandler={handleForm} />
          <InputBox title="Job Title" type="text" textHandler={handleForm} />
          <InputBox title="Salary" type="text" textHandler={handleForm} />
          <InputBox title="Description" type="text" textHandler={handleForm} />
          <InputBox title="Deadline" type="date" textHandler={handleForm} />
          <InputBox title="Interview" type="date" textHandler={handleForm} />
          <InputBox title="Location" type="text" textHandler={handleForm} />
          <InputBox title="UserName Used" type="text" textHandler={handleForm}/>
          <InputBox
            title="Password Used"
            type="text"
            textHandler={handleForm}
          />
          <InputBox title="Url Used" type="text" textHandler={handleForm} />

          <SelectInputBox title="Category" />
        </div>
        <div className="buttons">
          <Button name="Cancel" onClick={() => props.setModalOpen(false)} />
          <Button name="Submit" />
        </div>
      </form>
    </Modal>
  );
}
