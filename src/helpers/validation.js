export const notEmpty = (value) => value.length !== 0;

export const validateEmail = (value) => {
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return value.match(validRegex);
};

export const eightCharacterLong = (value) => value.length >= 8;

export const valueMatch = (value1, value2) => {
  console.log(value1, value2);
  return value1 === value2;
};
