import Chain, { d } from '@tanosysoft/chain';
import skills from './skills.jsx';

class SkillMenu extends d.Component {
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

  onSelect(kSkill, targetId) {
    game.setPane('bottom', null);

    let [targetType, kTarget] = targetId.split('.');

    if (targetType === 'other') {
      this.onSelectOther(kSkill, kTarget);
      return;
    }

    throw new Error('To-Do');
  }

  render = () => (
    <div
      class={['SkillMenu', 'ActionsPane', ...this.classes]}
      {...this.otherProps}
    >
      {d.if(() => !this.kSelectedSkill, (
        <>
          {d.map(() => game.knownSkills, k => (
            <button
              class="ActionsPane-btn"
              onClick={() => this.kSelectedSkill = k}
            >
              {skills[k].name}
            </button>
          ))}

          <button
            class="ActionsPane-btn"
            onClick={this.onBack}
          >
            Back
          </button>
        </>
      ), (
        <>
          {d.map(() => Object.keys(game.progressVar('actors')), k => (
            <button
              class="ActionsPane-btn"
              onClick={() => this.onSelect(this.kSelectedSkill, `actor.${k}`)}
            >
              {d.text(() => game.progressVar('actors')[k].name)}
            </button>
          ))}

          {d.map(() => Object.keys(this.otherTargets), k => (
            <button
              class="ActionsPane-btn"
              onClick={() => this.onSelect(this.kSelectedSkill, `other.${k}`)}
            >
              {d.text(() => this.otherTargets[k])}
            </button>
          ))}

          <button
            class="ActionsPane-btn"
            onClick={() => this.kSelectedSkill = null}
          >
            Back
          </button>
        </>
      ))}
    </div>
  );
}

export default SkillMenu;
