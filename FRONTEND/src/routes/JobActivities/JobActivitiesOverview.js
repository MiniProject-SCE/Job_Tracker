import React from "react";
import { useState, useEffect } from "react";
import JobActivityCard from "./JobActivityCard/JobActivityCard";
import JobActivityEdit from "./JobActivityEdit/JobActivityEdit";
import JobActivityAdd from "./JobActivityAdd/JobActivityAdd";
import Navbar from "../../components/Navbar";
export default function JobActivitiesOverview() {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <Navbar />
      <div className="JobActivitiesOverview">
        <button
          className="bg-pink-500 hover:bg-pink-300 text-white font-bold py-2 px-4 border-b-4 border-white-700 hover:border-white-500 m-5 rounded"
          onClick={() => setModalOpen(true)}
        >
          + Add Job
        </button>
        <JobActivityCard />
      </div>
      {isModalOpen ? <JobActivityAdd setModalOpen={setModalOpen} /> : null}
    </div>
  );
}
