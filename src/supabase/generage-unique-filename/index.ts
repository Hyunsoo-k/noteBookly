const generateUniqueFilename = (): string => {
  const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
  const randomString = Math.random().toString(36).substring(2, 10);

  return `/images/${timestamp}_${randomString}.jpeg`;
};

export default generateUniqueFilename;