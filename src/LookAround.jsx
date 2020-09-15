import Chain, { clear, sdl } from '@tanosysoft/chain';
import checkpoint from './checkpoint';
import label from './label';

let LookAround = ({
  class: classes = [],
  checkpoint: checkpointId,
  label: labelId,
  children,
  ...props
}) => (
  <Chain.shield class={['LookAround', ...classes]} {...props}>
    {checkpointId && checkpoint(checkpointId)}
    {labelId && label(labelId)}
    {() => game.setPane('bottom', null)}
    {clear}
    {sdl(30)}
    {children}
  </Chain.shield>
);

LookAround.defaultMsgs = {
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

  moss: `You see moss on the walls.`,
};

export default LookAround;
