import { useRef, useEffect } from 'react'

export default function Signature() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const btnClearRef = useRef<HTMLButtonElement | null>(null)
  const imageInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (!canvasRef.current || !btnClearRef.current) {
      return
    }

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    if (!context) {
      throw new Error('Canvas not found.')
    }

    // Ajustar el tamaño del canvas
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight

    const PENCIL_COLOR = 'black'
    const BACKGROUND = 'white'
    const THICKNESS = 2
    let xPrevious = 0,
      yPrevious = 0,
      xCurrent = 0,
      yCurrent = 0
    let drawIsStart = false

    const obteinXReal = (clientX: number): number => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect()
        return clientX - rect.left
      }
      return 0
    }

    const obteinYReal = (clientY: number): number => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect()
        return clientY - rect.top
      }
      return 0
    }

    const clearCanvas = (): void => {
      context.fillStyle = BACKGROUND
      context.fillRect(0, 0, canvas.width, canvas.height)
    }

    clearCanvas()

    btnClearRef.current.onclick = clearCanvas

    const onClickStart = (event: MouseEvent | TouchEvent): void => {
      if (event instanceof MouseEvent) {
        xPrevious = xCurrent
        yPrevious = yCurrent
        xCurrent = obteinXReal(event.clientX)
        yCurrent = obteinYReal(event.clientY)
      } else if (event instanceof TouchEvent) {
        const touch = event.touches[0]
        xPrevious = xCurrent
        yPrevious = yCurrent
        xCurrent = obteinXReal(touch.clientX)
        yCurrent = obteinYReal(touch.clientY)
      }

      context.beginPath()
      context.fillStyle = PENCIL_COLOR
      context.fillRect(xCurrent, yCurrent, THICKNESS, THICKNESS)
      context.closePath()

      drawIsStart = true
    }

    const onMouseMove = (event: MouseEvent | TouchEvent): void => {
      event.preventDefault()

      if (!drawIsStart) {
        return
      }

      let clientX: number
      let clientY: number

      if (event instanceof MouseEvent) {
        clientX = event.clientX
        clientY = event.clientY
      } else if (event instanceof TouchEvent) {
        const touch = event.touches[0]
        clientX = touch.clientX
        clientY = touch.clientY
      } else {
        return
      }

      xPrevious = xCurrent
      yPrevious = yCurrent
      xCurrent = obteinXReal(clientX)
      yCurrent = obteinYReal(clientY)

      context.beginPath()
      context.moveTo(xPrevious, yPrevious)
      context.lineTo(xCurrent, yCurrent)
      context.strokeStyle = PENCIL_COLOR
      context.lineWidth = THICKNESS
      context.stroke()
      context.closePath()
    }

    const onMouseUp = (): void => {
      drawIsStart = false
    }

    const addEventListeners = () => {
      canvas.addEventListener('mousedown', onClickStart as EventListener)
      canvas.addEventListener('touchstart', onClickStart as EventListener)
      canvas.addEventListener('mousemove', onMouseMove as EventListener)
      canvas.addEventListener('touchmove', onMouseMove as EventListener)
      canvas.addEventListener('mouseup', onMouseUp as EventListener)
      canvas.addEventListener('touchend', onMouseUp as EventListener)
    }

    const removeEventListeners = () => {
      canvas.removeEventListener('mousedown', onClickStart as EventListener)
      canvas.removeEventListener('touchstart', onClickStart as EventListener)
      canvas.removeEventListener('mousemove', onMouseMove as EventListener)
      canvas.removeEventListener('touchmove', onMouseMove as EventListener)
      canvas.removeEventListener('mouseup', onMouseUp as EventListener)
      canvas.removeEventListener('touchend', onMouseUp as EventListener)
    }

    addEventListeners()

    return () => {
      removeEventListeners()
    }
  }, [])

  const handleSaveImage = () => {
    if (canvasRef.current) {
      const dataURL = canvasRef.current.toDataURL('image/webp', 0.6)
      if (imageInputRef.current) {
        imageInputRef.current.value = dataURL
      }
    }
  }

  return (
    <div className=" w-full h-64 flex flex-col mb-24">
      <canvas className="w-full h-full border border-black" ref={canvasRef} />
      <div className="flex flex-row-reverse gap-4">
        <button
          type="button"
          onClick={handleSaveImage}
          className="
        mt-5  justify-end space-x-4
        flex self-end h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
        >
          Save Signature
        </button>
        <button
          type="button"
          ref={btnClearRef}
          className="
        mt-5  justify-end space-x-4
        flex self-end h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
        >
          Clear
        </button>
      </div>
      <input type="hidden" name="signature" ref={imageInputRef} />
    </div>
  )
}
