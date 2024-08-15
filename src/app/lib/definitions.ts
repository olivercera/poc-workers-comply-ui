export type WorkerField = {
  id: string
  name: string
}

export interface SafetyEquipment {
  hard_hat: boolean
  safety_glasses: boolean
  hearing_protection: boolean
  work_gloves: boolean
  safety_boots: boolean
  safety_harness: boolean
  high_visibility_clothing: boolean
  dust_masks_or_respirators: boolean
  face_shields: boolean
  respiratory_protection: boolean
  fall_protection: boolean
}

export interface WeeklyRecord extends SafetyEquipment {
  signature: string
  selfie: string
}
