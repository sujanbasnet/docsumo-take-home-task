import { usePreviewerContext } from "@/context/previewer-context"
import { hexToRgba } from "@/lib/util"
import { Dispatch, SetStateAction, useEffect } from "react"

interface IProps {
	id: number
	position: [number, number, number, number]
	color: string
	showBox: boolean
	setIsHovering: Dispatch<SetStateAction<boolean>>
}

export function BBox(props: IProps) {
	const { position, color, setIsHovering, showBox } = props

	const { bboxCanvas: canvas, canvas2dCtx, hasImageBeenDrawn, offset, scale, initialScale } = usePreviewerContext()

	useEffect(() => {
		if (canvas === null) {
			console.warn("Canvas is not set.")
			return
		}

		if (canvas2dCtx === null) {
			console.warn("Canvas 2d context is not set.")
			return
		}

		if (!Array.isArray(position) || position?.length !== 4) {
			console.warn("Position of bbox incorrect")
			return
		}

		if (initialScale === undefined) {
			console.warn("Initial scale is not set.")
			return
		}

		const ctx = canvas2dCtx
		const canvasWidth = canvas.width
		const canvasHeight = canvas.height

		if (ctx === null) {
			return
		}

		if (!hasImageBeenDrawn) {
			return
		}

		// hightlight field in image
		const { x: offsetX, y: offsetY } = offset

		const [x1, y1, x2, y2] = position
		const scaledX1 = offsetX + x1 * initialScale
		const scaledY1 = offsetY + y1 * initialScale
		const scaledX2 = offsetX + x2 * initialScale
		const scaledY2 = offsetY + y2 * initialScale
		const width = Math.abs(scaledX2 - scaledX1)
		const height = Math.abs(scaledY2 - scaledY1)

		ctx.save()
		ctx.translate(canvasWidth / 2, canvasHeight / 2)
		ctx.scale(scale, scale)
		ctx.translate(-canvasWidth / 2, -canvasHeight / 2)
		ctx.beginPath()
		ctx.rect(scaledX1, scaledY1, width, height)
		ctx.fillStyle = showBox ? hexToRgba(color, 0.5) || "rgba(0, 0, 0, 0.3)" : 'rgba(0,0,0,0)'
		ctx.fill()

		ctx.restore()

		function handleMouseMoveEvent(e: MouseEvent) {
			if (canvas === null) {
				return
			}

			// Convert mouse coordinates to canvas world coordinates
			const rectCanvas = canvas.getBoundingClientRect();
			const mouseX = (e.clientX - rectCanvas.left) / scale;
			const mouseY = (e.clientY - rectCanvas.top) / scale;

			// Check hover
			const isHovering = (
				mouseX >= scaledX1 &&
				mouseX <= scaledX1 + width &&
				mouseY >= scaledY1 &&
				mouseY <= scaledY1 + height
			);

			setIsHovering(isHovering)
		}

		// TODO: improve by having one event listener for all Bbox components
		canvas.addEventListener('mousemove', handleMouseMoveEvent);

		return () => {
			ctx.save()
			ctx.translate(canvasWidth / 2, canvasHeight / 2)
			ctx.scale(scale, scale)
			ctx.translate(-canvasWidth / 2, -canvasHeight / 2)
			// add 2 to width and height to clear leftover pixels
			ctx.clearRect(scaledX1 - 1, scaledY1 - 1, width + 2, height + 2)
			ctx.restore()

			canvas.removeEventListener('mousemove', handleMouseMoveEvent)
		}
	}, [hasImageBeenDrawn, scale, offset, initialScale, canvas, canvas2dCtx, position, setIsHovering, showBox, color])

	return null
}
