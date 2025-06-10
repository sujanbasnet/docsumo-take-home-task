/**
 * Returns the initials of the given label
 * @param {string} label - The label to get the initials of
 */
export function getInitials(label: string) {
	return label.split(' ').map(word => word[0]).join('')
}

/**
 * Converts a hex color to rgba
 * @param {string} hex - The hex color to convert
 */
export function hexToRgba(hex: string, alpha = 1) {
	if (!hex) {
		console.warn("Hex color not provided");
		return null
	}

	// convert hex string to rgba
	// Remove the '#' if it exists
	hex = hex.replace("#", "");

	// Handle 3-digit hex codes
	if (hex.length === 3) {
		hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
	}

	// Parse the hex values
	const r = parseInt(hex.substring(0, 2), 16);
	const g = parseInt(hex.substring(2, 4), 16);
	const b = parseInt(hex.substring(4, 6), 16);

	// Return the rgba string
	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
