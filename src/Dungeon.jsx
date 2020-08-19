import Battle from './Battle';
import Chain, { clear, d, goTo, sdl, sec, w } from '@tanosysoft/chain';
import checkpoint from './checkpoint';
import clearPanes from './clearPanes';

class Dungeon extends d.Component {
  render = () => (
    <Chain.shield class="Dungeon">
      {checkpoint('dungeon')}
      {[clear, clearPanes]}
      {sec(2)}
      {sdl(80)}
      <h1>Fyrya Dungeons Entrance{sec(2)}</h1>

      <Battle
        actors={{
          P1: {
            name: 'Elmina',
            active: true,
            hp: 200, maxHp: 200,
            mp: 10, maxMp: 10,
            atk: 4, def: 2,
            lv: 1, nextLvExp: 25,
          },

          E1: {
            name: 'Slime',
            active: true,
            hp: 25, maxHp: 25,
            mp: 0, maxMp: 0,
            atk: 3, def: 1,
            exp: 3, gp: 5,
          },

          E2: {
            name: 'Slime',
            active: true,
            hp: 25, maxHp: 25,
            mp: 0, maxMp: 0,
            atk: 3, def: 1,
            exp: 3, gp: 5,
          },
        }}
      />

      <p>Woot!</p>
    </Chain.shield>
  );
}

export default Dungeon;
