import React, { useState } from "react";
import Modal from "react-modal";
import Button from "../../../components/Button";
import InputBox from "../../../components/InputBox";
import SelectInputBox from "../../../components/SelectInputBox";
import "./JobActivityEdit.css";
import axios from "axios";
const categories = ["Wishlist", "Applied", "Rejected"];

export default function JobActivityEdit(props) {
  const jobInfo = props.data;
  const [inputs, setInputs] = useState({});
  const handleChange = (e) =>
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  function JobUpdate() {
    axios
      .put(
        `http://localhost:5000/api/jobtracker/updateApplication/${jobInfo._id}`,
       inputs,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then(() => {
        window.alert("Job Updated Successfully");
        props.setModalOpen(false);
        window.location.reload();
      });
  }
 
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
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="Company"
              name="company"
              value={inputs.company ? inputs.company : jobInfo.company}
              type="text"
              textHandler={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="Job Title"
              name="title"
              value={inputs.title ? inputs.title : jobInfo.title}
              type="text"
              textHandler={handleChange}
            />
          </div>

          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="Salary"
              name="salary"
              value={inputs.salary ? inputs.salary : jobInfo.salary}
              type="text"
              textHandler={handleChange}
            />
          </div>

          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="Location"
              name="location"
              value={inputs.location ? inputs.location : jobInfo.location}
              type="text"
              textHandler={handleChange}
            />
          </div>

          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="Deadline"
              name="deadline"
              value={inputs.deadline ? inputs.deadline : jobInfo.deadline}
              type="date"
              textHandler={handleChange}
            />
          </div>

          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="Interview"
              name="interviewDate"
              value={
                inputs.interviewDate
                  ? inputs.interviewDate
                  : jobInfo.interviewDate
              }
              type="date"
              textHandler={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="Website Url"
              name="urlUsed"
              value={inputs.urlUsed ? inputs.urlUsed : jobInfo.urlUsed}
              type="text"
              textHandler={handleChange}
            />
          </div>

          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="Website's UserName"
              name="usernameUsed"
              value={
                inputs.usernameUsed ? inputs.usernameUsed : jobInfo.usernameUsed
              }
              type="text"
              textHandler={handleChange}
            />
          </div>

          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="Website's Password"
              type="text"
              name="pwdUsed"
              value={inputs.pwdUsed ? inputs.pwdUsed : jobInfo.pwdUsed}
              textHandler={handleChange}
            />
          </div>

          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <SelectInputBox
              title="Category"
              name="category"
              data={categories}
              value={inputs.category ? inputs.category : jobInfo.category}
              textHandler={handleChange}
            />
          </div>

          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="Description"
              name="description"
              value={
                inputs.description ? inputs.description : jobInfo.description
              }
              type="text"
              textHandler={handleChange}
            />
          </div>
        </div>
        <div className="buttons">
          <div className="m-5">
            <Button name="Cancel" onClick={() => props.setModalOpen(false)} />
          </div>
          <div className="m-5">
            <Button name="Submit" onClick={() => JobUpdate()} />
          </div>
        </div>
      </form>
    </Modal>
  );
}
