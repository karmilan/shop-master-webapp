const GetYearMonthDate = (dateString) => {
  const date = new Date(dateString).toISOString().split("T")[0];
  return `${date}`;
};

export default GetYearMonthDate;
