import Chain, { d } from '@tanosysoft/chain';
import items from './items.jsx';
import skills from './skills.jsx';

let ActionsPane = ({ class: classes = [], ...props }) => {
  let el = <div class={['ActionsPane', ...classes]} {...props} />;
  return () => game.setPane('bottom', el);
};

ActionsPane.defaultActions = conf => {
  let gatherableOptions = () => {
    let { seen = [], gathered = [] } =
      game.progressVar(`${conf.room}.gatherables`) || {};

    return seen.filter(k => !gathered.includes(k));
  };

  let hidden = k => {
    switch (k) {
      case 'lookAround': return conf.lookAround === false || !conf.room;

      case 'useItem':
        return conf.useItem === false ||
          !Object.values(game.inventory).filter(Boolean).length;

      case 'useSkill':
        return conf.useSkill === false || !game.knownSkills.length;

      case 'gather':
        return conf.gather === false || !gatherableOptions().length;
    }

    return !conf[k] || (d.resolve(conf.hidden) || []).includes(k);
  };

  let submenu = 'main';

  let availableItems = () => Object.keys(game.inventory)
    .flatMap(k => game.inventory[k] > 0 ? [k] : []);

  let kSelectedItem = null;
  let kSelectedSkill = null;

  let onUseItem = (kItem, kTarget) => {
    submenu = 'main';

    game.progressVar('useItem', {
      kItem,
      kTarget,

      returnTo: [`${conf.room}.afterBattle`, conf.room]
        .find(game.chain.labelExists),
    });

    for (let label of [
      `${conf.room}.useItem.${kItem}.on.${kTarget}`,
      `${conf.room}.useItem.${kItem}`,
      `${conf.room}.useItem`,
    ]) {
      if (game.chain.labelExists(label)) {
        game.run(label);
        return;
      }
    }

    game.run('useItem');
  };

  let onUseSkill = (kSkill, kTarget) => {
    submenu = 'main';

    game.progressVar('useSkill', {
      kSkill,
      kTarget,

      returnTo: [`${conf.room}.afterBattle`, conf.room]
        .find(game.chain.labelExists),
    });

    for (let label of [
      `${conf.room}.useSkill.${kSkill}.on.${kTarget}`,
      `${conf.room}.useSkill.${kSkill}`,
      `${conf.room}.useSkill`,
    ]) {
      if (game.chain.labelExists(label)) {
        game.run(label);
        return;
      }
    }

    game.run('useSkill');
  };

  return (
    <>
      {d.if(() => submenu === 'main', (
        <>
          {d.if(() => !hidden('up'), (
            <button class="ActionsPane-btn" onClick={conf.up}>
              Go up
            </button>
          ))}

          {d.if(() => !hidden('left') || !hidden('right'), (
            <div class="ActionsPane-row">
              {d.if(() => !hidden('left'), (
                <button class="ActionsPane-btn" onClick={conf.left}>
                  Go left
                </button>
              ))}

              {d.if(() => !hidden('right'), (
                <button class="ActionsPane-btn" onClick={conf.right}>
                  Go right
                </button>
              ))}
            </div>
          ))}

          {d.if(() => !hidden('down'), (
            <button class="ActionsPane-btn" onClick={conf.down}>
              Go down
            </button>
          ))}

          {d.if(() => !hidden('lookAround') || !hidden('gather'), (
            <div class="ActionsPane-row">
              {d.if(() => !hidden('lookAround'), (
                <button
                  class="ActionsPane-btn"
                  onClick={() => game.run(`${conf.room}.lookAround`)}
                >
                  Look around
                </button>
              ))}

              {d.if(() => !hidden('useItem'), (
                <button
                  class="ActionsPane-btn"
                  onClick={() => submenu = 'item'}
                >
                  Use Item
                </button>
              ))}

              {d.if(() => !hidden('useSkill'), (
                <button
                  class="ActionsPane-btn"
                  onClick={() => submenu = 'skill'}
                >
                  Use Skill
                </button>
              ))}

              {d.if(() => !hidden('gather'), (
                <button
                  class="ActionsPane-btn"
                  onClick={() => submenu = 'gather'}
                >
                  Gather
                </button>
              ))}
            </div>
          ))}
        </>
      ))}

      {d.if(() => submenu === 'item', (
        <>
          {d.map(availableItems, k => (
            <button
              class="ActionsPane-btn"
              onClick={() => {
                submenu = 'itemTarget';
                kSelectedItem = k;
              }}
            >
              Use {items[k].name}
            </button>
          ))}

          <button class="ActionsPane-btn" onClick={() => submenu = 'main'}>
            Back
          </button>
        </>
      ))}

      {d.if(() => submenu === 'itemTarget', (
        <>
          {d.map(() => Object.keys(game.progress.actors), k => (
            <button
              class="ActionsPane-btn"
              onClick={() => onUseItem(kSelectedItem, k)}
            >
              On {d.text(() => game.progress.actors[k].name)}
            </button>
          ))}

          {d.map(() => Object.keys(d.resolve(conf.otherTargets) || {}), k => (
            <button
              class="ActionsPane-btn"
              onClick={() => onUseItem(kSelectedItem, k)}
            >
              On {d.text(() => d.resolve(conf.otherTargets)[k])}
            </button>
          ))}

          <button class="ActionsPane-btn" onClick={() => submenu = 'item'}>
            Back
          </button>
        </>
      ))}

      {d.if(() => submenu === 'skill', (
        <>
          {d.map(() => game.knownSkills, k => (
            <button
              class="ActionsPane-btn"
              onClick={() => {
                submenu = 'skillTarget';
                kSelectedSkill = k;
              }}
            >
              Use {skills[k].name}
            </button>
          ))}

          <button class="ActionsPane-btn" onClick={() => submenu = 'main'}>
            Back
          </button>
        </>
      ))}

      {d.if(() => submenu === 'skillTarget', (
        <>
          {d.map(() => Object.keys(game.progress.actors), k => (
            <button
              class="ActionsPane-btn"
              onClick={() => onUseSkill(kSelectedSkill, k)}
            >
              On {d.text(() => game.progress.actors[k].name)}
            </button>
          ))}

          {d.map(() => Object.keys(d.resolve(conf.otherTargets) || {}), k => (
            <button
              class="ActionsPane-btn"
              onClick={() => onUseSkill(kSelectedSkill, k)}
            >
              On {d.text(() => d.resolve(conf.otherTargets)[k])}
            </button>
          ))}

          <button class="ActionsPane-btn" onClick={() => submenu = 'skill'}>
            Back
          </button>
        </>
      ))}

      {d.if(() => submenu === 'gather', (
        <>
          {d.map(gatherableOptions, k => (
            <button
              class="ActionsPane-btn"
              onClick={() => {
                submenu = 'main';

                game.progressVar('gather', {
                  k,
                  room: conf.room,

                  returnTo: [`${conf.room}.afterBattle`, conf.room]
                    .find(game.chain.labelExists),
                });

                for (let label of [
                  `${conf.room}.gather.${k}`,
                  `${conf.room}.gather`,
                  `gather.${k}`,
                ]) {
                  if (game.chain.labelExists(label)) {
                    game.run(label);
                    return;
                  }
                }

                game.run('gather');
              }}
            >
              Gather {items[k].name}
            </button>
          ))}

          <button class="ActionsPane-btn" onClick={() => submenu = 'main'}>
            Back
          </button>
        </>
      ))}
    </>
  );
};

export default ActionsPane;
