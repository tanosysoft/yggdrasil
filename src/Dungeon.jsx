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

      <Battle />
    </Chain.shield>
  );
}

export default Dungeon;
