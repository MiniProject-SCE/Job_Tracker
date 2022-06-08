import React, { useState } from "react";
import Modal from "react-modal";
import Button from "../../../components/Button";
import InputBox from "../../../components/InputBox";
import SelectInputBox from "../../../components/SelectInputBox";
import "./JobActivityEdit.css";
const categories = ["Wishlist", "Applied", "Rejected"];

export default function JobActivityEdit(props) {
  const jobInfo = props.data;
  const [inputs, setInputs] = useState({});
  const handleChange = (e) =>
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  return (
    <Modal
      className="jobEdit"
      isOpen={true}
      onRequestClose={() => props.setModalOpen(false)}
      ariaHideApp={false}
      overlayClassName="overlay"
    >
      <form className="jobEditForm">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center m-5">
          Job Details
        </h1>
        <div className="inputboxes m-7">
          <InputBox
            title="Company"
            name="company"
            value={jobInfo.company}
            type="text"
            textHandler={handleChange}
          />
          <InputBox
            title="Job Title"
            name="jobtitle"
            value={jobInfo.title}
            type="text"
            textHandler={handleChange}
          />
          <InputBox
            title="Salary"
            Z
            name="salary"
            value={jobInfo.salary}
            type="text"
            textHandler={handleChange}
          />
          <InputBox
            title="Location"
            name="location"
            value={jobInfo.location}
            type="text"
            textHandler={handleChange}
          />
          <InputBox
            title="Deadline"
            name="deadline"
            value={jobInfo.deadline}
            type="date"
            textHandler={handleChange}
          />
          <InputBox
            title="Interview"
            name="interview"
            value={jobInfo.interviewDate}
            type="date"
            textHandler={handleChange}
          />
          <InputBox
            title="Website Url"
            name="websiteUrl"
            value={jobInfo.urlUsed}
            type="text"
            textHandler={handleChange}
          />

          <InputBox
            title="Website's UserName"
            value={jobInfo.usernameUsed}
            type="text"
            textHandler={handleChange}
          />
          <InputBox
            title="Website's Password"
            type="text"
            value={jobInfo.pwdUsed}
            textHandler={handleChange}
          />
           <SelectInputBox title="Category" data={categories} />
          <InputBox
            title="Description"
            name="description"
            value={jobInfo.description}
            type="text"
            textHandler={handleChange}
          />
         
        </div>
        <div className="buttons">
          <Button name="Cancel" onClick={() => props.setModalOpen(false)} />
          <Button name="Submit" />
        </div>
      </form>
    </Modal>
  );
}
