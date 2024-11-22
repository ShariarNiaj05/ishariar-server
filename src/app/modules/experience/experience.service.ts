const createExperienceIntoDB = async () => {
  try {
    return 'new Experience';
  } catch (error) {
    console.error('Error in create  experience IntoDB:', error);
  }
};

export const ExperienceService = { createExperienceIntoDB };
