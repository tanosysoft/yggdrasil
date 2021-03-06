import Chain, { clear, goTo } from '@tanosysoft/chain';
import DungeonLv01 from './DungeonLv01.jsx';
import DungeonLv02 from './DungeonLv02.jsx';
import checkpoint from './checkpoint';

let Dungeon = () => (
  <Chain.shield>
    {checkpoint('dungeon')}
    {() => game.setPanes({ top: null, bottom: null })}
    {clear}
    {goTo('dungeon.lv01')}

    <DungeonLv01 />
    <DungeonLv02 />
  </Chain.shield>
);

export default Dungeon;
