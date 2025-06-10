import { BBox } from "@/feature/bbox"
import { getInitials } from "@/lib/util"
import { IField } from "@/types/field"
import { Checkbox, } from "@mui/material"
import { EllipsisMenu } from "@/components/menu"
import { useState } from "react"
import { useTheme } from "@/context/theme-context"

interface IProps {
	field: IField
	removeField: (id: number) => void
	selectField: (id: number) => void
	deselectField: (id: number) => void
}

export function Field(props: IProps) {
	const { field: { label, content, id, isChecked, color }, removeField, selectField, deselectField } = props

	const [isHovering, setIsHovering] = useState(false)
	const { theme } = useTheme()

	const isShowBox = isChecked || isHovering

	return (
		<>
			<fieldset className={`rounded-md p-2.5 flex bg-gray-100 dark:bg-gray-800 dark:text-white ${isHovering ? 'outline -outline-offset-2' : ''}`} onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)}>
				<div className="flex-grow flex items-start gap-2">
					<div className="rounded-sm flex overflow-hidden bg-[var(--fill)]" style={{ ['--fill' as string]: color }}>
						<div className="w-1 items-stretch"></div>
						<div className="px-2 py-1 relative text-white bg-black/30 font-bold">{getInitials(label)}</div>
					</div>
					<div className="flex flex-col gap-2 pt-1">
						<legend className="text-sm">{label}</legend>
						<span className="text-xs">{content?.value}</span>

					</div>
				</div>
				<div className="flex gap-2.5">
					<Checkbox name={label} checked={isChecked} onChange={(e) => e.target.checked ? selectField(id) : deselectField(id)} className="!p-0 !inline"
						sx={{
							color: theme === 'light' ? undefined : 'white',
						}}
					/>
					<EllipsisMenu options={[
						{ label: 'Remove', action: () => removeField(id) }
					]} />
				</div>
			</fieldset>
			<BBox position={content?.position} id={id} color={color} showBox={isShowBox} setIsHovering={setIsHovering} />
		</>
	)
}
