export const newtitle = (router) => {
  const data = router.asPath;
  let pageName = "";
  for (let i = 0; i <= data.length - 1; i++) {
    if (data[i] !== "/") {
      pageName += data[i];
    } else {
      pageName = "";
    }
  }
  const fistWord = pageName[0].toUpperCase();
  const lastLater = pageName.slice(1, pageName.length);
  const titel = fistWord + lastLater;
  return titel;
};
