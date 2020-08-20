import track from './track';
import { label as chainLabel } from '@tanosysoft/chain';

let label = id => [
  chainLabel(id),
  track('run label', { label: id }),
];

export default label;
