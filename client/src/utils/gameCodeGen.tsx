const CHARS = "123456789abcdefghijklmnopqrstuvwxyz";
const KEY_LENGTH = 9;

export const generateInviteKey = () =>
  new Array(KEY_LENGTH)
    .fill(null)
    .map((_, i, a) => {
      const charPos = i + 1;
      const needsDash = charPos !== a.length && charPos % 3 === 0;
      return `${genRandChar()}${needsDash ? "-" : ""}`;
    })
    .join("");

const genRandChar = () => {
  const val = Math.floor(Math.random() * CHARS.length);
  return CHARS[val];
};
