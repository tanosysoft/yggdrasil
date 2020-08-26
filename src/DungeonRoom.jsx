import Chain, { clear, sec } from '@tanosysoft/chain';
import Minimap from './Minimap';
import checkpoint from './checkpoint';

let DungeonRoom = ({
  class: classes = [],
  checkpoint: checkpointId,
  minimap,
  children,
  ...props
}) => (
  <Chain.shield class={['DungeonRoom', ...classes]} {...props}>
    {checkpoint(checkpointId)}
    {() => game.setPane('bottom', null)}
    {clear}
    {sec(0.75)}
    {() => game.progressVar(`${checkpointId}.visited`, true)}

    {minimap && (() => game.setPane('top', (
      <Minimap roomId={checkpointId} spec={minimap} />
    )))}

    {children}
  </Chain.shield>
);

export default DungeonRoom;
