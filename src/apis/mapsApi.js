// api.js
import axios from 'axios';

const api = axios.create({
   baseURL: `${process.env.REACT_APP_API_BASE_URL}/maps`
});

export const checkIntersection = (polygonCoords) => {
  return api.post('/check_intersection', {
    polygon_coords: polygonCoords
  });
};

// Nueva función para el endpoint de intersección con tolerancia
export const checkIntersectionWithTolerance = ({ coord, tolerance }) => {
  return api.post('/check_intersection_with_tolerance', {
    coord,
    tolerance
  });
};
