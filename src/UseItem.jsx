import Chain, { goTo, label } from '@tanosysoft/chain';
import items from './items.jsx';

let UseItem = () => (
  <Chain.shield>
    {label('useItem')}

    {() => {
      let itemReq = game.progress.latestUseItemRequest;
      return items[itemReq.key].use(itemReq);
    }}
  </Chain.shield>
);

export default UseItem;
