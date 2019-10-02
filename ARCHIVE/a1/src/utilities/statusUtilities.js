
/*
* Goal and Project status
*/

const statusOptions = [
	{ id: 0, text: 'active', title: 'Active' },
	{ id: 10, text: 'completed', title: 'Completed' },
	{ id: 20, text: 'planning', title: 'Planning' },
	{ id: 30, text: 'waiting', title: 'Waiting' },
	{ id: 40, text: 'hold', title: 'Hold' },
	{ id: 50, text: 'canceled', title: 'Canceled' },
	{ id: 60, text: 'someday', title: 'Someday' },
	{ id: 70, text: 'reference', title: 'Reference' },
];

export function getStatusOptions() {
	return statusOptions;
}

export function getStatusOption(id) {
	const num = id * 1;
	// console.log('---getStatusOption, id ', num);
	const option = statusOptions.find(item => item.id === num);
	// console.log('getStatusOption, option ', option);
	return option.title;
}

export function getStatusText(title) {
	// console.log('---getStatusText, title ', title);
	const option = statusOptions.find(item => item.title === title);
	// console.log('getStatusText, option ', option);
	return option.id;
}
