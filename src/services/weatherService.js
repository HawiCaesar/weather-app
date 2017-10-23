import axios from 'axios';

class WeatherService {
  constructor() {

    const service = axios.create({
      baseURL: process.env.API_WEATHER_URL

    });

    service.interceptors.response.use(this.handleSuccess, this.handleError);

    this.service = service;
  }

  handleSuccess(response) {
    return response;
  }

  handleError(error) {
    return Promise.reject(error);
  }


  getForecast(path) {

    return this.service.request({
      method: 'GET',
      url: 'forecast?'+path,
      responseType: 'json'
    });
  }

  getCurrent(path) {
    return this.service.request({
      method: 'GET',
      url: 'weather?'+path,
      responseType: 'json'
    });
  }

}

export default new WeatherService();
