export const degreesToFarenheit = (tempInDegrees) => {
  let tempInFarenheit = ( (9/5) * tempInDegrees) + 32;
  return parseFloat(tempInFarenheit.toFixed(2));
};
