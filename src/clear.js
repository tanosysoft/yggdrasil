import { clear as chainClear } from '@tanosysoft/chain';

let clear = [
  () => {
    game.setPane('header', null);
    game.setPane('footer', null);
  },

  chainClear,
];

export default clear;
