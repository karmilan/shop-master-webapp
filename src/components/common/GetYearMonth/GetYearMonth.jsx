const GetYearMonth = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are zero-indexed (January is 0)
  return `${year}-${month.toString().padStart(2, "0")}`;
};

export default GetYearMonth;
