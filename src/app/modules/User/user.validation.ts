import { z } from 'zod';

export const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    role: z.enum(['user', 'admin']).optional(),
    profilePicture: z.string().url('Invalid URL').optional(),
    bio: z.string().optional(),
  }),
});

export const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').optional(),
    email: z.string().email('Invalid email address').optional(),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters long')
      .optional(),
    profilePicture: z.string().url('Invalid URL').optional(),
    bio: z.string().optional(),
    followers: z.array(z.string()).optional(),
    following: z.array(z.string()).optional(),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
