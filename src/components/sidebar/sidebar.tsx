interface IProps extends React.ComponentProps<'aside'> {
	children: React.ReactNode
}

export function Sidebar(props: IProps) {
	const { children, ...otherProps } = props

	return (
		<aside {...otherProps}>
			{children}
		</aside >
	)
}
