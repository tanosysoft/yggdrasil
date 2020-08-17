import Battle from './Battle';
import Chain, { d, goTo, sdl, sec, w } from '@tanosysoft/chain';
import checkpoint from './checkpoint';
import clear from './clear';

class Dungeon extends d.Component {
  render = () => (
    <Chain.shield class="Dungeon">
      {checkpoint('dungeon')}
      {clear}
      {sec(2)}
      {sdl(80)}
      <h1>Fyrya Dungeons Entrance{sec(2)}</h1>

      <Battle />
    </Chain.shield>
  );
}

export default Dungeon;
