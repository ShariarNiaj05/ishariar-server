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

export const SkillsController = { getAllSkills };
