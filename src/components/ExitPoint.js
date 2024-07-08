import React, { useState } from 'react';
import { getTrip, updateTrip } from '../services/api';
import { calculateToll } from './TollCalculator';
import '../App.css';

const ExitPoint = () => {
  const [tripId, setTripId] = useState('');
  const [interchange, setInterchange] = useState('');
  const [numberPlate, setNumberPlate] = useState('');
  const [dateTime, setDateTime] = useState(new Date().toISOString());
  const [totalCost, setTotalCost] = useState(null);

  const handleCalculate = async () => {
    try {
      const response = await getTrip(tripId);
      const tripData = response.data;
      const distance = calculateDistance(tripData.interchange, interchange);
      const tollCost = calculateToll(distance, new Date().toLocaleDateString('en-US', { weekday: 'long' }), numberPlate, isSpecialDay());
      setTotalCost(tollCost);
      await updateTrip(tripId, { exitDateTime: dateTime, totalCost: tollCost });
    } catch (error) {
      console.error('Error calculating toll:', error);
    }
  };

  const calculateDistance = (entry, exit) => {
    const distances = {
      'NS': 5,
      'PH4': 10,
      'Ferozpur': 17,
      'Lake City': 24,
      'Raiwind': 29,
      'Bahria': 34
    };
    return Math.abs(distances[exit] - distances[entry]);
  };

  const isSpecialDay = () => {
    const specialDays = ['03/23', '08/14', '12/25'];
    const today = new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
    return specialDays.includes(today);
  };

  return (
    <div className="exit-screen">
      <h1>Vehicle Exit</h1>
      <div>
        <label>Trip ID</label>
        <input type="text" value={tripId} onChange={(e) => setTripId(e.target.value)} />
      </div>
      <div>
        <label>Interchange</label>
        <input type="text" value={interchange} onChange={(e) => setInterchange(e.target.value)} />
      </div>
      <div>
        <label>Number Plate</label>
        <input type="text" value={numberPlate} onChange={(e) => setNumberPlate(e.target.value)} />
      </div>
      <div>
        <label>Date and Time</label>
        <input type="datetime-local" value={dateTime} onChange={(e) => setDateTime(e.target.value)} />
      </div>
      <button onClick={handleCalculate}>Calculate</button>
      {totalCost !== null && (
        <div className="cost-summary">
          <h2>Total Cost: {totalCost} rupees</h2>
        </div>
      )}
    </div>
  );
};

export default ExitPoint;
