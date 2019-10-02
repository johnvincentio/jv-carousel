//

const priorityOptions = [
	{ id: 0, text: 'none', title: 'None' },
	{ id: 10, text: 'low', title: 'Low' },
	{ id: 20, text: 'medium', title: 'Medium' },
	{ id: 30, text: 'high', title: 'High' },
	{ id: 40, text: 'top', title: 'Top' }
];

/*
* Task Priority
*/
export function taskPriorityOptions() {
	return priorityOptions;
}

export function taskPriorityValue(id = 0) {
	return id;
}

export function taskPriorityOption(status) {
	switch (status) {
		case 10:
			return 'Low';
		case 20:
			return 'Medium';
		case 30:
			return 'High';
		case 40:
			return 'Top';
		case 0:
		default:
			return 'None';
	}
}

export function taskPriorityText(status) {
	switch (status) {
		case 'Low':
			return 10;
		case 'Medium':
			return 20;
		case 'High':
			return 30;
		case 'Top':
			return 40;
		case 'None':
		default:
			return 0;
	}
}

export function tasksListFromGoalsByPriority(param, goals) {
	// console.log('--- tasksListFromGoalsByPriority, param ', param);
	const option = priorityOptions.find(item => item.text === param);
	const arr = [];
	goals.forEach(goal => {
		goal.projects.forEach(project => {
			project.tasks.forEach(task => {
				if (task.priority && task.priority === option.id) {
					arr.push({ goal, project, task });
				}
			});
		});
	});
	return arr;
}
