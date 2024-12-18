'use client'

import { Button } from '../components/ui/button'
import { Form } from '../components/ui/form';
import { useRegistrationForm } from '../hooks/useRegistrationForm'
import {formFields} from "../constants"
import { DynamicField } from '../components/users/FormFields'


export default function RegisterForm() {
  const { form, onSubmit } = useRegistrationForm(formFields)

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-4">
      <h1 className="text-2xl font-bold mb-6">Registration Form</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {formFields.slice(0, 3).map((field) => (
              <DynamicField key={field.name} field={field} />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formFields.slice(3, 5).map((field) => (
              <DynamicField key={field.name} field={field} />
            ))}
          </div>
          <DynamicField field={formFields[5]} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formFields.slice(6, 8).map((field) => (
              <DynamicField key={field.name} field={field} />
            ))}
          </div>
          <DynamicField field={formFields[8]} />
          <Button type="submit" className="w-full">Register</Button>
        </form>
      </Form>
    </div>
  )
}

