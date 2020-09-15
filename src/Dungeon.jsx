import Chain, { clear, goTo } from '@tanosysoft/chain';
import DungeonLv01 from './DungeonLv01.jsx';
import checkpoint from './checkpoint';

let Dungeon = () => (
  <Chain.shield>
    {checkpoint('dungeon')}
    {() => game.setPane('top', null)}
    {() => game.setPane('bottom', null)}
    {clear}
    {goTo('dungeon.lv01')}

    <DungeonLv01 />
  </Chain.shield>
);

export default Dungeon;
