'use client'

import { ITab } from "@/types/tabs"
import { useState } from "react"

interface IProps {
	tabs: ITab[]
}

export function Tabs(props: IProps) {
	const { tabs } = props
	const [activeTab, setActiveTab] = useState(tabs[0])

	return (
		<nav>
			<ul>

				{
					tabs.map(tab => {
						return <li key={tab.label}><a onClick={(e) => {
							e.preventDefault(); setActiveTab(tab)
						}}>{tab.label}</a>{tab.label}</li>
					})
				}
			</ul>

			<div>
				{
					activeTab.content
				}
			</div>
		</nav>
	)
}
