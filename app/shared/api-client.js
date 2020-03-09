import request from 'utils/request';

/**
 *  Fetches the forecast for a given latlng
 *
 * @param {string} latlng valid latlng format required
 * @param {string} units units for response i.e us or si
 *
 * @return {promise} from network request
 */
const forecast = (latlng, units = 'auto') =>
  request(`api/weather/forecast?latlng=${latlng}&units=${units}`);

/**
 *  Fetches the address given a valid latlng
 *
 * @param {string} latlng valid latlng format required
 *
 * @return {promise} from network request
 */
const reverseGeocode = latlng =>
  request(`api/location/reverse-geocode?latlng=${latlng}`);

/**
 *  Fetches the latlng coordinates given an address
 *
 * @param {string} address place to get coordinates for
 *
 * @return {promise} from network request
 */
const geocode = address => request(`api/location/geocode?address=${address}`);

export default {
  forecast,
  reverseGeocode,
  geocode,
};
