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
	const imageRef = useRef<HTMLImageElement>(null)

	const [hasImageLoaded, setHasImageLoaded] = useState(false)
	const [hasImageBeenDrawn, setHasImageBeenDrawn] = useState(false)
	const [scale, setScale] = useState<1 | 1.75 | 2>(1)

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

	}, [])

	useEffect(() => {
		imageRef.current = new Image();
		imageRef.current.src = imageURL;

		imageRef.current.onload = () => {
			setHasImageLoaded(true)
		}
	}, [imageURL,])

	useEffect(() => {
		const canvas = ref.current
		if (canvas === null) {
			return
		}

		if (canvas2dCtxRef.current === null) {
			console.warn("Canvas 2d context is null.")
			return
		}

		canvas2dCtxRef.current?.clearRect(0, 0, canvas.width, canvas.height)
	}, [])

	useEffect(() => {
		const image = imageRef.current

		if (image === null) {
			console.warn("Image is null.")
			return
		}

		if (!hasImageLoaded) {
			console.warn("Image has not loaded yet.")
			return
		}

		const canvas = ref.current
		if (canvas === null) {
			return
		}

		const ctx = canvas2dCtxRef.current

		// set canvas width and height to rendered canvas widht and height
		const canvasWidth = canvas.width = canvas.clientWidth;
		const canvasHeight = canvas.height = canvas.clientHeight;

		const imgWidth = image.width;
		const imgHeight = image.height;

		let drawWidth = imgWidth
		let drawHeight = imgHeight

		// if image is wider than canvas, resize the image width
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

		ctx.save()
		ctx.translate(canvasWidth / 2, canvasHeight / 2)
		ctx.scale(scale, scale)
		ctx.translate(-canvasWidth / 2, -canvasHeight / 2)

		ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight)
		ctx.restore()
		setHasImageBeenDrawn(true)

		offsetRef.current = {
			x: offsetX,
			y: offsetY,
		}


	}, [scale, hasImageLoaded])

	useEffect(() => {
		const ctx = canvas2dCtxRef.current
		const canvasWidth = ref.current.width
		const canvasHeight = ref.current.height

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

			ctx.save()
			ctx.translate(canvasWidth / 2, canvasHeight / 2)
			ctx.scale(scale, scale)
			ctx.translate(-canvasWidth / 2, -canvasHeight / 2)
			ctx.beginPath()
			ctx.rect(scaledX1, scaledY1, Math.abs(scaledX2 - scaledX1), Math.abs(scaledY2 - scaledY1))
			ctx.fillStyle = 'rgba(0,255,0,0.3)'
			ctx.fill()

			ctx.restore()
		})
	}, [fields, hasImageBeenDrawn, scale])

	return (
		<div className="h-full w-full relative rounded-md">
			<canvas ref={ref} className="h-full w-full"></canvas>
			<div className="absolute bottom-5 right-5 flex flex-col bg-black rounded-full overflow-hidden text-2xl font-bold border-gray">
				<button className="px-2.5 py-0.5 cursor-pointer" onClick={() => {
					setScale(prevScale => prevScale === 1 ? 1.75 : prevScale === 1.75 ? 2 : prevScale)
				}}>+</button>
				<button className="px-2.5 py-0.5 cursor-pointer" onClick={() => {
					setScale(prevScale => prevScale === 2 ? 1.75 : prevScale === 1.75 ? 1 : prevScale)
				}}>-</button>
			</div>
		</div>
	)
}
