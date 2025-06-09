import { Tabs } from "@/components/tabs"
import { ITab } from "@/types/tabs"

export function Fields() {
	const tabs: ITab[] = [
		{
			label: 'Regular Fields',
			content: null
		}
	]

	return (
		<div>
			<p className="dark:text-white">Fields</p>
			<Tabs tabs={tabs} />
		</div>
	)
}
