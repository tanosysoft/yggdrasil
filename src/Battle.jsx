import Chain, {
  cancelFastForward,
  clear,
  d,
  goTo,
  sdl,
  sec,
  w,
} from '@tanosysoft/chain';

import checkpoint from './checkpoint';
import clearPanes from './clearPanes';
import cloneDeep from 'lodash/cloneDeep';
import label from './label';

class Battle extends d.Component {
  constructor(props) {
    super();
    this.props = props;
  }

  get btst() {
    return game.chain.progress.battle;
  }

  set btst(x) {
    return game.chain.progress.battle = x;
  }

  actors(prefix) {
    return Object.entries(this.btst.actors)
      .filter(([id]) => !prefix || id.startsWith(prefix))
      .map(([id, x]) => ({ id, ...x }));
  }

  get curActor() {
    let { btst } = this;
    return btst.actors[btst.curActorId] || null;
  }

  get targetActor() {
    let { btst } = this;
    return btst.actors[btst.targetActorId] || null;
  }

  get curLabel() {
    let { btst, curActor } = this;
    return curActor && `${curActor.name}[${btst.curActorId}]`;
  }

  get targetLabel() {
    let { btst, targetActor } = this;
    return targetActor && `${targetActor.name}[${btst.targetActorId}]`;
  }

