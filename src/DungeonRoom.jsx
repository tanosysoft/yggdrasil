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
    <DungeonRoom.topPane roomId={checkpointId} minimap={minimap} />
    {children}
  </Chain.shield>
);

DungeonRoom.topPane = ({ roomId, minimap }) => (
  minimap && (() => game.setPane('top', (
    <Minimap roomId={roomId} spec={minimap} />
  )))
);

export default DungeonRoom;
