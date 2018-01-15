import axios from 'axios';

/**
 * Location Service
 */
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
    return Promise.reject(error);
  }

  /**
   * Fetch current location
   *
   * @param path - url with coordinates
   * @param callback
   * @return {Promise.<TResult>}
   */
  get(path) {
    return this.service.request({
      method: 'GET',
      url: "json?"+path,
      responseType: 'json'
    });
  }
}

export default new LocationService();
