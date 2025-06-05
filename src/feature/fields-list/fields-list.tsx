import { Field } from "@/components/field"
import { IField } from '@/types/field'

interface IProps {
	fields: IField[]
}

export function FieldsList(props: IProps) {
	const { fields } = props
	return (
		<ul>
			{
				fields.map(field => {
					return (
						<Field field={field} key={field.id} />
					)
				})
			}
		</ul>
	)
}
