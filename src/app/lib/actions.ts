'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const SafetyEquipmentSchema = z.object({
  hard_hat: z.coerce.boolean({
    invalid_type_error: 'You need a hard hat.',
  }),
  safety_glasses: z.coerce.boolean({
    invalid_type_error: 'You need a safety glasses.',
  }),
  hearing_protection: z.coerce.boolean({
    invalid_type_error: 'You need a hearing protection.',
  }),
  work_gloves: z.coerce.boolean({
    invalid_type_error: 'work gloves',
  }),
  safety_boots: z.coerce.boolean({
    invalid_type_error: 'You need a safety boots.',
  }),
  safety_harness: z.coerce.boolean({
    invalid_type_error: 'You need a safety harness.',
  }),
  high_visibility_clothing: z.coerce.boolean({
    invalid_type_error: 'You need a high vibility clothing.',
  }),
  dust_masks_or_respirators: z.coerce.boolean({
    invalid_type_error: 'You need a dust mask or respirators.',
  }),
  face_shields: z.coerce.boolean({
    invalid_type_error: 'You need a face shields.',
  }),
  respiratory_protection: z.coerce.boolean({
    invalid_type_error: 'You need a respiratory protection.',
  }),
  fall_protection: z.coerce.boolean({
    invalid_type_error: 'You need a fall protection.',
  }),
})

export type State = {
  errors?: {
    hard_hat?: string[]
    safety_glasses?: string[]
    hearing_protection?: string[]
    work_gloves?: string[]
    safety_boots?: string[]
    safety_harness?: string[]
    high_visibility_clothing?: string[]
    dust_masks_or_respirators?: string[]
    face_shields?: string[]
    respiratory_protection?: string[]
    fall_protection?: string[]
  }
  message?: string | null
}

export async function createWeeklyRecord(prevState: State, formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries())
  console.log(rawFormData)
  const validatedFields = SafetyEquipmentSchema.safeParse(rawFormData)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    }
  }

  revalidatePath('/')
  redirect('/')
}
