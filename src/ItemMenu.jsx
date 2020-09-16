import Chain, { d } from '@tanosysoft/chain';
import items from './items.jsx';

class ItemMenu extends d.Component {
  constructor({
    classes,
    otherTargets,
    onBack,
    onSelectOther,
    ...otherProps
  }) {
    super();

    this.props = { classes, otherTargets, onBack, onSelectOther };
    this.otherProps = otherProps;
  }

  get classes() {
    return this.props.classes || [];
  }

  get availableItems() {
    return Object.entries(game.inventory).flatMap(([k, v]) => v ? [k] : []);
  }

  get otherTargets() {
    let targets = { ...d.resolve(this.props.otherTargets) };

    for (let [k, v] of Object.entries(targets)) {
      if (!v) {
        delete targets[k];
      }
    }

    return targets;
  }

  get onBack() {
    return this.props.onBack;
  }

  get onSelectOther() {
    return this.props.onSelectOther;
  }

  onSelect(kItem, targetId) {
    game.setPane('bottom', null);

    let [targetType, kTarget] = targetId.split('.');

    if (targetType === 'other') {
      this.onSelectOther(kItem, kTarget);
      return;
    }

    throw new Error('To-Do');
  }

  render = () => (
    <div
      class={['ItemMenu', 'ActionsPane', ...this.classes]}
      {...this.otherProps}
    >
      {d.if(() => !this.kSelectedItem, (
        <>
          {d.map(() => this.availableItems, k => (
            <button
              class="ActionsPane-btn"
              onClick={() => this.kSelectedItem = k}
            >
              {d.text(() => `${items[k].name} (x${game.inventoryItem(k)})`)}
            </button>
          ))}

          <button class="ActionsPane-btn" onClick={this.onBack}>
            Back
          </button>
        </>
      ), (
        <>
          {d.map(() => Object.keys(game.progressVar('actors')), k => (
            <button
              class="ActionsPane-btn"
              onClick={() => this.onSelect(this.kSelectedItem, `actor.${k}`)}
            >
              {d.text(() => game.progress.actors[k].name)}
            </button>
          ))}

          {d.map(() => Object.keys(this.otherTargets), k => (
            <button
              class="ActionsPane-btn"
              onClick={() => this.onSelect(this.kSelectedItem, `other.${k}`)}
            >
              {d.text(() => this.otherTargets[k])}
            </button>
          ))}

          <button
            class="ActionsPane-btn"
            onClick={() => this.kSelectedItem = null}
          >
            Back
          </button>
        </>
      ))}
    </div>
  );
}

export default ItemMenu;
