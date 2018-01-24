const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/**
 *
 * @param unixTimeStamp
 * @return {Array}
 */
export const convertDateToText = (unixTimeStamp) => {
  return unixTimeStamp.split(" ");
};

/**
 * converts miliseconds to date time
 *
 * @param unixTimeStamp
 * @return {[days,time]}
 */
export const milisecondsToDateTime = (unixTimeStamp) => {
  let date = new Date(0);
  date.setUTCSeconds(unixTimeStamp);

  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  if(date.getHours() < 10){
    hour = '0'+date.getHours();
  }
  if(date.getMinutes() < 10){
    minute = '0'+date.getMinutes();
  }
  if(date.getSeconds() < 10){
    second = '0'+date.getSeconds();
  }

  let time = hour+":"+minute+":"+second;

  return [days[date.getDay()], time];
};

/**
 * Gets the current date and time
 *
 * @return {[date,time]}
 */
export const getCurrentDateTime = () => {
  let date = new Date();
  let month = date.getMonth()+1;
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  if (month < 10) {
    month = '0'+month;
  }

  if (date.getHours() < 10) {
    hour = '0'+date.getHours();
  }
  if (date.getMinutes() < 10) {
    minute = '0'+date.getMinutes();
  }
  if (date.getSeconds() < 10) {
    second = '0'+date.getSeconds();
  }

  let time = hour+":"+minute+":"+second;

  return [date.getFullYear()+'-'+month+'-'+date.getDate(), time];
};
