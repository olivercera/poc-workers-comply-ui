import { useState } from 'react'
import { type SafetyEquipment } from '@/app/lib/definitions'
import { clsx } from 'clsx'

interface Checkbox {
  label: string
  id: string
  checked?: boolean
}

export function Checkbox({ checkboxs }: { checkboxs: Checkbox[] }) {
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
              id={id}
              name={id}
              checked={checked ?? false}
              value={checked?.toString()}
              onChange={handleChange}
              type="checkbox"
              className="h-4 w-4 rounded"
            />
          </div>
          <div className="text-sm leading-6">
            <label htmlFor={id} className="font-medium text-gray-900">
              {label}
            </label>
            {/* <p className="text-gray-500">
              error
            </p> */}
          </div>
        </div>
      ))}
    </>
  )
}
