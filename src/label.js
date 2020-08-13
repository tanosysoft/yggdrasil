import track from './track';
import { label as chainLabel } from '@tanosysoft/chain';

let label = id => [
  track('run label', { label: id }),
  chainLabel(id),
];

export default label;
