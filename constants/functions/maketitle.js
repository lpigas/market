export const newtitle = (router) => {
  const pageName = router.asPath.replace(/[^a-zA-Z]/gi, "");
  const fistWord = pageName[0].toUpperCase();
  const lastLater = pageName.slice(1, pageName.length);
  const titel = fistWord + lastLater;
  return titel;
};
