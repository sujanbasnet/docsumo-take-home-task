"use client"

import { IField } from "@/types/field"
import { useEffect, useRef, useState } from "react"

interface IProps {
	imageURL: string
	fields: IField[]
}

export function Previewer(props: IProps) {
	const { imageURL, fields } = props
	const ref = useRef<HTMLCanvasElement>(null)

	const canvas2dCtxRef = useRef<CanvasRenderingContext2D>(null)
	const baseScaleRef = useRef<number>(null)
	const offsetRef = useRef<{ x: number, y: number }>(null)
	const [hasImageBeenDrawn, setHasImageBeenDrawn] = useState(false)

	useEffect(() => {
		const canvas = ref.current
		if (canvas === null) {
			return
		}


		const ctx = canvas2dCtxRef.current = canvas.getContext('2d')

		if (ctx === null) {
			alert('There was an error in the app. Please reload the page to try again.')
			return
		}

		const img = new Image();
		img.src = imageURL; // Replace with your image path or URL

		img.onload = function() {
			// set canvas width and height to rendered canvas widht and height
			const canvasWidth = canvas.width = canvas.clientWidth;
			const canvasHeight = canvas.height = canvas.clientHeight;

			const imgWidth = img.width;
			const imgHeight = img.height;

			let drawWidth = imgWidth
			let drawHeight = imgHeight

			// if img is wider than canvas, resize the image width
			// and the height to keep aspect ratio
			if (imgWidth > canvasWidth) {
				const imageToCanvasWidthRatio = imgWidth / canvasWidth
				drawWidth = imgWidth / imageToCanvasWidthRatio
				drawHeight = imgHeight / imageToCanvasWidthRatio
			}

			// if the image/resized image is taller that the canvas,
			// resize the height and update the width to keep aspect ratio
			if (drawHeight > canvasHeight) {
				const imageToCanvasHeightRatio = drawHeight / canvasHeight
				drawHeight = drawHeight / (imageToCanvasHeightRatio)
				drawWidth = drawWidth / imageToCanvasHeightRatio;
			}

			baseScaleRef.current = drawHeight / imgHeight


			// Center the image
			const offsetX = (canvasWidth - drawWidth) / 2;
			const offsetY = (canvasHeight - drawHeight) / 2;

			ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
			setHasImageBeenDrawn(true)

			offsetRef.current = {
				x: offsetX,
				y: offsetY,
			}
		}
	}, [imageURL])

	useEffect(() => {
		// hooks run in sequence, that means when this hooks runs
		// the above hook has run and instantiated canvas2dCtxRef
		const ctx = canvas2dCtxRef.current

		if (ctx === null) {
			return
		}

		if (!hasImageBeenDrawn) {
			return
		}

		// hightlight fields in image
		fields.forEach(field => {
			if (field.content?.position?.length !== 4) {
				return
			}

			const { x: offsetX, y: offsetY } = offsetRef.current

			const [x1, y1, x2, y2] = field.content?.position
			const scaledX1 = offsetX + x1 * baseScaleRef.current
			const scaledY1 = offsetY + y1 * baseScaleRef.current
			const scaledX2 = offsetX + x2 * baseScaleRef.current
			const scaledY2 = offsetY + y2 * baseScaleRef.current

			ctx.beginPath()
			ctx.rect(scaledX1, scaledY1, Math.abs(scaledX2 - scaledX1), Math.abs(scaledY2 - scaledY1))
			ctx.fillStyle = 'rgba(255,0,0,0.3)'
			ctx.fill()
		})
	}, [fields, hasImageBeenDrawn])

	return (
		<canvas ref={ref} className="rounded-md h-full w-full"></canvas>
	)
}
