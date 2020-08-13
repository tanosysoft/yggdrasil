import { clear as chainClear } from '@tanosysoft/chain';

let clear = [
  () => {
    game.setPane('top', null);
    game.setPane('bottom', null);
  },

  chainClear,
];

export default clear;
