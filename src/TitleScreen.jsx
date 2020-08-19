import Chain, { clear, d, goTo, sdl, sec, w } from '@tanosysoft/chain';
import clearPanes from './clearPanes';
import label from './label';

class TitleScreen extends d.Component {
  loadGame = false;

  render = () => (
    <Chain.shield class="TitleScreen">
      {label('title')}
      {[clear, clearPanes]}
      {sec(2)}
      {sdl(80)}
      <h1>Yggdrasil Dungeon{sec(2)}</h1>

      {() => game.setPane('bottom', (
        <div class="ActionsPane">
          <div class="ActionsPane-row">
            <button
              class="ActionsPane-btn"
              onClick={() => {
                this.loadGame = false;
                game.chain.run('title.newGame');
              }}
            >
              New Game
            </button>

            <button
              class="ActionsPane-btn"
              onClick={() => {
                this.loadGame = true;
                game.chain.run('title.gameStart');
              }}
            >
              Load Game
            </button>
          </div>
        </div>
      ))}

      <Chain.shield>
        {label('title.newGame')}
        {() => game.setPane('bottom', null)}
        {sdl(30)}
        <p>Are you sure you want to restart the game?{sec(0.2)}</p>
        <p>Doing so will destroy the currently saved adventure.{sec(0.2)}</p>

        {() => game.setPane('bottom', (
          <div class="ActionsPane">
            <div class="ActionsPane-row">
              <button
                class="ActionsPane-btn"
                onClick={() => game.chain.run('title.gameStart')}
              >
                Yes
              </button>

              <button
                class="ActionsPane-btn"
                onClick={() => game.chain.run('title')}
              >
                No
              </button>
            </div>
          </div>
        ))}
      </Chain.shield>

      <Chain.shield>
        {label('title.gameStart')}
        {sdl(10)}
        {() => game.setPane('bottom', null)}
        <p>Game start!{w}</p>
        {clear}

        {() => {
          if (!this.loadGame) {
            return goTo('fyrya');
          }

          game.chain.loadGame();
        }}
      </Chain.shield>
    </Chain.shield>
  );
}

export default TitleScreen;
