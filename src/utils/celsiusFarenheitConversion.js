export const celsiusToFarenheit = (tempInCelsius) => {
  let tempInFarenheit = ( (9/5) * tempInCelsius) + 32;
  return parseFloat(tempInFarenheit.toFixed(2));
};

export const fahrenheitToCelsius = (tempInFahrenheit) => {
  let tempInCelsius = ( (tempInFahrenheit - 32) * (5/9));
  return parseFloat(tempInCelsius.toFixed(2));
};
