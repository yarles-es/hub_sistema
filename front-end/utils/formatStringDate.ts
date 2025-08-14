const editDateString = (dateString: string) => {
  const [day, month, year] = dateString.split("-");
  return `${day}/${month}/${year}`;
};

export const formatDateWithHours = (date: Date) => {
  const formatted =
    date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) +
    " - " +
    date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  return formatted;
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
