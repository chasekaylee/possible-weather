/**
 *
 * Asynchronously loads the component for CurrentForecast
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
