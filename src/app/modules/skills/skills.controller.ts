import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SkillsService } from './skills.service';
import httpStatus from 'http-status';

const getAllSkills = catchAsync(async (req: Request, res: Response) => {
  const skills = await SkillsService.getSkills();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Skills retrieved successfully',
    data: skills,
  });
});

const createSkill = catchAsync(async (req: Request, res: Response) => {
  const newSkill = await SkillsService.createSkillIntoDB(req);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Skill created successfully',
    data: newSkill,
  });
});

export const SkillsController = { getAllSkills, createSkill };
