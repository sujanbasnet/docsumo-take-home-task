import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useMemo, useState } from "react";

interface IPreviewerContext {
	imageCanvas: HTMLCanvasElement | null
	bboxCanvas: HTMLCanvasElement | null
	canvas2dCtx: CanvasRenderingContext2D | null
	offset: {
		x: number,
		y: number
	}
	scale: 1 | 1.75 | 2
	initialScale: number | undefined
	hasImageBeenDrawn: boolean
	setScale: Dispatch<SetStateAction<IPreviewerContext['scale']>>
	setOffset: Dispatch<SetStateAction<IPreviewerContext['offset']>>
	setImageCanvas: Dispatch<SetStateAction<IPreviewerContext['imageCanvas']>>
	setBBoxCanvas: Dispatch<SetStateAction<IPreviewerContext['bboxCanvas']>>
	setCanvas2dCtx: Dispatch<SetStateAction<IPreviewerContext['canvas2dCtx']>>
	setInitialScale: Dispatch<SetStateAction<IPreviewerContext['initialScale']>>
	setHasImageBeenDrawn: Dispatch<SetStateAction<IPreviewerContext['hasImageBeenDrawn']>>
}

const PreviewerContext = createContext<IPreviewerContext | null>(null)

export function PreviewerContextProvider(props: { children: ReactNode }) {
	const { children } = props

	const [imageCanvas, setImageCanvas] = useState<IPreviewerContext['imageCanvas']>(null)
	const [bboxCanvas, setBBoxCanvas] = useState<IPreviewerContext['bboxCanvas']>(null)
	const [canvas2dCtx, setCanvas2dCtx] = useState<IPreviewerContext['canvas2dCtx']>(null)
	const [offset, setOffset] = useState<IPreviewerContext['offset']>({ x: 0, y: 0 })
	const [scale, setScale] = useState<IPreviewerContext['scale']>(1)
	const [initialScale, setInitialScale] = useState<number>()
	const [hasImageBeenDrawn, setHasImageBeenDrawn] = useState(false)

	useEffect(() => {
		function wheelEventHandler(e: WheelEvent) {
			if (e.deltaY > 0) {
				setScale(scale => scale === 1 ? 1.75 : 2)
			} else {
				setScale(scale => scale === 2 ? 1.75 : 1)
			}
		}

		window.addEventListener('wheel', wheelEventHandler)

		return () => {
			window.removeEventListener('wheel', wheelEventHandler)
		}
	}, [])

	const value = useMemo(() => ({
		canvas2dCtx,
		offset,
		scale,
		imageCanvas,
		bboxCanvas,
		initialScale,
		hasImageBeenDrawn,
		setScale,
		setOffset,
		setImageCanvas,
		setCanvas2dCtx,
		setInitialScale,
		setHasImageBeenDrawn,
		setBBoxCanvas
	}), [canvas2dCtx, offset, scale, imageCanvas, bboxCanvas, initialScale, hasImageBeenDrawn])

	return (
		<PreviewerContext value={value}>
			{children}
		</PreviewerContext>
	)
}

export function usePreviewerContext() {
	const previewerContext = useContext(PreviewerContext)
	if (previewerContext === null) {
		throw new Error('usePreviewerContext must be used within a PreviewerContextProvider')
	}

	return previewerContext
}
