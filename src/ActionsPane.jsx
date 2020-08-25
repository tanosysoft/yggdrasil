import Chain from '@tanosysoft/chain';

let ActionsPane = ({ class: classes = [], ...props }) => {
  let el = <div class={['ActionsPane', ...classes]} {...props} />;
  return () => (console.log(el), game.setPane('bottom', el));
};

ActionsPane.defaultActions = conf => (
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

export default ActionsPane;
