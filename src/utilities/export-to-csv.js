export default function csvExport (array) {
	const csvContent = "data:text/csv;charset=utf-8," + array.map(e => e.join(",")).join("\n");

	let encodedUri = encodeURI(csvContent);
	window.open(encodedUri);
}
