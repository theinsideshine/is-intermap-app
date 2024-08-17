import { useEffect } from 'react';

const KmlLoader = ({ map, kmlUrl }) => {
  useEffect(() => {
    if (map && kmlUrl) {
      const kmlLayer = new window.google.maps.KmlLayer({
        url: kmlUrl,
        map: map,
        preserveViewport: true, // Si quieres que el mapa mantenga la vista actual y no se ajuste al KML
      });

      return () => {
        kmlLayer.setMap(null); // Eliminar la capa KML si se desmonta el componente o cambia el URL
      };
    }
  }, [map, kmlUrl]);

  return null; // No necesita renderizar nada en la interfaz
};

export default KmlLoader;
