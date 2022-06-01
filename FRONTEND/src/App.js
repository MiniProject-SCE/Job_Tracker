import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./routes/Landing.js";
import Login from "./routes/Login.js";
import Profile from "./routes/Profile.js";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={<Landing />} />
          {/* <Redirect from="/" to="/login" /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}
