import './Minimap.css';
import Chain, { d } from '@tanosysoft/chain';

let Minimap = ({
  class: classes = [],
  spec,
  room,
  ...props
}) => (
  <div class={['Minimap', ...classes]} {...props}>
    {d.text(() => {
      let area = room.split('.').slice(0, -1).join('.');

      let [map, ...hiddenCorridors] = spec;
      let roomMatches = [...map.matchAll(/r\d{2}/g)];

      for (let x of roomMatches) {
        if (game.progressVar(`${area}.${x[0]}.visited`)) {
          let curRoom = room.endsWith(`.${x[0]}`);

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

      for (let [rooms, ch, x, y, pred] of hiddenCorridors) {
        let [rA, rB] = rooms.split('.');

        let visitedNeither = [rA, rB].every(
          x => !game.progressVar(`${area}.${x}.visited`),
        );

        let corridorFlag = game.progressVar(`${area}.${rA}.${rB}`);

        if (visitedNeither || !corridorFlag || (pred && !pred())) {
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
