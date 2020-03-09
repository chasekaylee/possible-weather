/**
 *
 * Asynchronously loads the component for ForecastList
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
