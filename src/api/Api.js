// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // URL base de tu servidor Flask
});

export const checkIntersection = (polygonCoords) => {
  return api.post('/check_intersection', {
    polygon_coords: polygonCoords
  });
};
