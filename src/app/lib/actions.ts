'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const SafetyEquipmentSchema = z.object({
  hard_hat: z.coerce.boolean(),
  safety_glasses: z.coerce.boolean(),
  hearing_protection: z.coerce.boolean(),
  work_gloves: z.coerce.boolean(),
  safety_boots: z.coerce.boolean(),
  safety_harness: z.coerce.boolean(),
  high_visibility_clothing: z.coerce.boolean(),
  dust_masks_or_respirators: z.coerce.boolean(),
  face_shields: z.coerce.boolean(),
  respiratory_protection: z.coerce.boolean(),
  fall_protection: z.coerce.boolean(),
})

export async function createWeeklyRecord(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries())

  const {
    hard_hat,
    safety_glasses,
    hearing_protection,
    work_gloves,
    safety_boots,
    safety_harness,
    high_visibility_clothing,
    dust_masks_or_respirators,
    face_shields,
    respiratory_protection,
    fall_protection,
  } = SafetyEquipmentSchema.parse(rawFormData)

  console.log({
    hard_hat,
    safety_glasses,
    hearing_protection,
    work_gloves,
    safety_boots,
    safety_harness,
    high_visibility_clothing,
    dust_masks_or_respirators,
    face_shields,
    respiratory_protection,
    fall_protection,
  })

  revalidatePath('/')
  redirect('/')
}
