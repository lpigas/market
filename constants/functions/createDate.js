export const createDate = (date) => {
  let newDate = "";
  if (date) {
    newDate =
      date[8] + date[9] + "." + date[5] + date[6] + "." + date.slice(0, 4);
  }
  return newDate;
};
