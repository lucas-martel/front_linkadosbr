const parseDate = (dateString: string): string => {
  // Extrair a parte da data
  const datePart = dateString.split("T")[0]; // "2024-06-14"

  // Dividir a data em partes separadas
  const [year, month, day] = datePart.split("-");

  // Reformatar a data no formato desejado
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};

export default parseDate;
