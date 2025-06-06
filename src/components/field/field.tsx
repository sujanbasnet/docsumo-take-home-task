import { BBox } from "@/feature/bbox"
import { IField } from "@/types/field"
import { useState } from "react"

interface IProps {
	field: IField
}

export function Field(props: IProps) {
	const { field: { label, content, id } } = props
	const [isChecked, setIsChecked] = useState(true)
	return (
		<>
			<fieldset>
				<legend>{label}</legend>
				<span>{content?.value}</span>
				<input type="checkbox" name={label} checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
			</fieldset>
			{
				isChecked && (
					<BBox position={content?.position} id={id} isShow={isChecked} />
				)
			}
		</>
	)
}
