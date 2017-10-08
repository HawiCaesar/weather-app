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


  get(path, callback) {

    return this.service.request({
      method: 'GET',
      url: 'forecast?'+path,
      responseType: 'json'
    }).then(response => callback(response.status, response.data));
  }

}

export default new WeatherService();
