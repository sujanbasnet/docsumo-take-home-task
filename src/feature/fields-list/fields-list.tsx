import { Field } from "@/components/field"
import { IField } from '@/types/field'

interface IProps {
	fields: IField[]
	removeField: (id: number) => void
	selectField: (id: number) => void
	deselectField: (id: number) => void
}

export function FieldsList(props: IProps) {
	const { fields, removeField, selectField, deselectField } = props
	return (
		<ul className="grid gap-2 py-2 h-full overflow-y-auto">
			{
				fields.map(field => {
					return (
						<Field field={field} key={field.id} removeField={removeField} selectField={selectField} deselectField={deselectField} />
					)
				})
			}
		</ul>
	)
}
