//

import PropTypes from 'prop-types';

/*
* Describe DateTime type
*/
export const dateTimeType = PropTypes.shape({
	date: PropTypes.string,
	time: PropTypes.string
});

/*
* Describe task tags
*/
// export const tagType = PropTypes.shape({
// 	id: PropTypes.number.isRequired,
// 	title: PropTypes.string.isRequired,
// });
// export const tagsType = PropTypes.arrayOf(tagType.isRequired);

// export const tagType = PropTypes.string.isRequired;
export const tagsType = PropTypes.arrayOf(PropTypes.string.isRequired);

/*
* Describe tasks
*/
export const taskType = PropTypes.shape({
	taskid: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	status: PropTypes.number.isRequired,
	starred: PropTypes.bool.isRequired,
	tags: tagsType.isRequired,
	repeat: PropTypes.number,
	interval: PropTypes.number,
	estimate: PropTypes.string,
	actual: PropTypes.string,
	start: dateTimeType,
	end: dateTimeType,
	priority: PropTypes.number
});

export const tasksType = PropTypes.arrayOf(taskType.isRequired);

/*
* Describe projects
*/
export const projectType = PropTypes.shape({
	projectid: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	status: PropTypes.number.isRequired,
	tasks: tasksType
});

export const projectsType = PropTypes.arrayOf(projectType.isRequired);

/*
* Describe goals
*/
export const goalType = PropTypes.shape({
	goalid: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	status: PropTypes.number.isRequired,
	projects: projectsType
});

export const goalsType = PropTypes.arrayOf(goalType.isRequired);

/*
* Describe tasksList
*/
export const taskListType = PropTypes.shape({
	goal: goalType.isRequired,
	project: projectType.isRequired,
	task: taskType.isRequired
});

export const tasksListType = PropTypes.arrayOf(taskListType.isRequired);

/*
* Describe Dnd object
*/

export const emptyType = PropTypes.shape({});

export const dragType = PropTypes.shape({
	type: PropTypes.number.isRequired,
	goalid: PropTypes.number.isRequired,
	projectid: PropTypes.number.isRequired,
	taskid: PropTypes.number.isRequired
});

export const overType = PropTypes.shape({
	counter: PropTypes.number.isRequired,
	type: PropTypes.number.isRequired,
	goalid: PropTypes.number.isRequired,
	projectid: PropTypes.number.isRequired,
	taskid: PropTypes.number.isRequired
});

export const dndType = PropTypes.shape({
	drag: dragType.isRequired,
	over: overType.isRequired
});

/*
* Describe events
*/
export const eventType = PropTypes.shape({
	goalId: PropTypes.number.isRequired,
	projectId: PropTypes.number.isRequired,
	taskId: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	allDay: PropTypes.bool.isRequired,

	task: taskType.isRequired,

	start: PropTypes.instanceOf(Date).isRequired,
	end: PropTypes.instanceOf(Date).isRequired
});

export const eventsType = PropTypes.arrayOf(eventType.isRequired);

/*
* Describe application types
*/
// export const matchType = PropTypes.shape({
// 	match: PropTypes.any
// });

export const matchType = PropTypes.shape({
	isExact: PropTypes.bool.isRequired,
	path: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	params: PropTypes.any.isRequired
});

/*
* Describe table headers
*/
export const tableHeaderType = PropTypes.shape({
	id: PropTypes.string.isRequired,
	numeric: PropTypes.bool.isRequired,
	disablePadding: PropTypes.bool.isRequired,
	label: PropTypes.string.isRequired
});

export const tableHeadersType = PropTypes.arrayOf(tableHeaderType.isRequired);

/*
* Describe users
*/
export const userType = PropTypes.shape({
	username: PropTypes.string.isRequired,
	role: PropTypes.string.isRequired,
	validated: PropTypes.bool.isRequired,
	reset: PropTypes.bool,
	resetValidated: PropTypes.bool,
	resetString: PropTypes.string,
	created: PropTypes.string.isRequired,
	accessed: PropTypes.string
});

export const usersType = PropTypes.arrayOf(userType.isRequired);

/*
export const emptyType = PropTypes.shape({});

export const dragType = PropTypes.shape({
	type: PropTypes.number.isRequired,
	obj: PropTypes.oneOfType([emptyType, goalType, projectType, taskType])
});

export const overType = PropTypes.shape({
	counter: PropTypes.number.isRequired,
	type: PropTypes.number.isRequired,
	obj: PropTypes.oneOfType([emptyType, goalType, projectType, taskType])
});
*/

/*
* Describe selected type
*/
// export const selectType = PropTypes.shape({
// 	selectedType: PropTypes.string.isRequired,
// 	selectedGoalId: PropTypes.number.isRequired,
// 	selectedProjectId: PropTypes.number.isRequired,
// 	selectedTaskId: PropTypes.number.isRequired
// });

/*
* Describe command type
*/
// export const commandType = PropTypes.shape({
// 	commandedType: PropTypes.string.isRequired
// });

/*
export const goalsType = PropTypes.arrayOf(
	PropTypes.shape({
		id: PropTypes.number.isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string,
		projects: PropTypes.any,
	}).isRequired,
);
*/

/*
GoalsLink.propTypes = {
	goals: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			title: PropTypes.string.isRequired,
			description: PropTypes.string,
			projects: PropTypes.any,
		}).isRequired,
	).isRequired,
};
*/

// export const goalType = {
// 	goal: PropTypes.shape({
// 		id: PropTypes.number.isRequired,
// 		title: PropTypes.string.isRequired,
// 	}).isRequired,
// };

// export const projectPropTypes = {
// 	project: PropTypes.shape({
// 		id: PropTypes.number.isRequired,
// 		title: PropTypes.string.isRequired,
// 		description: PropTypes.string,
// 	}).isRequired,
// };

// export const taskPropTypes = {
// 	task: PropTypes.shape({
// 		id: PropTypes.number.isRequired,
// 		title: PropTypes.string.isRequired,
// 		description: PropTypes.string,
// 	}).isRequired,
// };

// projects: PropTypes.arrayOf(PropTypes.object).isRequired,
