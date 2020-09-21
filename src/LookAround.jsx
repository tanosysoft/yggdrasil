import Chain, { clear, goTo, sdl, w } from '@tanosysoft/chain';
import checkpoint from './checkpoint';
import items from './items';
import label from './label';

let LookAround = ({
  class: classes = [],
  room,
  children,
  ...props
}) => (
  <Chain.shield class={['LookAround', ...classes]} {...props}>
    {label(`${room}.lookAround`)}
    {() => game.setPane('bottom', null)}
    {clear}
    {sdl(30)}
    {children}

    {() => {
      let roomAfterBattleLabel = `${room}.afterBattle`;

      return goTo(
        game.chain.labelExists(roomAfterBattleLabel)
          ? roomAfterBattleLabel
          : room,
      );
    }}
  </Chain.shield>
);

LookAround.defaultMsgs = props => Object.entries(props)
  .filter(([k, v]) => k !== 'children' && v)
  .flatMap(([k]) => (
    <>
      {{
        upCorridor: `You see a corridor leading up.`,
        leftCorridor: `You see a corridor leading left.`,
        rightCorridor: `You see a corridor leading right.`,
        downCorridor: `You see a corridor leading down.`,

        upCorridorVegBlocked: `You see a corridor leading up, but it's blocked by dense vegetation.`,
        leftCorridorVegBlocked: `You see a corridor leading left, but it's blocked by dense vegetation.`,
        rightCorridorVegBlocked: `You see a corridor leading right, but it's blocked by dense vegetation.`,
        downCorridorVegBlocked: `You see a corridor leading down, but it's blocked by dense vegetation.`,

        upDoor: `You see a door leading up.`,
        leftDoor: `You see a door leading left.`,
        rightDoor: `You see a door leading right.`,
        downDoor: `You see a door leading down.`,
      }[k]}{w}<br />
    </>
  ));

LookAround.gatherables = ({ room }) => () => {
  let pg = game.progressVar(`${room}.gatherables`) || {};
  let spawned = pg.spawned ?? [];
  let seen = pg.seen ?? [];
  let gathered = pg.gathered ?? [];

  return spawned.filter(k => !gathered.includes(k)).flatMap(k => (
    <>
      {() => {
        !seen.includes(k) && seen.push(k);
        game.chain.saveGame();
      }}

      You see {() => items[k].name}.{w}<br />
    </>
  ));
};

export default LookAround;
