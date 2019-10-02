//

const statusOptions = [
	{ id: 0, text: 'none', title: 'None' },
	{ id: 50, text: 'started', title: 'Started' },
	{ id: 1000, text: 'completed', title: 'Completed' },
	{ id: 60, text: 'planning', title: 'Planning' },
	{ id: 70, text: 'waiting', title: 'Waiting' },
	{ id: 80, text: 'hold', title: 'Hold' },
	// { id: 90, text: 'postponed', title: 'Postponed' },
	// { id: 110, text: 'canceled', title: 'Canceled' },
	{ id: 120, text: 'someday', title: 'Someday' },
	{ id: 130, text: 'reference', title: 'Reference' },
	{ id: 2000, text: 'skip', title: 'Skip' }
];

export function getTaskStatusOptions() {
	return statusOptions;
}

/*
* Task status
*/
// export function taskStatusOptions() {
// 	return [...statusOptions, { id: 2000, text: 'skip', title: 'Skip' }];
// }

export function taskStatusOption(id) {
	// console.log('---taskStatusOption, id ', id);
	const option = statusOptions.find(item => item.id === id);
	// console.log('taskStatusOption, option ', option);
	return option.title;
}

/*
* include if
* param = 'all' or
* (task.status != defined && param = 'none') or
* task.status === option.id
*/
export function tasksListFromGoalsByStatus(param, goals) {
	// console.log('--- tasksListFromGoalsByStatus, param ', param);
	const option = statusOptions.find(item => item.text === param);
	const arr = [];
	goals.forEach(goal => {
		goal.projects.forEach(project => {
			project.tasks.forEach(task => {
				if (param === 'all' || (!task.status && param === 'none') || task.status === option.id) {
					arr.push({ goal, project, task });
				}
			});
		});
	});
	return arr;
}

// export function dataFromGoalsByStatus(param, goals) {
// 	const option = statusOptions.find(item => item.text === param);
// 	const data = goals.filter(goal => {
// 		goal.projects = goal.projects.filter(project => {
// 			project.tasks = project.tasks.filter(task => {
// 				if (param === 'all' || (!task.status && param === 'none') || task.status === option.id) {
// 					return true;
// 				}
// 				return false;
// 			});
// 			return project.tasks.length > 0;
// 		});
// 		return goal.projects.length > 0;
// 	});
// 	return data;
// }
