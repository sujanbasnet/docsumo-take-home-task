import { usePreviewerContext } from "@/context/previewer-context";
import { useEffect, useRef, useState } from "react";

interface IProps {
	imageURL: string
}

export function ImagePreview(props: IProps) {
	const { imageURL } = props

	const { setHasImageBeenDrawn, canvas, canvas2dCtx, scale, setInitialScale, setOffset } = usePreviewerContext()

	const imageRef = useRef<HTMLImageElement>(null)
	const [hasImageLoaded, setHasImageLoaded] = useState(false)

	useEffect(() => {
		imageRef.current = new Image();
		imageRef.current.src = imageURL;

		imageRef.current.onload = () => {
			setHasImageLoaded(true)
		}
	}, [imageURL])

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

		if (canvas === null) {
			console.warn("Canvas is null.")
			return
		}

		if (canvas2dCtx === null) {
			console.warn("Canvas 2d context is null.")
			return
		}

		const ctx = canvas2dCtx

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

		setInitialScale(drawHeight / imgHeight)


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

		setOffset({
			x: offsetX,
			y: offsetY,
		})
	}, [scale, hasImageLoaded, canvas, canvas2dCtx])

	return (
		<canvas ref={(node) => {
			setCanvas(node)
		}} className="h-full w-full"></canvas>
	)

}
