'use client'

import Link from 'next/link'
import { useFormStatus, useFormState } from 'react-dom'
import { Button } from '@/app/ui/Components/Button'
import { Checkbox } from '@/app/ui/Components/Checkbox'
import { createWeeklyRecord, State } from '@/app/lib/actions'
import { safetyEquipment } from '@/app/lib/safetyEquipment'
import Webcam from 'react-webcam'
import { useRef, useState } from 'react'
import Signature from '../Components/Signature'

export default function Form() {
  const initialState: State = { message: '', errors: {} }
  const [state, formAction] = useFormState(createWeeklyRecord, initialState)
  const [imageSrc, setImageSrc] = useState('')
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user')
  const webcamRef = useRef(null)

  const Capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot()
      setImageSrc(imageSrc)
    }
  }
  const ResetPhoto = () => {
    setImageSrc('')
  }

  const ChangeCam = () => {
    setFacingMode(facingMode === 'user' ? 'environment' : 'user')
  }

  return (
    <form
      action={formAction}
      className="border mt p-12 border-gray-900/10 rounded-md bg-white min-w-min md:min-w-[450px]"
    >
      <div className="space-y-7 border-b border-gray-900/10 pb-4">
        <fieldset>
          <legend className="text-sm font-semibold leading-6 text-gray-900">
            Weekly Security Record
          </legend>
          <div className="mt-6 space-y-6">
            <Checkbox checkboxs={safetyEquipment} state={state}></Checkbox>
          </div>
        </fieldset>
      </div>

      <legend className="text-sm font-semibold leading-6 text-gray-900 mt-6">
        Take a Selfie
      </legend>

      <input type="hidden" value={imageSrc} name="selfie" required />

      <div className="mt-5 space-y-7 border-b border-gray-900/10 pb-4 mb-5">
        {imageSrc ? (
          <img src={imageSrc}></img>
        ) : (
          <Webcam
            audio={false}
            height={480}
            width={600}
            screenshotFormat="image/webp"
            screenshotQuality={0.6}
            ref={webcamRef}
            videoConstraints={{
              facingMode: facingMode,
            }}
          ></Webcam>
        )}
        <div className='flex mt-5 mb-5 justify-end space-x-4 "'>
          <Button type="button" onClick={Capture}>
            Take Selfie
          </Button>
          <Button type="button" onClick={ResetPhoto}>
            Reset
          </Button>
          <Button type="button" onClick={ChangeCam}>
            Change Camera
          </Button>
        </div>
      </div>
      <legend className="text-sm font-semibold leading-6 text-gray-900 mt-6 mb-5">
        Signature
      </legend>

      <Signature></Signature>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/"
          className="flex h-10 items-center rounded-lg bg-gray-300 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Send</Button>
      </div>
    </form>
  )
}
