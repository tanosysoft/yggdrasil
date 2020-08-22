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
              left: () => game.chain.run('fyrya'),
              right: () => game.chain.run(this.id('t02')),
              lookAround: () => game.chain.run(this.id('t01.lookAround')),
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
              left: () => game.chain.run(this.id('t01')),
              right: () => game.chain.run(this.id('t03')),

              lookAround: () =>
                game.chain.run(this.id('t02.afterBattle.lookAround')),
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
              left: () => game.chain.run(this.id('t02')),
              right: () => game.chain.run(this.id('t04')),

              lookAround: () =>
                game.chain.run(this.id('t03.afterBattle.lookAround')),
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
              up: game.dungeon.revealed('lv01.r01.t04.up') && (() => {
                game.dungeon.markRevealed('lv01.r01.t06.down');
                game.chain.run(this.id('t06'));
              }),

              left: () => game.chain.run(this.id('t03')),
              right: () => game.chain.run(this.id('t05')),

              lookAround: () =>
                game.chain.run(this.id('t04.afterBattle.lookAround')),
            })}
          </div>
        ))}

        {this.renderLookAroundScript(this.id('t04.afterBattle'), (
          <>
            {() => game.dungeon.markRevealed('lv01.r01.t04.up')}
            {this.lookAroundMsgs.upCorridor}{w}<br />
            {this.lookAroundMsgs.leftCorridor}{w}<br />
            {this.lookAroundMsgs.rightCorridor}{w}<br />
          </>
        ))}
      </Chain.shield>

      <Chain.shield>
        {checkpoint(this.id('t05'))}
        {[clear, clearPanes]}

        {Chain.if(() => Math.random() >= 0.7, (
          <div>
            <p>You're ambushed!{w}</p>

            <Battle
              checkpoint={this.id('t05.battle')}
              actors={makeActors()}
            />
          </div>
        ))}

        {checkpoint(this.id('t05.afterBattle'))}
        {[clear, clearPanes]}
        {sec(0.75)}

        {() => game.setPane('bottom', (
          <div class="ActionsPane">
            {this.renderDefaultActions({
              up: game.dungeon.revealed('lv01.r01.t05.up') &&
                (() => game.chain.run(this.id('t07'))),

              left: () => game.chain.run(this.id('t04')),

              lookAround: () =>
                game.chain.run(this.id('t05.afterBattle.lookAround')),
            })}
          </div>
        ))}

        {this.renderLookAroundScript(this.id('t05.afterBattle'), (
          <>
            {() => game.dungeon.markRevealed('lv01.r01.t05.up')}
            {this.lookAroundMsgs.upCorridor}{w}<br />
            {this.lookAroundMsgs.leftCorridor}{w}<br />
          </>
        ))}
      </Chain.shield>

      <Chain.shield>
        {checkpoint(this.id('t06'))}
        {[clear, clearPanes]}

        {Chain.if(() => Math.random() >= 0.7, (
          <div>
            <p>You're ambushed!{w}</p>

            <Battle
              checkpoint={this.id('t06.battle')}
              actors={makeActors()}
            />
          </div>
        ))}

        {checkpoint(this.id('t06.afterBattle'))}
        {[clear, clearPanes]}
        {sec(0.75)}

        {() => game.setPane('bottom', (
          <div class="ActionsPane">
            {this.renderDefaultActions({
              right: game.dungeon.revealed('lv01.r01.t06.right') &&
                (() => game.chain.run(this.id('t07'))),

              down: game.dungeon.revealed('lv01.r01.t06.down') &&
                (() => game.chain.run(this.id('t04'))),

              lookAround: () =>
                game.chain.run(this.id('t06.afterBattle.lookAround')),
            })}
          </div>
        ))}

        {this.renderLookAroundScript(this.id('t06.afterBattle'), (
          <>
            {() => game.dungeon.markRevealed('lv01.r01.t06.right')}
            {() => game.dungeon.markRevealed('lv01.r01.t06.down')}
            {this.lookAroundMsgs.rightCorridor}{w}<br />
            {this.lookAroundMsgs.downCorridor}{w}<br />
          </>
        ))}
      </Chain.shield>

      <Chain.shield>
        {checkpoint(this.id('t07'))}
        {[clear, clearPanes]}

        {Chain.if(() => Math.random() >= 0.7, (
          <div>
            <p>You're ambushed!{w}</p>

            <Battle
              checkpoint={this.id('t07.battle')}
              actors={makeActors()}
            />
          </div>
        ))}

        {checkpoint(this.id('t07.afterBattle'))}
        {[clear, clearPanes]}
        {sec(0.75)}

        {() => game.setPane('bottom', (
          <div class="ActionsPane">
            {this.renderDefaultActions({
              left: game.dungeon.revealed('lv01.r01.t07.left') && (() => {
                game.dungeon.markRevealed('lv01.r01.t06.right');
                game.chain.run(this.id('t06'));
              }),

              right: game.dungeon.revealed('lv01.r01.t07.right') &&
                (() => game.chain.run(this.id('t08'))),

              down: game.dungeon.revealed('lv01.r01.t07.down') &&
                (() => game.chain.run(this.id('t04'))),

              lookAround: () =>
                game.chain.run(this.id('t07.afterBattle.lookAround')),
            })}
          </div>
        ))}

        {this.renderLookAroundScript(this.id('t07.afterBattle'), (
          <>
            {() => game.dungeon.markRevealed('lv01.r01.t07.left')}
            {() => game.dungeon.markRevealed('lv01.r01.t07.right')}
            {() => game.dungeon.markRevealed('lv01.r01.t07.down')}
            {this.lookAroundMsgs.leftCorridor}{w}<br />
            {this.lookAroundMsgs.rightCorridor}{w}<br />
            {this.lookAroundMsgs.downCorridor}{w}<br />
          </>
        ))}
      </Chain.shield>

      <Chain.shield>
        {checkpoint(this.id('t08'))}
        {[clear, clearPanes]}

        {Chain.if(() => Math.random() >= 0.7, (
          <div>
            <p>You're ambushed!{w}</p>

            <Battle
              checkpoint={this.id('t08.battle')}
              actors={makeActors()}
            />
          </div>
        ))}

        {checkpoint(this.id('t08.afterBattle'))}
        {[clear, clearPanes]}
        {sec(0.75)}

        {() => game.setPane('bottom', (
          <div class="ActionsPane">
            {this.renderDefaultActions({
              left: () => game.chain.run(this.id('t07')),
              right: () => game.chain.run('dungeon.lv01.r02'),

              lookAround: () =>
                game.chain.run(this.id('t08.afterBattle.lookAround')),
            })}
          </div>
        ))}

        {this.renderLookAroundScript(this.id('t08.afterBattle'), (
          <>
            {() => game.dungeon.markRevealed('lv01.r01.t08')}
            {this.lookAroundMsgs.leftCorridor}{w}<br />
            {this.lookAroundMsgs.rightCorridor}{w}<br />
          </>
        ))}
      </Chain.shield>
    </Chain.shield>
  );

  renderDefaultActions = conf => (
    <>
      {Boolean(conf.up) && (
        <button class="ActionsPane-btn" onClick={conf.up}>
          Go up
        </button>
      )}

      {Boolean(conf.left || conf.right) && (
        <div class="ActionsPane-row">
          {Boolean(conf.left) && (
            <button class="ActionsPane-btn" onClick={conf.left}>
              Go left
            </button>
          )}

          {Boolean(conf.right) && (
            <button class="ActionsPane-btn" onClick={conf.right}>
              Go right
            </button>
          )}
        </div>
      )}

      {Boolean(conf.down) && (
        <button class="ActionsPane-btn" onClick={conf.down}>
          Go down
        </button>
      )}

      {Boolean(conf.lookAround) && (
        <button class="ActionsPane-btn" onClick={conf.lookAround}>
          Look around
        </button>
      )}
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
