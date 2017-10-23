const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const convertDateToText = (unixTimeStamp) => {
  return unixTimeStamp.split(" ");
};

export const convertUTCToLocal = (unixTimeStamp) => {
  let date = new Date(0);
  date.setUTCSeconds(unixTimeStamp);

  return days[date.getDay()];
};

export const getCurrentDate = () => {
  let date = new Date();
  let month = date.getMonth()+1;

  if(month < 10){
    month = '0'+month;
  }
  return date.getFullYear()+'-'+month+'-'+date.getDate();
};