  render = () => (
    <div class="Battle">
      {checkpoint(this.props.checkpoint)}
      {[clear, clearPanes]}

      {() => this.btst = this.btst || {
        actors: cloneDeep(d.resolve(this.props.actors)),
        turn: 'party',
      }}

      {sec(2)}

      {() => game.setPane('top', (
        <div>
          <h2>
            {d.text(() => ({
              party: 'Party turn',
              enemy: 'Enemy turn',
            }[this.btst.turn]))}
          </h2>

          <p>
            {d.map(() => this.actors('E'), x => (
              <div>
                {d.text(() => `${x.name}[${x.id}]`)}:{' '}
                {d.text(() => `${x.hp}/${x.maxHp}`)} HP,{' '}
                {d.text(() => `${x.mp}/${x.maxMp}`)} MP
              </div>
            ))}
          </p>

          <p>
            {d.map(() => this.actors('P'), x => (
              <div>
                {d.text(() => `${x.name}[${x.id}]`)}:{' '}
                {d.text(() => `${x.hp}/${x.maxHp}`)} HP,{' '}
                {d.text(() => `${x.mp}/${x.maxMp}`)} MP
              </div>
            ))}
          </p>
        </div>
      ))}

      {label(`${this.props.checkpoint}.mainLoop`)}

      {() => {
        if (this.actors('P').every(x => !x.active)) {
          return (
            <div>
              <p>The party has fallen.{w}</p>
              {goTo('title')}
            </div>
          );
        }

        if (this.actors('E').every(x => !x.active)) {
          return (
            <div>
              <p>Victory!{w}</p>
              {goTo(`${this.props.checkpoint}.end`)}
            </div>
          );
        }

        let { turn } = this.btst;

        switch (turn) {
          case 'party': return goTo(`${this.props.checkpoint}.partyLoop`);
          case 'enemy': return goTo(`${this.props.checkpoint}.enemyLoop`);

          default:
            throw new Error(`Invalid turn: ${turn}`);
        }
      }}

      <Chain.shield>
        {label(`${this.props.checkpoint}.partyLoop`)}
        {clear}

        {() => {
          let party = this.actors('P');
          let { btst } = this;

          let loop = btst.partyLoop = btst.partyLoop || {};

          while (true) {
            loop.i = (loop.i ?? -1) + 1;
            let actor = party[loop.i];

            if (!actor) {
              delete btst.partyLoop;
              btst.turn = 'enemy';
              d.update();

              return goTo(`${this.props.checkpoint}.mainLoop`);
            }

            if (actor.active) {
              btst.curActorId = actor.id;
              break;
            }
          }
        }}

        {sec(1)}
        {sdl(30)}
        {cancelFastForward}
        <p>It's {() => this.curLabel}'s turn.{sec(1)}</p>

        {goTo(`${this.props.checkpoint}.playerLoop.mainMenu`)}
      </Chain.shield>

      <Chain.shield>
        {label(`${this.props.checkpoint}.playerLoop.mainMenu`)}

        {() => game.setPane('bottom', (
          <div class="ActionsPane">
            <button
              class="ActionsPane-btn"
              onClick={() => game.chain.run(
                `${this.props.checkpoint}.playerLoop.attackMenu`,
              )}
            >
              Attack
            </button>
          </div>
        ))}
      </Chain.shield>

      <Chain.shield>
        {label(`${this.props.checkpoint}.playerLoop.attackMenu`)}

        {() => game.setPane('bottom', (
          <div class="ActionsPane">
            {d.map(() => this.actors('E').filter(x => x.active), x => (
              <button
                class="ActionsPane-btn"
                onClick={() => {
                  this.btst.targetActorId = x.id;
                  game.chain.run(`${this.props.checkpoint}.attack`);
                }}
              >
                {x.name}[{x.id}]
              </button>
            ))}

            <button
              class="ActionsPane-btn"
              onClick={() => game.chain.run(
                `${this.props.checkpoint}.playerLoop.mainMenu`,
              )}
            >
              Back
            </button>
          </div>
        ))}
      </Chain.shield>

      <Chain.shield>
        {label(`${this.props.checkpoint}.enemyLoop`)}
        {clear}

        {() => {
          let enemies = this.actors('E');
          let { btst } = this;

          let loop = btst.enemyLoop = btst.enemyLoop || {};

          while (true) {
            loop.i = (loop.i ?? -1) + 1;
            let actor = enemies[loop.i];

            if (!actor) {
              delete btst.enemyLoop;
              btst.turn = 'party';
              d.update();

              return goTo(`${this.props.checkpoint}.mainLoop`);
            }

            if (actor.active) {
              btst.curActorId = actor.id;
              break;
            }
          }
        }}

        {sec(1)}
        {sdl(30)}
        {cancelFastForward}
        <p>It's {() => this.curLabel}'s turn.{sec(1)}</p>

        {() => void(this.btst.targetActorId = 'P1')}
        {goTo(`${this.props.checkpoint}.attack`)}
      </Chain.shield>

      <Chain.shield>
        {label(`${this.props.checkpoint}.attack`)}
        {() => game.setPane('bottom', null)}
        {sdl(10)}
        <div>{() => this.curLabel} attacks!{w}</div>

        {() => Math.random() >= 0.95 && (
          <div>
            <div>The attack misses {() => this.targetLabel}!{w}</div>
            {goTo(`${this.props.checkpoint}.mainLoop`)}
          </div>
        )}

        {() => Math.random() >= 0.95 && (
          <div>
            <div>{() => this.targetLabel} evades!{w}</div>
            {goTo(`${this.props.checkpoint}.mainLoop`)}
          </div>
        )}

        {async () => {
          let { curActor, targetActor } = this;

          let dmg = (curActor.atk * 4) - (targetActor.def * 2);
          let variance = 0.2;

          dmg += ((Math.random() * variance * 2) - variance) * dmg;
          dmg = Math.round(dmg);

          targetActor.hp = Math.max(0, targetActor.hp - dmg);

          if (!targetActor.hp) {
            targetActor.active = false;
          }

          game.chain.autoSave && game.chain.saveGame();
          d.update();

          return (
            <div>
              <div>{() => this.targetLabel} loses {dmg} HP.{w}</div>

              {!targetActor.hp && (
                <div>{() => this.targetLabel} is no more.{w}</div>
              )}
            </div>
          );
        }}

        {goTo(`${this.props.checkpoint}.mainLoop`)}
      </Chain.shield>

      {Chain.halt}

      {checkpoint(`${this.props.checkpoint}.end`)}
      {[clear, clearPanes]}
      {() => this.btst = null}
    </div>
  );
}

export default Battle;
