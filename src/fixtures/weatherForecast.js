// helpers
import {
  getCurrentDateTime
} from "../utils/datetimeConvertUtil";

const date = new Date();

const someDaysLater = (numberOfDays) => {

  let day = date.getDate() + numberOfDays;
  let month = date.getMonth()+1;

  if(month < 10){
    month = '0'+month;
  }

  return date.getFullYear()+'-'+month+'-'+day;
};

const threeHoursLater = (numberOfHours) => {
  let hour = date.getHours() + numberOfHours;
  if(date.getHours() < 10) {
    hour = '0'+date.getHours();
  }
  return hour+':00:00';
};

export const weatherProps = {
  city: 'Nairobi',
  current_weather: {
    data: {
      dt: 1516620600,
      dt_txt: getCurrentDateTime(),
      id: 184745,
      weather: [
        {id: 801, main: "Clouds", description: "few clouds", icon: "02d"}
      ],
      main: {
        temp_max: 297.29,
        temp_min: 296.69
      }
    }
  },
  forecast: {
    list: [
      {
        dt: 1516622400,
        dt_txt: getCurrentDateTime()[0]+' '+threeHoursLater(3),
        weather: [
          {id: 800, main: "Clear", description: "clear sky", icon: "01d"}
        ],
        main: {
          temp_max: 297.29,
          temp_min: 296.69
        }
      },
      {
        dt: 1516622401,
        dt_txt: getCurrentDateTime()[0]+' '+threeHoursLater(6),
        weather: [
          {id: 500, main: "Rain", description: "light rain", icon: "10d"}
        ],
        main: {
          temp_max: 297.29,
          temp_min: 296.69
        }
      },
      {
        dt: 1516622402,
        dt_txt: getCurrentDateTime()[0]+' '+threeHoursLater(9),
        weather: [
          {id: 500, main: "Rain", description: "light rain", icon: "10d"}
        ],
        main: {
          temp_max: 297.29,
          temp_min: 296.69
        }
      },
      {
        dt: 1516622403,
        dt_txt: someDaysLater(1)+' 12:00:00',
        weather: [
          {id: 500, main: "Rain", description: "light rain", icon: "10d"}
        ],
        main: {
          temp_max: 297.29,
          temp_min: 296.69
        }
      },
      {
        dt: 1516622404,
        dt_txt: someDaysLater(2)+' 12:00:00',
        weather: [
          {id: 500, main: "Rain", description: "light rain", icon: "10d"}
        ],
        main: {
          temp_max: 297.29,
          temp_min: 296.69
        }
      },
      {
        dt: 1516622405,
        dt_txt: someDaysLater(3)+' 12:00:00',
        weather: [
          {id: 500, main: "Rain", description: "light rain", icon: "10d"}
        ],
        main: {
          temp_max: 297.29,
          temp_min: 296.69
        }
      }
    ]

  }
};
