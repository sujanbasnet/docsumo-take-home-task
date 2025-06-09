import { BBox } from "@/feature/bbox"
import { getInitials } from "@/lib/util"
import { IField } from "@/types/field"
import { Checkbox, } from "@mui/material"
import { useState } from "react"
import { EllipsisMenu } from "@/components/menu"

interface IProps {
	field: IField
	removeField: (id: number) => void
}

export function Field(props: IProps) {
	const { field: { label, content, id }, removeField } = props
	const [isChecked, setIsChecked] = useState(true)
	return (
		<>
			<fieldset className="rounded-md p-2.5 flex bg-gray-100">
				<div className="flex-grow flex items-start gap-2">
					<div className="rounded-sm flex overflow-hidden">
						<div className="w-1 bg-red-500 items-stretch"></div>
						<div className="px-2 bg-red-300 py-1">{getInitials(label)}</div>
					</div>
					<div className="flex flex-col gap-2 pt-1">
						<legend className="text-sm">{label}</legend>
						<span className="text-xs">{content?.value}</span>

					</div>
				</div>
				<div className="flex gap-2.5">
					<Checkbox name={label} checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} className="!p-0 !inline" />
					<EllipsisMenu options={[
						{ label: 'Remove', action: () => removeField(id) }
					]} />
					{
						isChecked && (
							<BBox position={content?.position} id={id} isShow={isChecked} />
						)
					}
				</div>
			</fieldset>
		</>
	)
}
