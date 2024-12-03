import { FieldConfig } from '@/hooks/useRegistrationForm'
import * as z from 'zod'
export const formFields: FieldConfig[] = [
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      validation: z.string().min(2, 'First name must be at least 2 characters'),
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      validation: z.string().min(2, 'Last name must be at least 2 characters'),
    },
    {
      name: 'surname',
      label: 'Surname',
      type: 'text',
      validation: z.string().min(2, 'Surname must be at least 2 characters'),
    },
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      options: [
        { value: "developer", label: "Developer" },
        { value: "designer", label: "Designer" },
        { value: "manager", label: "Manager" },
      ],
      validation: z.string().min(1, 'Role is required'),
    },
    {
      name: 'project',
      label: 'Project',
      type: 'select',
      options: [
        { value: "projectA", label: "Project A" },
        { value: "projectB", label: "Project B" },
        { value: "projectC", label: "Project C" },
      ],
      validation: z.string().min(1, 'Project is required'),
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      validation: z.string().email('Invalid email address'),
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      validation: z.string().min(8, 'Password must be at least 8 characters'),
    },
    {
      name: 'confirmPassword',
      label: 'Confirm Password',
      type: 'password',
      validation: z.string(),
    },
    {
      name: 'dateOfJoining',
      label: 'Date of Joining',
      type: 'date',
      validation: z.date({
        required_error: "Date of joining is required",
      }),
    },
  ]