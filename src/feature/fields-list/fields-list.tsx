import { Field } from "@/components/field"
import { IField } from '@/types/field'

interface IProps {
	fields: IField[]
	removeField: (id: number) => void
}

export function FieldsList(props: IProps) {
	const { fields, removeField } = props
	return (
		<ul className="grid gap-2 py-2">
			{
				fields.map(field => {
					return (
						<Field field={field} key={field.id} removeField={removeField} />
					)
				})
			}
		</ul>
	)
}
