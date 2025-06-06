import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useMemo, useState } from "react";

interface IPreviewerContext {
	canvas: HTMLCanvasElement | null
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
	setCanvas: Dispatch<SetStateAction<IPreviewerContext['canvas']>>
	setCanvas2dCtx: Dispatch<SetStateAction<IPreviewerContext['canvas2dCtx']>>
	setInitialScale: Dispatch<SetStateAction<IPreviewerContext['initialScale']>>
	setHasImageBeenDrawn: Dispatch<SetStateAction<IPreviewerContext['hasImageBeenDrawn']>>
}

const PreviewerContext = createContext<IPreviewerContext | null>(null)

export function PreviewerContextProvider(props: { children: ReactNode }) {
	const { children } = props

	const [canvas, setCanvas] = useState<IPreviewerContext['canvas']>(null)
	const [canvas2dCtx, setCanvas2dCtx] = useState<IPreviewerContext['canvas2dCtx']>(null)
	const [offset, setOffset] = useState<IPreviewerContext['offset']>({ x: 0, y: 0 })
	const [scale, setScale] = useState<IPreviewerContext['scale']>(1)
	const [initialScale, setInitialScale] = useState<number>()
	const [hasImageBeenDrawn, setHasImageBeenDrawn] = useState(false)

	const value = useMemo(() => ({
		canvas2dCtx,
		offset,
		scale,
		canvas,
		initialScale,
		hasImageBeenDrawn,
		setScale,
		setOffset,
		setCanvas,
		setCanvas2dCtx,
		setInitialScale,
		setHasImageBeenDrawn
	}), [canvas2dCtx, offset, scale, canvas, initialScale, hasImageBeenDrawn])

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
