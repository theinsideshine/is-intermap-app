export const updateKmlDataInSessionStorage = (newUrl, representativePoint) => {
  // Guardar la URL en sessionStorage
  sessionStorage.setItem('fileUrl', newUrl);

  // Guardar el punto representativo en sessionStorage
  if (representativePoint) {
    sessionStorage.setItem('representativePoint', JSON.stringify(representativePoint));
  }

  // Crear y despachar un evento customizado
  const event = new Event('kmlDataUpdated');
  window.dispatchEvent(event);
};