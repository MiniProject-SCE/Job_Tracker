import React, { useState } from "react";
import Modal from "react-modal";
import Button from "../../../components/Button";
import InputBox from "../../../components/InputBox";
import SelectInputBox from "../../../components/SelectInputBox";
import "./JobActivityAdd.css";
import axios from "axios";
const categories = ["Wishlist", "Applied", "Rejected"];

export default function JobActivityAdd(props) {
  const [inputs, setInputs] = useState({});

  const handleChange = (e) =>
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  function JobPost() {
    axios
      .post(
        "http://localhost:5000/api/jobtracker/addApplication",
        {
          company: inputs.company,
          salary: inputs.salary,
          title: inputs.jobtitle,
          description: inputs.description,
          usernameUsed: inputs.Wusername,
          pwdUsed: inputs.Wpassword,
          deadLine: inputs.deadline,
          interviewDate: inputs.interview,
          category: inputs.Wusername,
          location: inputs.location,
          urlUsed: inputs.websiteUrl,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then(() => {
        window.alert("Job Added Successfully");
        props.setModalOpen(false);
        window.location.reload();
      });
  }
  return (
    <Modal
      className="jobAdd"
      isOpen={true}
      onRequestClose={() => props.setModalOpen(false)}
      ariaHideApp={false}
      overlayClassName="overlay"
    >
      <div className="jobAddForm">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center m-5">
          Job Details
        </h1>
        <div className="inputboxes m-7 ">
          <InputBox
            title="Company"
            name="company"
            value={inputs.company}
            type="text"
            textHandler={handleChange}
          />
          <InputBox
            title="Job Title"
            name="jobtitle"
            value={inputs.jobtitle}
            type="text"
            textHandler={handleChange}
          />
          <InputBox
            title="Salary"
            name="salary"
            value={inputs.salary}
            type="text"
            textHandler={handleChange}
          />
          <InputBox
            title="Location"
            name="location"
            value={inputs.location}
            type="text"
            textHandler={handleChange}
          />
          <InputBox
            title="Deadline"
            name="deadline"
            value={inputs.deadline}
            type="date"
            textHandler={handleChange}
          />
          <InputBox
            title="Interview"
            name="interview"
            value={inputs.interview}
            type="date"
            textHandler={handleChange}
          />
          <InputBox
            title="Website Url"
            name="websiteUrl"
            value={inputs.websiteUrl}
            type="text"
            textHandler={handleChange}
          />
          <InputBox
            title="Website's UserName"
            name="Wusername"
            value={inputs.Wusername}
            type="text"
            textHandler={handleChange}
          />
          <InputBox
            title="Website's Password"
            type="text"
            name="Wpassword"
            value={inputs.Wpassword}
            textHandler={handleChange}
          />
          <SelectInputBox
            title="Category"
            name="category"
            data={categories}
            textHandler={handleChange}
          />
          <InputBox
            title="Description"
            name="description"
            value={inputs.description}
            type="text"
            textHandler={handleChange}
          />
        </div>
        <div className="buttons">
          <Button name="Cancel" onClick={() => props.setModalOpen(false)} />
          <Button name="Submit" onClick={() => JobPost()} />
        </div>
      </div>
    </Modal>
  );
}
