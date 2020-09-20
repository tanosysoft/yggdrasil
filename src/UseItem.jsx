import Chain, { clear, d, goTo, label, sdl, w } from '@tanosysoft/chain';
import items from './items.jsx';

let UseItem = () => (
  <Chain.shield>
    {label('useItem')}
    {() => game.setPane('bottom', null)}
    {clear}
    {sdl(30)}

    {() => {
      let { useItem } = game.progress;
      let item = items[useItem.kItem];

      if (!item.use) {
        return <>{() => item.name} can't be used here.{w}<br /></>;
      }

      return item.use(useItem);
    }}

    {() => goTo(game.progress.useItem.returnTo)}
  </Chain.shield>
);

export default UseItem;
