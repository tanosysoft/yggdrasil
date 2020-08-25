import Chain, { clear, sec } from '@tanosysoft/chain';
import checkpoint from './checkpoint';

let DungeonRoom = ({
  class: classes = [],
  checkpoint: checkpointId,
  children,
  ...props
}) => (
  <Chain.shield class={['DungeonRoom', ...classes]} {...props}>
    {checkpoint(checkpointId)}
    {() => game.setPane('bottom', null)}
    {clear}
    {sec(0.75)}
    {children}
  </Chain.shield>
);

export default DungeonRoom;
