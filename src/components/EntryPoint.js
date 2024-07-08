import React, { useState } from "react";
import { createTrip } from "../services/api";
import "../App.css";

const EntryPoint = () => {
  const [interchange, setInterchange] = useState("");
  const [numberPlate, setNumberPlate] = useState("");
  const [dateTime, setDateTime] = useState(new Date().toISOString());

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tripData = {
      interchange,
      numberPlate,
      entryDateTime: dateTime,
      tripStatus: "Active",
    };
    try {
      await createTrip(tripData);
      alert("Trip created successfully");
    } catch (error) {
      console.error("Error creating trip:", error);
    }
  };

  return (
    <div className="entry-screen">
      <h1>Vehicle Entry</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Interchange</label>
          <input
            type="text"
            value={interchange}
            onChange={(e) => setInterchange(e.target.value)}
          />
        </div>
        <div>
          <label>Number Plate</label>
          <input
            type="text"
            value={numberPlate}
            onChange={(e) => setNumberPlate(e.target.value)}
          />
        </div>
        <div>
          <label>Date and Time</label>
          <input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EntryPoint;
