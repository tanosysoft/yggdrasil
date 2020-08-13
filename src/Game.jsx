import './Game.css';
import Chain, { d } from '@tanosysoft/chain';

class Game extends d.Component {
  constructor(props) {
    super(props);
    window.game = this;
  }

  render = () => (
    <div class="Game">
      {this.header = <div class="Game-header"></div>}

      {this.body = (
        <Chain class="Game-body">
          Hello, world!
        </Chain>
      )}

      {this.footer = <div class="Game-footer"></div>}
    </div>
  );

  get chain() {
    return this.body.model;
  }

  setPaneContents(k, ...contents) {
    this[k].innerHTML = '';

    contents = contents.flat(10).filter(Boolean);

    if (contents.length) {
      this[k].append(...contents);
    }
  }
}

export default Game;
