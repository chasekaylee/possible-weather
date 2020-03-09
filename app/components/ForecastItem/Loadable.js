/**
 *
 * Asynchronously loads the component for ForecastItem
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
