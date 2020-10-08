import Chain, { clear, d, goTo } from '@tanosysoft/chain';
import DungeonLv02A01 from './DungeonLv02A01.jsx';
import checkpoint from './checkpoint';

let lvId = x => `dungeon.lv02${x ? `.${x}` : ''}`;

let DungeonLv02 = () => (
  <Chain.shield>
    {checkpoint(lvId())}
    {() => game.setPanes({ top: null, bottom: null })}
    {clear}

    {goTo(lvId('a01'))}

    <DungeonLv02A01 />
  </Chain.shield>
);

export default DungeonLv02;
