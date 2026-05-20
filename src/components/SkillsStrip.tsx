import { skillGroups, valueProps } from "../data/skills";
import "./SkillsStrip.css";

const SkillsStrip = () => {
  return (
    <div className="skills">
      <div className="skills__pillars">
        {valueProps.map((v) => (
          <div key={v.headline} className="skills__pillar surface-card">
            <h3 className="skills__pillar-title">{v.headline}</h3>
            <p className="skills__pillar-detail">{v.detail}</p>
          </div>
        ))}
      </div>

      <div className="skills__groups">
        {skillGroups.map((group) => (
          <div key={group.title} className="skills__group">
            <h4 className="skills__group-title">{group.title}</h4>
            <div className="skills__group-tags">
              {group.skills.map((s) => (
                <span key={s} className="tag">{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsStrip;
