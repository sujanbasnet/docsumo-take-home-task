"use client"

import { usePreviewerContext } from "@/context/previewer-context"
import { ImageCanvas } from "../image-canvas"
import { BBoxesCanvas } from "../bboxes-canvas"

export function Previewer() {
	const {
		setScale,
	} = usePreviewerContext()

	return (
		<div className="h-full w-full relative rounded-md">
			<div className="grid grid-rows-1 grid-cols-1 h-full">
				<div className="row-start-1 col-start-1">

					<ImageCanvas imageURL="/document.jpg" />
				</div>
				<div className="row-start-1 col-start-1" >
					<BBoxesCanvas />
				</div>
			</div>
			<div className="absolute bottom-5 right-5 flex flex-col bg-black rounded-full overflow-hidden text-2xl font-bold border-gray">
				<button className="px-2.5 py-0.5 cursor-pointer bg-gray-400 dark:bg-black dark:text-white" onClick={() => {
					setScale(prevScale => prevScale === 1 ? 1.75 : prevScale === 1.75 ? 2 : prevScale)
				}}>+</button>
				<button className="px-2.5 py-0.5 cursor-pointer bg-gray-400 dark:bg-black dark:text-white" onClick={() => {
					setScale(prevScale => prevScale === 2 ? 1.75 : prevScale === 1.75 ? 1 : prevScale)
				}}>-</button>
			</div>
		</div>
	)
}
