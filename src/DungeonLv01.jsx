import Chain, { clear, d, goTo } from '@tanosysoft/chain';
import DungeonLv01R01 from './DungeonLv01R01.jsx';
import checkpoint from './checkpoint';
import clearPanes from './clearPanes';

let DungeonLv01 = () => (
  <Chain.shield>
    {checkpoint('dungeon.lv01')}
    {[clear, clearPanes]}
    {goTo('dungeon.lv01.r01')}

    <DungeonLv01R01 />
  </Chain.shield>
);

export default DungeonLv01;
