import ActionsPane from './ActionsPane';
import Chain, { clear, d, goTo, sdl, sec, w } from '@tanosysoft/chain';
import checkpoint from './checkpoint';
import label from './label';

let areaId = k => `pub${k ? `.${k}` : ''}`;

let PubQuestBtn = ({ quest, name, prerequisites }) => d.if(() => {
  let { done } = game.progress.quests;

  return (!prerequisites || prerequisites.every(x => done.includes(x))) &&
    !done.includes(quest);
}, (
    <button class="ActionsPane-btn" onClick={() => game.run(areaId(quest))}>
      {name}
    </button>
));

let Pub = () => (
  <Chain.shield>
    {checkpoint('pub')}
    {() => game.setPanes({ top: null, bottom: null })}
    {clear}
    {sec(2)}
    {sdl(80)}
    <h1>The Pub{sec(2)}</h1>

    {sdl(30)}
    Welcome to The Pub!{w}<br />
    May I interest you in some quests?{w}<br />

    {() => {
      game.progress.quests ??= { active: [], done: [] };
      game.chain.saveGame();
    }}

    <ActionsPane>
      <PubQuestBtn quest="batFangs" name="Collect Bat Fangs" />

      <PubQuestBtn
        quest="greenGoo"
        name="Collect Green Goo"
        prerequisites={['batFangs']}
      />

      <PubQuestBtn
        quest="moss"
        name="Gather Moss"
        prerequisites={['greenGoo']}
      />

      <PubQuestBtn
        quest="weed"
        name="Gather Weed"
        prerequisites={['moss']}
      />

      <PubQuestBtn
        quest="twig"
        name="Gather Twig and Stone"
        prerequisites={['weed']}
      />

      <PubQuestBtn
        quest="flowerBuds"
        name="Gather Flower Buds and Tiny Petals"
        prerequisites={['twig']}
      />

      <PubQuestBtn
        quest="vampireFangs"
        name="Collect Vampire Fangs"
        prerequisites={['flowerBuds']}
      />

      <PubQuestBtn
        quest="advSkulls"
        name="Gather Adventurer Skulls"
        prerequisites={['vampireFangs']}
      />

      <button class="ActionsPane-btn" onClick={() => game.run('fyrya')}>
        Leave
      </button>
    </ActionsPane>

    <Chain.shield>
      {label(areaId('batFangs'))}
      {() => game.setPane('bottom', null)}
      {clear}
      {sdl(30)}

      {Chain.if(() =>
        !game.progress.quests.active.includes('batFangs') ||
        (game.inventory.batFangs ?? 0) < 3, (
          <div>
            {() => {
              let { active } = game.progress.quests;

              !active.includes('batFangs') && active.push('batFangs');
              game.chain.saveGame();
            }}

            Please find and bring me 3 Bat Fangs.{w}
          </div>
        ), (
          <div>
            {() => {
              let { active, done } = game.progress.quests;

              done.push('batFangs');
              active.splice(active.indexOf('batFangs'), 1);
              game.chain.saveGame();
            }}

            Thank you!{w}
          </div>
        )
      )}

      {goTo('pub')}
    </Chain.shield>

    <Chain.shield>
      {label(areaId('greenGoo'))}
      {() => game.setPane('bottom', null)}
      {clear}
      {sdl(30)}

      {Chain.if(() =>
        !game.progress.quests.active.includes('greenGoo') ||
        (game.inventory.greenGoo ?? 0) < 3, (
          <div>
            {() => {
              let { active } = game.progress.quests;

              !active.includes('greenGoo') && active.push('greenGoo');
              game.chain.saveGame();
            }}

            Please find and bring me 4 Green Goo.{w}
          </div>
        ), (
          <div>
            {() => {
              let { active, done } = game.progress.quests;

              done.push('greenGoo');
              active.splice(active.indexOf('greenGoo'), 1);
              game.chain.saveGame();
            }}

            Thank you!{w}
          </div>
        )
      )}

      {goTo('pub')}
    </Chain.shield>
  </Chain.shield>
);

export default Pub;
