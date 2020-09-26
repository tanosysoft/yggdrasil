import Chain from '@tanosysoft/chain';
import Game from './Game.jsx';
import eruda from 'eruda';

eruda.init();

addEventListener('click', ev => {
  if (ev.target.href?.endsWith('#')) {
    ev.preventDefault();
  }
});

document.getElementById('root').append(<Game />);
