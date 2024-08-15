'use client'

import { useEffect, useState } from 'react'

export default function WorkerProfile() {
  const [worker, setWorker] = useState<any>(null)

  useEffect(() => {
    const data = localStorage.getItem('worker')
    if (data) {
      setWorker(JSON.parse(data))
    }
  }, [])

  if (!worker) {
    return <div>Loading...</div>
  }

  const safetyEquipmentKeys = [
    'hard_hat',
    'safety_glasses',
    'hearing_protection',
    'work_gloves',
    'safety_boots',
    'safety_harness',
    'high_visibility_clothing',
    'dust_masks_or_respirators',
    'face_shields',
    'respiratory_protection',
    'fall_protection',
  ]

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-gray-200 p-4 flex items-center">
        <img
          className="w-20 h-20 rounded-full border-2 border-gray-300"
          src={worker.selfie}
          alt="Worker Photo"
        />
        <div className="ml-4">
          <h2 className="text-xl font-semibold text-gray-700">Miguel Angelo</h2>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Firma</h3>
        <img
          className="w-full h-32 object-contain border border-gray-300 p-2"
          src={worker.signature}
          alt="Signature"
        />

        <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-4">
          Safety Equipment
        </h3>
        <ul className="space-y-2">
          {safetyEquipmentKeys.map((key) => (
            <li key={key} className="flex items-center">
              <span
                className={`inline-block w-4 h-4 mr-2 rounded-full ${
                  worker[key] ? 'bg-green-500' : 'bg-red-500'
                }`}
              ></span>
              <span className="capitalize text-gray-700">
                {key.replace(/_/g, ' ')}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
