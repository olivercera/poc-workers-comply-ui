import { useState } from 'react'
import { type SafetyEquipment } from '@/app/lib/definitions'
import { clsx } from 'clsx'
import { State } from '@/app/lib/actions'

interface Checkbox {
  label: string
  id: string
  checked?: boolean
}

export function Checkbox({
  checkboxs,
  state,
}: {
  checkboxs: Checkbox[]
  state: State
}) {
  const [checkedItems, setCheckedItems] = useState<Checkbox[]>(checkboxs)

  if (!Array.isArray(checkboxs)) {
    throw new Error('the initial state must be an array')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target

    setCheckedItems((prevState) => {
      return prevState.map((item) =>
        item.id === id ? { ...item, checked } : item
      )
    })
  }

  return (
    <>
      {checkedItems.map(({ id, checked, label }) => (
        <div className="relative flex gap-x-3" key={id}>
          <div className="flex h-6 items-center">
            <input
              required
              id={id}
              name={id}
              checked={checked ?? false}
              value={checked?.toString()}
              onChange={handleChange}
              type="checkbox"
              className="h-4 w-4 rounded"
              aria-describedby="security-equipment-error"
            />
          </div>
          <div className="text-sm leading-6">
            <label htmlFor={id} className="font-medium text-gray-900">
              {label}
            </label>
            <div id="customer-error" aria-live="polite" aria-atomic="true">
              {/* TODO: ERRORS */}
              {/* {state.errors &&
                state.errors.typError.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))} */}
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
