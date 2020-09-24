import ActionsPane from './ActionsPane';
import Chain, { clear, d, goTo, sdl, sec, w } from '@tanosysoft/chain';
import checkpoint from './checkpoint';
import label from './label';
import quests from './quests';

let checkQuest = kQuest => {
  let { active, done } = game.progress.quests;
  let { prerequisites, items } = quests[kQuest];

  if (active !== kQuest || (
    prerequisites && prerequisites.some(k => !done.includes(k))
  )) {
    return false;
  }

  for (let [count, kItem] of items) {
    if (game.inventoryItem(kItem) < count) {
      return false;
    }
  }

  return true;
};

let areaId = k => `pub${k ? `.${k}` : ''}`;

let Pub = () => (
  <Chain.shield>
    {checkpoint(areaId())}
    {() => game.setPanes({ top: null, bottom: null })}
    {clear}
    {sec(2)}
    {sdl(80)}
    <h1>The Pub{sec(2)}</h1>

    {sdl(30)}
    Welcome to The Pub!{w}<br />
    May I interest you in some quests?{w}<br />

    {() => {
      game.progress.quests ??= { active: null, done: [] };
      game.chain.saveGame();
    }}

    <ActionsPane>
      {d.map(() => Object.keys(quests).filter(k => {
        let { active, done } = game.progress.quests;
        let { prerequisites } = quests[k];

        return k === active || (
          (!prerequisites || prerequisites.every(x => done.includes(x))) &&
          !done.includes(k)
        );
      }), k => (
        <button
          class="ActionsPane-btn"
          onClick={() => {
            game.progressVar(areaId('quest.k'), k);
            game.run(areaId('quest'));
          }}
        >
          {d.text(() => quests[k].name)}
        </button>
      ))}

      <button class="ActionsPane-btn" onClick={() => game.run('fyrya')}>
        Leave
      </button>
    </ActionsPane>

    <Chain.shield>
      {label(areaId('quest'))}
      {() => game.setPane('bottom', null)}
      {clear}
      {sdl(30)}

      {Chain.if(() => !checkQuest(game.progress.pub.quest.k), (
        <div>
          {() => void(game.progress.quests.active = game.progress.pub.quest.k)}
          {() => quests[game.progress.quests.active].description}
        </div>
      ), (
        <div>
          {() => {
            let { active } = game.progress.quests;

            for (let [count, kItem] of quests[active].items) {
              game.inventoryItem(kItem, -count);
            }

            {
              let { quests } = game.progress;

              quests.active = null;
              quests.done.push(active);
            }

            game.chain.saveGame();
          }}

          Thank you!{w}
        </div>
      ))}

      {goTo(areaId())}
    </Chain.shield>
  </Chain.shield>
);

export default Pub;
