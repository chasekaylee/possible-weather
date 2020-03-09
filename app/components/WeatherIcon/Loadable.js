/**
 *
 * Asynchronously loads the component for WeatherIcon
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
