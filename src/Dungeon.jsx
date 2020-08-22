import Battle from './Battle';
import Chain, { clear, d, goTo, sdl, sec, w } from '@tanosysoft/chain';
import DungeonLv01 from './DungeonLv01.jsx';
import checkpoint from './checkpoint';
import clearPanes from './clearPanes';

class Dungeon extends d.Component {
  constructor() {
    super();
    game.dungeon = this;
  }

  get progress() {
    return game.chain.progress.dungeon;
  }

  set progress(x) {
    game.chain.progress.dungeon = x;
  }

  reveal = id => {
    if (!this.progress.revealed.includes(id)) {
      this.progress.revealed.push(id);
    }

    d.update();
  };

  revealed = id => this.progress.revealed.includes(id);

  render = () => (
    <Chain.shield class="Dungeon">
      {checkpoint('dungeon')}
      {[clear, clearPanes]}

      {() => {
        this.progress = this.progress || {
          revealed: [],
        };

        game.chain.autoSave && game.chain.saveGame();
      }}

      {goTo('dungeon.lv01')}

      <DungeonLv01 />
    </Chain.shield>
  );
}

export default Dungeon;
