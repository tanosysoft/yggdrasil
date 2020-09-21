import Chain, { clear, d, goTo } from '@tanosysoft/chain';
import DungeonLv01A01 from './DungeonLv01A01.jsx';
import DungeonLv01A02 from './DungeonLv01A02.jsx';
import DungeonLv01A03 from './DungeonLv01A03.jsx';
import DungeonLv01A04 from './DungeonLv01A04.jsx';
import DungeonLv01A05 from './DungeonLv01A05.jsx';
import checkpoint from './checkpoint';

let lvId = x => `dungeon.lv01${x ? `.${x}` : ''}`;

let DungeonLv01 = () => (
  <Chain.shield>
    {checkpoint(lvId())}
    {() => game.setPanes({ top: null, bottom: null })}
    {clear}

    {() => {
      for (let [k, xs] of Object.entries({
        stone: [
          [0.2, 'a01.r01-r08'], [0.2, 'a02.r01-r06'], [0.2, 'a03.r01-r03'],
          [0.2, 'a04.r01-r07'], [0.2, 'a05.r01-r04'], [0.2, 'a06.r01-r12'],
        ],

        moss: [
          [0.5, 'a03.r01-r03'], [0.5, 'a04.r01-r07'],
          [0.2, 'a05.r01-r04'], [0.2, 'a06.r01-r12'],
        ],

        weed: [[1, 'a04.r02'], [1, 'a04.r03']],
        twig: [[1, 'a04.r02'], [1, 'a04.r03']],

        advSkull: [[0.75, 'a05.r01-r04'], [0.2, 'a06.r01-r12']],
      })) {
        for (let [chance, rooms] of xs) {
          let [area, roomRange] = rooms.split('.');

          let [rStart, rEnd] = roomRange.split('-').map(
            x => x && Number(x.slice(1)),
          );

          for (let i = rStart; i <= (rEnd ?? rStart); i++) {
            if (Math.random() > chance) {
              continue;
            }

            let gatherablesPath =
              lvId(`${area}.r${String(i).padStart(2, 0)}.gatherables`);

            let gatherables = game.progressVar(
              gatherablesPath, game.progressVar(gatherablesPath) || {
                spawned: [], seen: [], gathered: [],
              },
            );

            gatherables.spawned.push(k);
            console.log({ area, i, k });
          }
        }
      }
    }}

    {goTo(lvId('a01'))}

    <DungeonLv01A01 />
    <DungeonLv01A02 />
    <DungeonLv01A03 />
    <DungeonLv01A04 />
    <DungeonLv01A05 />
  </Chain.shield>
);

export default DungeonLv01;
