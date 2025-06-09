/**
 * Returns the initials of the given label
 * @param {string} label - The label to get the initials of
*/
export function getInitials(label: string) {
	return label.split(' ').map(word => word[0]).join('')
}
