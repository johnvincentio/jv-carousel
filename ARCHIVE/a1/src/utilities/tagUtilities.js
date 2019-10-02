import * as tasksUtilities from './taskUtilities';

export function uniqueTagsFromGoals(goals) {
	const arr = [];
	goals.forEach(goal => {
		goal.projects.forEach(project => {
			project.tasks.forEach(task => {
				task.tags.forEach(tag => {
					// console.log('uniqueTagsFromGoals, tag ', tag, ' arr ', arr);
					if (arr.findIndex(item => item.toLowerCase() === tag.toLowerCase()) === -1) {
						arr.push(tag);
					}
				});
			});
		});
	});
	return arr.sort();
}

export function tagsListFromGoals(goals) {
	const arr = [];
	goals.forEach(goal => {
		goal.projects.forEach(project => {
			project.tasks.forEach(task => {
				// console.log('tagsListFromGoals, task.tags.length ', task.tags.length);
				if (task.tags.length > 0) {
					arr.push({ goal, project, task });
				}
			});
		});
	});
	return arr;
}

export function tagsListFromGoalsByTag(tag, goals) {
	// console.log('tagsListFromGoalsByTag, tag ', tag);
	const arr = [];
	goals.forEach(goal => {
		goal.projects.forEach(project => {
			project.tasks.forEach(task => {
				if (task.tags.length > 0) {
					if (!tag || task.tags.find(item => item === tag)) {
						arr.push({ goal, project, task });
					}
				}
			});
		});
	});
	return arr;
}

export function dataFromGoalsByTag(tag, goals) {
	// console.log('dataFromGoalsByTag, tag ', tag);
	const data = goals.filter(goal => {
		// console.log('goal ', goal);
		goal.projects = goal.projects.filter(project => {
			// eslint-disable-line no-param-reassign
			// console.log('project ', project);
			project.tasks = project.tasks.filter(task => {
				// eslint-disable-line no-param-reassign
				// console.log('task ', task);
				if (task.tags.length > 0) {
					if (!tag || task.tags.find(item => item === tag)) {
						return true;
					}
				}
				return false;
			});
			return project.tasks.length > 0;
		});
		return goal.projects.length > 0;
	});
	return data;
}

export function createTagList(tags) {
	// console.log('>>> createTagList, tags ', tags);
	const arr = [];
	tags.forEach(tag => {
		arr.push({ id: tag, text: tag });
	});
	// console.log('<<< createTagList; arr ', arr);
	return arr;
}

export function createTagSuggestionsList(tags, goals) {
	// console.log('>>> createTagSuggestionsList, tags ', tags, ' goals ', goals);
	const allTags = uniqueTagsFromGoals(goals);
	const arr = [];
	allTags.forEach(tag => {
		if (tags.findIndex(item => item.text.toLowerCase() === tag.toLowerCase()) === -1) {
			arr.push(tag);
		}
	});
	// console.log('<<< createTagSuggestionsList; arr ', arr);
	return arr;
}

export function addTagToTask(goalId, projectId, taskId, tag, goals) {
	// console.log('addTagToTask, goalId ', goalId, ' projectId ', projectId, ' taskId ', taskId, ' tag ', tag);
	const task = tasksUtilities.taskFromGoalsById(goalId, projectId, taskId, goals);
	// console.log('task ', task);
	task.tags.push(tag);
	return goals;
}

export function deleteTagFromTask(goalId, projectId, taskId, index, goals) {
	const task = tasksUtilities.taskFromGoalsById(goalId, projectId, taskId, goals);
	// console.log('task (1) ', task);
	task.tags.splice(index, 1);
	// console.log('task (2) ', task);
	return goals;
}

export function moveTagInTask(goalId, projectId, taskId, tag, currPos, newPos, goals) {
	const task = tasksUtilities.taskFromGoalsById(goalId, projectId, taskId, goals);
	// console.log('task (1) ', task);
	task.tags.splice(currPos, 1);
	task.tags.splice(newPos, 0, tag);
	// console.log('task (2) ', task);
	return goals;
}
