import SECTIONS_JSON from '@/data/sections.json'
import { Field } from "@/components/field"

export function FieldsList() {
	const sections = SECTIONS_JSON.data.sections[0].children
	return (
		<ul>
			{
				sections.map(section => {
					return (
						<Field field={section} key={section.id} />
					)
				})
			}
		</ul>
	)
}
