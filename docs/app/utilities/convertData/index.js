const convertDate = (inputDate) => {
  const getParsedString = parseString(inputDate);
  return new Date(getParsedString);
}
