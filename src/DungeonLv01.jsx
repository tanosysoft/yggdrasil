import Chain, { clear, d, goTo } from '@tanosysoft/chain';
import DungeonLv01A01 from './DungeonLv01A01.jsx';
import DungeonLv01A02 from './DungeonLv01A02.jsx';
import checkpoint from './checkpoint';
import clearPanes from './clearPanes';

let DungeonLv01 = () => (
  <Chain.shield>
    {checkpoint('dungeon.lv01')}
    {[clear, clearPanes]}
    {goTo('dungeon.lv01.a01')}

    <DungeonLv01A01 />
    <DungeonLv01A02 />
  </Chain.shield>
);

export default DungeonLv01;
