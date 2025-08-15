const base64ToBlob = (base64: string, contentType = "image/jpeg") => {
  const byteCharacters = atob(base64.split(",")[1]);
  const byteNumbers = Array.from(byteCharacters).map(c => c.charCodeAt(0));
  const byteArray = new Uint8Array(byteNumbers);

  return new Blob([byteArray], { type: contentType });
};

export default base64ToBlob;