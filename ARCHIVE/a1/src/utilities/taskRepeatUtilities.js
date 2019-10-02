const repeatOptions = [
	{ id: 0, text: 'none', title: 'None' },
	{ id: 50, text: 'daily', title: 'Daily' },
	{ id: 100, text: 'weekly', title: 'Weekly' },
	{ id: 200, text: 'monthly', title: 'Monthly' },
	{ id: 300, text: 'quarterly', title: 'Quarterly' },
	{ id: 400, text: 'yearly', title: 'Yearly' }
];

/*
* Task Repeat
*/
export function taskRepeatOptions() {
	return repeatOptions;
}

export function taskRepeatValue(id = 0) {
	return id;
}

export function taskRepeatOption(status) {
	switch (status) {
		case 50:
			return 'Daily';
		case 100:
			return 'Weekly';
		case 200:
			return 'Monthly';
		case 300:
			return 'Quarterly';
		case 400:
			return 'Yearly';
		case 0:
		default:
			return 'None';
	}
}

export function taskRepeatText(status) {
	switch (status) {
		case 'Daily':
			return 50;
		case 'Weekly':
			return 100;
		case 'Monthly':
			return 200;
		case 'Quarterly':
			return 300;
		case 'Yearly':
			return 400;
		case 'None':
		default:
			return 0;
	}
}
