import Chain, { d } from '@tanosysoft/chain';

let ActionsPane = ({ class: classes = [], ...props }) => {
  let el = <div class={['ActionsPane', ...classes]} {...props} />;
  return () => game.setPane('bottom', el);
};

ActionsPane.defaultActions = conf => {
  let hidden = k => !conf[k] || (d.resolve(conf.hidden) || []).includes(k);

  return (
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

      {d.if(() => !hidden('lookAround'), (
        <button class="ActionsPane-btn" onClick={conf.lookAround}>
          Look around
        </button>
      ))}
    </>
  );
};

export default ActionsPane;
