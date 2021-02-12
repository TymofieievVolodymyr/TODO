//import {parseString} from "../parseString";

//export
const convertDate = (inputDate) => {
  const getParsedString = parseString(inputDate);
  return new Date(getParsedString);
}
