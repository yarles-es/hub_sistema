const editDateString = (dateString: string) => {
  const [day, month, year] = dateString.split("-");
  return `${day}/${month}/${year}`;
};

const formatStringDate = ({
  dateString,
  date,
}: {
  dateString?: string;
  date?: Date | string;
}): string => {
  if (dateString) {
    return editDateString(dateString);
  }
  if (date) {
    const currentDate = new Date(date);
    const formatter = new Intl.DateTimeFormat("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const formattedDate = formatter.format(currentDate);
    return editDateString(formattedDate.replace(/\//g, "-"));
  }
  return "";
};

export default formatStringDate;
