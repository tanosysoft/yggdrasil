import hub from './hub';

let track = (msg, data = {}) => () => {
  if (location.hostname === 'localhost') {
    return;
  }

  hub.post('log', { playerId: game.playerId, msg, ...data })
    .catch(err => console.error(err));
};

export default track;
