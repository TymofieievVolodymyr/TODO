export default function inputVerifier(inputString) {
  let inputCharacters = inputString.split('');
  const regex = new RegExp("^[a-zA-Z0-9]+$");
  return inputCharacters.every(char => regex.test(char));
}

// 🥚 https://www.youtube.com/watch?t=2&v=Ca2r54SDb20&feature=youtu.be
