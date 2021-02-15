function inputVerifier(inputString) {
  let inputCharacters = inputString.split('');
  const regex = new RegExp("^[a-zA-Z0-9А-Яа-я]+$");
  return inputCharacters.every(char => regex.test(char));
}

