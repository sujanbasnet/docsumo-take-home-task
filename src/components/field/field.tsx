import { IField } from "@/types/field"

interface IProps {
	field: IField
	input: React.HTMLAttributes<HTMLInputElement> & { type: 'checkbox' }
}

export function Field(props: IProps) {
	const { field: { label, content } } = props
	return (
		<fieldset>
			<legend>{label}</legend>
			<span>{content?.value}</span>
			<input type="checkbox" name="" />
		</fieldset>
	)
}
