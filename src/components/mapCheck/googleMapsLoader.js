import { Loader } from "@googlemaps/js-api-loader";
import { googleMapsApiKey } from '../../config';

const loader = new Loader({
  apiKey: googleMapsApiKey,
  version: "weekly",
  libraries: ["places", "marker", "drawing"]
});

let mapPromise = null;

export const loadGoogleMaps = () => {
  if (!mapPromise) {
    mapPromise = loader.load();
  }
  return mapPromise;
};
