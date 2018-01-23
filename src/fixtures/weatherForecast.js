export const weatherProps = {
  city: 'Nairobi',
  current_weather: {
    data: {
      dt: 1516620600,
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
        dt_txt: "2018-01-22 12:00:00",
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
        dt_txt: "2018-01-22 15:00:00",
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
