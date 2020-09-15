import Chain, { clear, d, goTo } from '@tanosysoft/chain';
import DungeonLv01A01 from './DungeonLv01A01.jsx';
import DungeonLv01A02 from './DungeonLv01A02.jsx';
import DungeonLv01A03 from './DungeonLv01A03.jsx';
import DungeonLv01A04 from './DungeonLv01A04.jsx';
import DungeonLv01A05 from './DungeonLv01A05.jsx';
import checkpoint from './checkpoint';

let DungeonLv01 = () => (
  <Chain.shield>
    {checkpoint('dungeon.lv01')}
    {() => game.setPanes({ top: null, bottom: null })}
    {clear}
    {goTo('dungeon.lv01.a01')}

    <DungeonLv01A01 />
    <DungeonLv01A02 />
    <DungeonLv01A03 />
    <DungeonLv01A04 />
    <DungeonLv01A05 />
  </Chain.shield>
);

export default DungeonLv01;
