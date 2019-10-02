//

import * as datesUtilities from './datesUtilities';

export function isValidTaskKey(key) {
	const keys = [
		'taskid',
		'title',
		'description',
		'status',
		'starred',
		'tags',
		'repeat',
		'interval',
		'estimate',
		'actual',
		'start',
		'end',
		'priority'
	];
	return keys.find(item => item === key);
}

export function transformTaskForAddUpdate(task) {
	// console.log('>>> transformTaskForAddUpdate; task ', task);
	const newItem = {};
	Object.keys(task).forEach(key => {
		if (this.isValidTaskKey(key)) {
			const value = task[key];
			// console.log('key ', key, ' value ', value);
			if (value !== undefined && value !== '') {
				newItem[key] = value;
			}
		}
	});
	// console.log('<<< transformTaskForAddUpdate; newItem ', newItem);
	return newItem;
}

/*
* Task methods
*/
export function tasksFromGoalsById(goalId, projectId, goals) {
	const goal = goals.find(item => item.id === goalId);
	const project = goal.projects.find(item => item.id === projectId);
	return project.tasks;
}

export function taskFromGoalsById(goalId, projectId, taskId, goals) {
	const tasks = tasksFromGoalsById(goalId, projectId, goals);
	return tasks.find(item => item.id === taskId);
}

export function tasksFromGoals(goals) {
	const arr = [];
	goals.forEach(goal => {
		goal.projects.forEach(project => {
			arr.push(...project.tasks);
		});
	});
	return arr;
}

export function tasksListFromGoalsByParam(param, goals) {
	// console.log('--- tasksListFromGoalsByParam, param ', param);
	const arr = [];
	goals.forEach(goal => {
		goal.projects.forEach(project => {
			project.tasks.forEach(task => {
				switch (param) {
					case 'scheduled':
						if (datesUtilities.isScheduled(task)) {
							arr.push({ goal, project, task });
						}
						break;
					case 'events':
						if (datesUtilities.isEvent(task)) {
							arr.push({ goal, project, task });
						}
						break;
					case 'late':
						if (datesUtilities.isLate(task)) {
							arr.push({ goal, project, task });
						}
						break;
					default:
						arr.push({ goal, project, task });
				}
			});
		});
	});
	return arr;
}

export function tasksListFromGoalProject(goal, project) {
	// console.log('--- tasksListFromGoalProject, goal ', goal, ' project ', project);
	const arr = [];
	project.tasks.forEach(task => {
		arr.push({ goal, project, task });
	});
	// console.log('--- tasksListFromGoalProject, arr ', arr);
	return arr;
}

export function tasksListFromAllGoals(goals) {
	// console.log('--- tasksListFromAllGoals');
	const arr = [];
	goals.forEach(goal => {
		goal.projects.forEach(project => {
			project.tasks.forEach(task => {
				arr.push({ goal, project, task });
			});
		});
	});
	// console.log('--- tasksListFromAllGoals, arr ', arr);
	return arr;
}

export function tasksListFromGoalByGoal(goal) {
	// console.log('--- tasksListFromGoalByGoal');
	const arr = [];
	goal.projects.forEach(project => {
		project.tasks.forEach(task => {
			arr.push({ goal, project, task });
		});
	});

	// console.log('--- tasksListFromGoalByGoal, arr ', arr);
	return arr;
}

export function starredTasksListFromGoals(goals) {
	// console.log('--- starredTasksListFromGoals, goals ', goals);
	const arr = [];
	goals.forEach(goal => {
		goal.projects.forEach(project => {
			project.tasks.forEach(task => {
				if (task.starred) {
					arr.push({ goal, project, task });
				}
			});
		});
	});
	return arr;
}

export function dataFromGoalsByTaskId(param, goals) {
	const taskId = param * 1;
	// console.log('--- dataFromGoalsByTaskId, taskId ', taskId, ' goals ', goals);
	const data = goals.filter(goal => {
		// console.log('goal ', goal);
		// prettier-ignore
		goal.projects = goal.projects.filter(project => {	// eslint-disable-line no-param-reassign
			// console.log('project ', project);
			// prettier-ignore
			project.tasks = project.tasks.filter(	// eslint-disable-line no-param-reassign
				task => task.taskid === taskId
			);
			return project.tasks.length > 0;
		});
		return goal.projects.length > 0;
	});
	return data;
}

// export function dataFromGoalsByStatus(param, goals) {
// 	// console.log('--- dataFromGoalsByStatus, param ', param);
// 	const data = goals.filter(goal => {
// 		// console.log('goal ', goal);

// 		// prettier-ignore
// 		goal.projects = goal.projects.filter(project => {	// eslint-disable-line no-param-reassign
// 			// console.log('project ', project);
// 			// prettier-ignore
// 			project.tasks = project.tasks.filter(task => {	// eslint-disable-line no-param-reassign
// 				// console.log('task ', task);
// 				switch (param) {
// 					case 'scheduled':
// 						return datesUtilities.isScheduled(task);
// 					case 'events':
// 						return datesUtilities.isEvent(task);
// 					case 'late':
// 						return datesUtilities.isLate(task);
// 					default:
// 						return true;
// 				}
// 			});
// 			return project.tasks.length > 0;
// 		});
// 		return goal.projects.length > 0;
// 	});
// 	return data;
// }
