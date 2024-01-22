const DateTimeStringFormat = (dateString: Date) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  const hour = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day}-${month}-${year} ${hour}:${minutes}`;
};

const DateAndYearStringFormat = (dateString?: Date) => {

  if (!dateString || isNaN(new Date(dateString).getFullYear())) return "";

  const date = new Date(dateString);

  const day = (date.getDate() + 1).toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();

  if (year == "1") return "00/00/0000";

  return `${day}/${month}/${year}`;
};

const ChangeFormatForInput = (dateString: Date) => {
  const date = new Date(dateString);

  const day = (date.getDate() + 1).toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();

  if (year == "1") return "00-00-0000";

  const value = `${year}-${month}-${day}`;

  return value;
};

export { DateTimeStringFormat, DateAndYearStringFormat, ChangeFormatForInput };
