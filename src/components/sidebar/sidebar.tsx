interface IProps {
	children: React.ReactNode
}

export function Sidebar(props: IProps) {
	const { children } = props

	return (
		<aside>
			{children}
		</aside>
	)
}
