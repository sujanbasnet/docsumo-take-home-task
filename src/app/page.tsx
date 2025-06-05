import { Sidebar } from "@/components/sidebar";
import { FieldsList } from "@/feature/fields-list";
import { Previewer } from "@/feature/previewer";

export default function Root() {
	return (
		<main className="grid grid-cols-[1fr_400px] gap-4 h-full">
			<div className="p-2 bg-gray-50">
				<Previewer imageURL="/document.jpg" />
			</div>
			<Sidebar><FieldsList /></Sidebar>
		</main>
	)
}
