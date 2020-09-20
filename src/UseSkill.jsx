import Chain, { clear, d, goTo, label, sdl, w } from '@tanosysoft/chain';
import skills from './skills.jsx';

let UseSkill = () => (
  <Chain.shield>
    {label('useSkill')}
    {() => game.setPane('bottom', null)}
    {clear}
    {sdl(30)}

    {() => {
      let { useSkill } = game.progress;
      let skill = skills[useSkill.kSkill];

      if (!skill.use) {
        return <>{() => skill.name} can't be used here.{w}<br /></>;
      }

      return skill.use(useSkill);
    }}

    {() => goTo(game.progress.useSkill.returnTo)}
  </Chain.shield>
);

export default UseSkill;
