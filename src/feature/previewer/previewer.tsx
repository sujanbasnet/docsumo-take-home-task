"use client"

import { useEffect, useRef } from "react"

interface IProps {
	imageURL: string
}

export function Previewer(props: IProps) {
	const { imageURL } = props
	const ref = useRef<HTMLCanvasElement>(null)

	useEffect(() => {
		const canvas = ref.current
		if (canvas === null) {
			return
		}


		const ctx = canvas.getContext('2d')

		if (ctx === null) {
			alert('There was an error in the app. Please reload the page to try again.')
			return
		}

		const img = new Image();
		img.src = imageURL; // Replace with your image path or URL

		img.onload = function() {
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

			// Center the image
			const offsetX = (canvasWidth - drawWidth) / 2;
			const offsetY = (canvasHeight - drawHeight) / 2;

			ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
		};
	}, [imageURL])

	return (
		<canvas ref={ref} className="rounded-md h-full w-full"></canvas>
	)
}
