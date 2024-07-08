import axios from 'axios';

const API_URL = 'https://crudcrud.com/api/0de6f86092554f1a984f644dc24fb0f5/trips';

export const createTrip = (tripData) => axios.post(API_URL, tripData);
export const getTrip = (tripId) => axios.get(`${API_URL}/${tripId}`);
export const updateTrip = (tripId, updateData) => axios.put(`${API_URL}/${tripId}`, updateData);
