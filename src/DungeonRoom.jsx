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
    <DungeonRoom.topPane minimap={minimap} room={checkpointId} />
    {children}
  </Chain.shield>
);

DungeonRoom.topPane = ({ minimap, room }) => (
  minimap && (() => game.setPane('top', (
    <Minimap spec={minimap} room={room} />
  )))
);

export default DungeonRoom;
