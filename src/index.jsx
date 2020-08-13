import Chain from '@tanosysoft/chain';
import Game from './Game.jsx';

addEventListener('click', ev => {
  if (ev.target.href?.endsWith('#')) {
    ev.preventDefault();
  }
});

document.getElementById('root').append(<Game />);
