import axios from 'axios';

const api = axios.create({
   baseURL: `${process.env.REACT_APP_API_BASE_URL}/maps`
});

// Interceptor para agregar el token a las cabeceras
api.interceptors.request.use(config => {
  
  
  if (sessionStorage.getItem('token')) {
    config.headers = {
      ...config.headers,
      'Authorization': sessionStorage.getItem('token'),
  };
  }

  return config;
}, error => {
  return Promise.reject(error);
});

export const verifyPolygon = (polygonCoords) => {
  return api.post('/verify_polygon', {
    polygon_coords: polygonCoords
  });
};

// Nueva función para el endpoint de intersección con tolerancia
export const verifyPoint = ({ coord, tolerance }) => {
  return api.post('/verify_point', {
    coord,
    tolerance
  });
};

export const savePolygon = (polygonCoords) => {
  return api.post('/save_polygon', {
    polygon_coords: polygonCoords
  });
};

export const savePoint = ({ coord, tolerance }) => {
  return api.post('/save_point', {
    coord,
    tolerance
  });
};

export default api;
