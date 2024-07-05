// function to capitalize the first letter of a string
//
export const capitalizeFirstChar = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const capitalizeFirstCharInSentence = (str: string): string => {
  return str
    .split(" ")
    .map((word) => capitalizeFirstChar(word))
    .join(" ");
};

export const arrayToCommaSeparatedString = (arr: string[] | null): string => {
  if (!arr) return "";
  return arr.join(", ");
};
