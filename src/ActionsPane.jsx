import Chain, { d } from '@tanosysoft/chain';
import items from './items.jsx';

let ActionsPane = ({ class: classes = [], ...props }) => {
  let el = <div class={['ActionsPane', ...classes]} {...props} />;
  return () => game.setPane('bottom', el);
};

ActionsPane.defaultActions = conf => {
  let hidden = k => {
    switch (k) {
      case 'lookAround': return conf.lookAround === false;

      case 'useItem':
        return conf.useItem === false ||
          !Object.values(game.inventory).filter(Boolean).length;

      case 'gather': {
        if (conf.gather === false) { return false }

        let { seen = [], gathered = [] } =
          game.progressVar(`${conf.room}.gatherables`) || {};

        return seen.length - gathered.length <= 0;
      }
    }

    let baseCondition = !conf[k] || (d.resolve(conf.hidden) || []).includes(k);

    if (!baseCondition && k === 'useSkill') {
      return !game.knownSkills.length;
    }

    return baseCondition;
  };

  let gatherableOptions = () => {
    let { seen = [], gathered = [] } =
      game.progressVar(`${conf.room}.gatherables`) || {};

    return seen.filter(k => !gathered.includes(k));
  };

  let submenu = 'main';

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
                <button class="ActionsPane-btn" onClick={conf.useItem}>
                  Use Item
                </button>
              ))}

              {d.if(() => !hidden('useSkill'), (
                <button class="ActionsPane-btn" onClick={conf.useSkill}>
                  Use Skill
                </button>
              ))}

              {d.if(() => !hidden('gather'), (
                <button class="ActionsPane-btn" onClick={() => submenu = 'gather'}>
                  Gather
                </button>
              ))}
            </div>
          ))}
        </>
      ))}

      {d.if(() => submenu === 'gather', (
        <>
          {d.map(gatherableOptions, k => (
            <button
              class="ActionsPane-btn"
              onClick={() => {
                submenu = null;
                game.run(`${conf.room}.gather.${k}`);
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
