import { z } from 'zod';

// Define a password validation schema that can be reused across multiple schemas
const passwordValidation = z
  .string()
  .min(6, 'Password must be at least 6 characters long') // Minimum length
  .refine(
    (value) => /[A-Z]/.test(value),
    'Password must contain at least one uppercase letter',
  )
  .refine(
    (value) => /[a-z]/.test(value),
    'Password must contain at least one lowercase letter',
  )
  .refine(
    (value) => /[0-9]/.test(value),
    'Password must contain at least one number',
  )
  .refine(
    (value) => /[!@#$%^&*()_+[\]{};':"\\|,.<>?]/.test(value),
    'Password must contain at least one symbol (e.g., !@#$%^&*)',
  );

// Define a Zod schema for the signup data
const signupSchema = z
  .object({
    email: z.string().email('Invalid email address'), // Validate the email address
    password: passwordValidation,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password and confirm password must match',
    path: ['confirmPassword'],
  });

export { signupSchema };

// Define the Zod schema for the sign-in data
const signinSchema = z.object({
  email: z.string().email('Invalid email address'), // Validate the email address
  password: passwordValidation, // Reuse the password validation
});

export { signinSchema };

// Define the Zod schema for the forgotten password data
const forgottenPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export { forgottenPasswordSchema };


// Define the Zod schema for the password reset data
const passwordResetSchema = z.object({
  password: passwordValidation,
  confirmPassword: passwordValidation,
});

export { passwordResetSchema };