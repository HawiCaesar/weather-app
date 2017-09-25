import axios from 'axios';

class LocationService {
  constructor() {

    const service = axios.create({
      baseURL: process.env.API_LOCATION_URL

    });

    service.interceptors.response.use(this.handleSuccess, this.handleError);

    this.service = service;
  }

  handleSuccess(response) {
    return response;
  }

  handleError(error) {
    console.log(error);
    return Promise.reject(error);
  }


  get(path, callback) {

    return this.service.request({
      method: 'GET',
      url: "json?"+path,
      responseType: 'json'
    }).then(response => callback(response.status, response.data));

  }

}

export default new LocationService();
