const getTodayDate = () => {
  const timeZoneOffset = new Date().getTimezoneOffset() * 60000;
  return new Date(new Date() - timeZoneOffset)
    .toISOString()
    .slice(0, -1)
    .split("T")[0];
};

export default getTodayDate;
