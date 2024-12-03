import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

export type FieldConfig = {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'select' | 'date'
  options?: { value: string; label: string }[]
  validation: z.ZodTypeAny
}

export const useRegistrationForm = (fields: FieldConfig[]) => {
  const formSchema = z.object(
    fields.reduce((acc, field) => {
      acc[field.name] = field.validation
      return acc
    }, {} as Record<string, z.ZodTypeAny>)
  )

  if (fields.some(field => field.name === 'password')) {
    formSchema.refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    })
  }

  type FormValues = z.infer<typeof formSchema>

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: fields.reduce((acc, field) => {
      acc[field.name] = field.type === 'date' ? new Date() : ''
      return acc
    }, {} as Record<string, any>),
  })

  const onSubmit = (values: FormValues) => {
    console.log(values)
    //localStorage.setItem("userInfo",values);
    // Here you would typically send the form data to your backend
  }

  return { form, onSubmit }
}

