export default function convertNameToInitials(name: string): string {
	const parts = name.split(' ');
	if (parts.length === 1) return parts[0].slice(0, 2).toLocaleUpperCase();
	return parts[0][0].toLocaleUpperCase() + parts[1][0].toLocaleUpperCase();
}
