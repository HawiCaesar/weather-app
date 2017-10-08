export default function convertToDate(unixTimeStamp){

  let time = unixTimeStamp.split(" ");

  return time[1];
}
