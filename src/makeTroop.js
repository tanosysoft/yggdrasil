import enemies from './enemies';
import times from 'lodash/times';

let makeTroop = (...xs) => xs
  .flatMap(x => !Array.isArray(x) ? x : times(x[0], () => x[1]))
  .map(x => ({ ...enemies[x], active: true }));

export default makeTroop;
