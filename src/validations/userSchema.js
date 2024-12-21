import { z } from 'zod';

const passwordRequirements = "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one digit.";

export const UserSchema = z.object({
  email: z.string()
    .email({ message: 'Please enter a valid email' })
    .refine(value => !/\s/.test(value), { message: 'Email cannot contain spaces' }),
  password: z.string()
    .min(8, { message: passwordRequirements })
    .refine(value => /[A-Z]/.test(value), { message: passwordRequirements })
    .refine(value => /[a-z]/.test(value), { message: passwordRequirements })
    .refine(value => /\d/.test(value), { message: passwordRequirements })
    .refine(value => !/\s/.test(value), { message: passwordRequirements }),
  confirmPassword: z.string()
    .min(8, { message: 'Please confirm your password' })
    .refine(value => !/\s/.test(value), { message: 'Password cannot contain spaces' }),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords must match',
  path: ['confirmPassword'],
});