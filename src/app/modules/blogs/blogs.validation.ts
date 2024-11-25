import { z } from 'zod';

const createDemoValidationSchema = z.object({
  body: z.object({}),
});

const updateDemoValidationSchema = z.object({
  body: z.object({}),
});

export const BidValidations = {
  createDemoValidationSchema,
  updateDemoValidationSchema,
};
