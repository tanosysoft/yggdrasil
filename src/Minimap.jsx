import './Minimap.css';
import Chain, { d } from '@tanosysoft/chain';

let Minimap = ({
  class: classes = [],
  spec,
  roomId,
  ...props
}) => (
  <div class={['Minimap', ...classes]} {...props}>
    {d.text(() => {
      let areaId = roomId.split('.').slice(0, -1).join('.');

      let [map, ...hiddenCorridors] = spec;
      let roomMatches = [...map.matchAll(/r\d{2}/g)];

      for (let x of roomMatches) {
        if (game.progressVar(`${areaId}.${x[0]}.visited`)) {
          let curRoom = roomId.endsWith(`.${x[0]}`);

          map = [
            map.substring(0, x.index),
            ` ${curRoom ? '▼' : ' '} `,
            map.substring(x.index + 3),
          ].join('');
        } else {
          map = [
            map.substring(0, x.index - 1),
            '      ',
            map.substring(x.index + 5),
          ].join('');
        }
      }

      map = map.split('\n');

      for (let [ch, x, y, pred] of hiddenCorridors) {
        if (!pred()) {
          continue;
        }

        map[y] = [
          map[y].substring(0, x),
          ch,
          map[y].substring(x + 1),
        ].join('');
      }

      map = map.map(x => x.trimEnd()).filter(Boolean).join('\n');

      return map;
    })}
  </div>
);

export default Minimap;
