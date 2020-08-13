import label from './label';

let checkpoint = id => [
  label(id),

  chain => {
    chain.progress.lastCheckpoint = id;

    if (chain.autoSave) {
      chain.saveGame();
    }
  },
];

export default checkpoint;
