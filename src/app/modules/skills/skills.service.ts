import { SkillsModel } from './skills.model';

const getSkills = async () => {
  const skills = await SkillsModel.find({});
  return skills;
};

export const SkillsService = { getSkills };
