import Chain, { clear } from '@tanosysoft/chain';
import checkpoint from './checkpoint';

let DungeonArea = ({
  class: classes = [],
  checkpoint: checkpointId,
  children,
  ...props
}) => (
  <Chain.shield class={['DungeonArea', ...classes]} {...props}>
    {checkpoint(checkpointId)}
    {() => game.setPane('bottom', null)}
    {clear}
    {children}
  </Chain.shield>
);

export default DungeonArea;
