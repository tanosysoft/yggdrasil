import Chain, { clear, goTo, sdl, w } from '@tanosysoft/chain';
import items from './items.jsx';
import label from './label';

let Gather = () => (
  <Chain.shield>
    {label('gather')}

    {() => {
      let { gather } = game.progress;
      let { gatherables } = game.progressVar(gather.room);

      let gathered = gatherables.gathered ??= [];

      gathered.push(gather.k);
      game.chain.saveGame();

      return (
        <>
          {() => game.setPane('bottom', null)}
          {clear}
          {sdl(30)}
          {() => void(game.inventoryItem(gather.k, 1))}
          You gather {items[gather.k].name}.{w}<br />
          {goTo(gather.returnTo)}
        </>
      );
    }}
  </Chain.shield>
);

export default Gather;
