import Battle from './Battle';
import Chain, { clear, d, goTo, sdl, sec, w } from '@tanosysoft/chain';
import checkpoint from './checkpoint';
import clearPanes from './clearPanes';

let makeActors = () => ({
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
});

//              (6)-(7)-(8)-
//               |   |
// -(1)-(2)-(3)-(4)-(5)
class DungeonLv01R01 extends d.Component {
  id = id => `dungeon.lv01.r01${id ? `.${id}` : ''}`;

  lookAroundMsgs = {
    leaveToTheLeft: `You can leave the dungeon to the left.`,
    upCorridor: `There's a corridor up.`,
    leftCorridor: `There's a corridor to the left.`,
    rightCorridor: `There's a corridor to the right.`,
    downCorridor: `There's a corridor down.`,
  };

  render = () => (
    <Chain.shield>
      {checkpoint(this.id())}
      {[clear, clearPanes]}
      {goTo(this.id('t01'))}

      <Chain.shield>
        {checkpoint(this.id('t01'))}
        {[clear, clearPanes]}
        {sec(0.75)}

        {() => game.setPane('bottom', (
          <div class="ActionsPane">
            {this.renderDefaultActions({
              left: 'fyrya',
              right: this.id('t02'),
              lookAround: this.id('t01.lookAround'),
            })}
          </div>
        ))}

        {this.renderLookAroundScript(this.id('t01'), (
          <>
            {this.lookAroundMsgs.leaveToTheLeft}{w}<br />
            {this.lookAroundMsgs.rightCorridor}{w}<br />
          </>
        ))}
      </Chain.shield>

      <Chain.shield>
        {checkpoint(this.id('t02'))}
        {[clear, clearPanes]}

        {Chain.if(() => Math.random() >= 0.7, (
          <div>
            <p>You're ambushed!{w}</p>

            <Battle
              checkpoint={this.id('t02.battle')}
              actors={makeActors()}
            />
          </div>
        ))}

        {checkpoint(this.id('t02.afterBattle'))}
        {[clear, clearPanes]}
        {sec(0.75)}

        {() => game.setPane('bottom', (
          <div class="ActionsPane">
            {this.renderDefaultActions({
              left: this.id('t01'),
              right: this.id('t03'),
              lookAround: this.id('t02.afterBattle.lookAround'),
            })}
          </div>
        ))}

        {this.renderLookAroundScript(this.id('t02.afterBattle'), (
          <>
            {this.lookAroundMsgs.leftCorridor}{w}<br />
            {this.lookAroundMsgs.rightCorridor}{w}<br />
          </>
        ))}
      </Chain.shield>

      <Chain.shield>
        {checkpoint(this.id('t03'))}
        {[clear, clearPanes]}

        {Chain.if(() => Math.random() >= 0.7, (
          <div>
            <p>You're ambushed!{w}</p>

            <Battle
              checkpoint={this.id('t03.battle')}
              actors={makeActors()}
            />
          </div>
        ))}

        {checkpoint(this.id('t03.afterBattle'))}
        {[clear, clearPanes]}
        {sec(0.75)}

        {() => game.setPane('bottom', (
          <div class="ActionsPane">
            {this.renderDefaultActions({
              left: this.id('t02'),
              right: this.id('t04'),
              lookAround: this.id('t03.afterBattle.lookAround'),
            })}
          </div>
        ))}

        {this.renderLookAroundScript(this.id('t03.afterBattle'), (
          <>
            {this.lookAroundMsgs.leftCorridor}{w}<br />
            {this.lookAroundMsgs.rightCorridor}{w}<br />
          </>
        ))}
      </Chain.shield>

      <Chain.shield>
        {checkpoint(this.id('t04'))}
        {[clear, clearPanes]}

        {Chain.if(() => Math.random() >= 0.7, (
          <div>
            <p>You're ambushed!{w}</p>

            <Battle
              checkpoint={this.id('t04.battle')}
              actors={makeActors()}
            />
          </div>
        ))}

        {checkpoint(this.id('t04.afterBattle'))}
        {[clear, clearPanes]}
        {sec(0.75)}

        {() => game.setPane('bottom', (
          <div class="ActionsPane">
            {this.renderDefaultActions({
              up: () => game.dungeon.revealed('lv01.r01.t04') && this.id('t06'),
              left: this.id('t03'),
              right: this.id('t05'),
              lookAround: this.id('t04.afterBattle.lookAround'),
            })}
          </div>
        ))}

        {this.renderLookAroundScript(this.id('t04.afterBattle'), (
          <>
            {() => game.dungeon.reveal('lv01.r01.t04')}
            {this.lookAroundMsgs.upCorridor}{w}<br />
            {this.lookAroundMsgs.leftCorridor}{w}<br />
            {this.lookAroundMsgs.rightCorridor}{w}<br />
          </>
        ))}
      </Chain.shield>
    </Chain.shield>
  );

  renderDefaultActions = conf => (
    <>
      {Boolean(conf.left || conf.right) && (
        <>
          {d.if(() => d.resolve(conf.up), (
            <button
              class="ActionsPane-btn"
              onClick={() => game.chain.run(d.resolve(conf.up))}
            >
              Go up
            </button>
          ))}

          <div class="ActionsPane-row">
            {d.if(() => d.resolve(conf.left), (
              <button
                class="ActionsPane-btn"
                onClick={() => game.chain.run(d.resolve(conf.left))}
              >
                Go left
              </button>
            ))}

            {d.if(() => d.resolve(conf.right), (
              <button
                class="ActionsPane-btn"
                onClick={() => game.chain.run(d.resolve(conf.right))}
              >
                Go right
              </button>
            ))}
          </div>

          {d.if(() => d.resolve(conf.down), (
            <button
              class="ActionsPane-btn"
              onClick={() => game.chain.run(d.resolve(conf.down))}
            >
              Go down
            </button>
          ))}
        </>
      )}

      {d.if(() => d.resolve(conf.lookAround), (
        <button
          class="ActionsPane-btn"
          onClick={() => game.chain.run(d.resolve(conf.lookAround))}
        >
          Look around
        </button>
      ))}
    </>
  );

  renderLookAroundScript = (returnTo, children) => (
    <Chain.shield>
      {checkpoint(`${returnTo}.lookAround`)}
      {() => game.setPane('bottom', null)}
      {sdl(30)}
      {children}
      {goTo(returnTo)}
    </Chain.shield>
  );
}

export default DungeonLv01R01;
