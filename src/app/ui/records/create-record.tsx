'use client'

import { WorkerField } from '@/app/lib/definitions'
import { useFormState } from 'react-dom'
import Link from 'next/link'

import { Button } from '@/app/ui/Components/Button'
import { Checkbox } from '@/app/ui/Components/Checkbox'
import { createWeeklyRecord } from '@/app/lib/actions'
import { safetyEquipment } from '@/app/lib/safetyEquipment'

export default function Form() {
  const initialState = { message: null, errors: {} }

  return (
    <form
      action={createWeeklyRecord}
      className="border p-12 border-gray-900/10 rounded-md bg-white min-w-min md:min-w-[450px]"
    >
      <div className="space-y-7 border-b border-gray-900/10 pb-4">
        <fieldset>
          <legend className="text-sm font-semibold leading-6 text-gray-900">
            Weekly Security Record
          </legend>
          <div className="mt-6 space-y-6">
            <Checkbox checkboxs={safetyEquipment}></Checkbox>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/"
          className="flex h-10 items-center rounded-lg bg-gray-300 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Send Data</Button>
      </div>
    </form>
  )
}
