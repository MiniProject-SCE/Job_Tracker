import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import ContactAdd from "./ContactAdd/ContactAdd";
import ContactCard from "./ContactCard/ContactCard";
import axios from "axios"
export default function MyContacts() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [myContacts, setMyContacts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await axios
                .get('http://localhost:5000/api/jobtracker/getContacts')
                .then((res) => {
                  setMyContacts(...res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        fetchData();
    }, []);
  return (
    <div>
      <Navbar />
      <div className="Contacts">
        <button
          className="bg-pink-500 hover:bg-pink-300 text-white font-bold py-2 px-4 border-b-4 border-white-700 hover:border-white-500 m-5 rounded"
          onClick={() => setModalOpen(true)}
        >
          + Add Contact
        </button>
        <div className="flex flex-wrap">
          {myContacts.map((job) => (
            <ContactCard  data={job} />
          ))}
        </div>
        <ContactCard />
      </div>
      {isModalOpen ? <ContactAdd setModalOpen={setModalOpen} /> : null}
    </div>
  );
}
