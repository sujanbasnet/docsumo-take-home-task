"use client"

import { usePreviewerContext } from "@/context/previewer-context"
import { useEffect } from "react"

export function Previewer() {
	const {
		canvas2dCtx,
		canvas,
		setScale,
		setCanvas,
		setCanvas2dCtx,
	} = usePreviewerContext()

	useEffect(() => {
		if (canvas === null) {
			return
		}

		const ctx = canvas.getContext('2d')

		if (ctx === null) {
			alert('There was an error in the app. Please reload the page to try again.')
			return
		}

		setCanvas2dCtx(ctx)
	}, [canvas])

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
		<div className="h-full w-full relative rounded-md">
			<canvas ref={(node) => {
				setCanvas(node)
			}} className="h-full w-full"></canvas>
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
