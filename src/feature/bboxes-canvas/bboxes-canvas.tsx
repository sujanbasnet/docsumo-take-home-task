import { usePreviewerContext } from "@/context/previewer-context"
import { useEffect } from "react"

export function BBoxesCanvas() {
	const { bboxCanvas: canvas, setBBoxCanvas, setCanvas2dCtx, canvas2dCtx } = usePreviewerContext()

	useEffect(() => {
		if (canvas === null) {
			console.warn('BBox canvas is not set.')
			return
		}

		// set canvas width and height to rendered canvas widht and height
		canvas.width = canvas.clientWidth;
		canvas.height = canvas.clientHeight;

		setCanvas2dCtx(canvas.getContext('2d'))
	}, [canvas, setCanvas2dCtx])

	useEffect(() => {
		if (canvas === null) {
			return
		}

		if (canvas2dCtx === null) {
			console.warn("Canvas 2d context is null.")
			return
		}

		canvas2dCtx.clearRect(0, 0, canvas.width, canvas.height)
	}, [canvas, canvas2dCtx])

	return (
		<canvas ref={node => setBBoxCanvas(node)} className="h-full w-full"></canvas>
	)
}
