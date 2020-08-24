import Battle from './Battle';
import Chain, { clear, d, goTo, sdl, sec, w } from '@tanosysoft/chain';
import DungeonLv01 from './DungeonLv01.jsx';
import checkpoint from './checkpoint';
import clearPanes from './clearPanes';

let Dungeon = () => (
  <Chain.shield class="Dungeon">
    {checkpoint('dungeon')}
    {[clear, clearPanes]}
    {goTo('dungeon.lv01')}

    <DungeonLv01 />
  </Chain.shield>
);

export default Dungeon;
