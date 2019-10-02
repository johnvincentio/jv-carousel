//

import Moment from 'moment';

import * as datesUtilities from './datesUtilities';

export function createObjectToDateObject(obj) {
	// console.log('>>> createObjectToDateObject; obj ', obj);
	if (!obj || !obj.date) {
		return null;
	}

	let date = null;
	if (obj.time) {
		const dateTime = `${obj.date} ${obj.time}`;
		// console.log('createObjectToDateObject, dateTime ', dateTime);
		const moment = Moment(dateTime, 'YYYY-MM-DD HH:mm');
		// console.log('createObjectToDateObject, dateTime moment ', moment);
		const year = moment.year();
		const month = moment.month();
		const day = moment.date();
		const hours = moment.hours();
		const minutes = moment.minutes();
		date = new Date(year, month, day, hours, minutes);
	} else {
		const dateTime = `${obj.date}`;
		// console.log('createObjectToDateObject, dateTime ', dateTime);
		const moment = Moment(dateTime, 'YYYY-MM-DD');
		// console.log('createObjectToDateObject, time moment ', moment);
		const year = moment.year();
		const month = moment.month();
		const day = moment.date() + 1;
		date = new Date(year, month, day);
		// date = new Date(moment.format('YYYY-MM-DD'));
	}
	// console.log('<<< createObjectToDateObject; date ', date);
	return date;
}

function createEvent(goal, project, task) {
	// console.log('createEvent, task ', task);
	const start = createObjectToDateObject(task.start);
	const end = createObjectToDateObject(task.end);
	// console.log('createEvent, start ', start, ' end ', end);
	const event = {
		goalId: goal.goalid,
		projectId: project.projectid,
		taskId: task.taskid,
		title: task.title,
		allDay: false,
		description: task.description,
		task
	};
	if ('start' in task && !('end' in task)) {
		event.allDay = true;
	}
	event.start = start === null ? end : start;
	event.end = end === null ? start : end;
	// console.log('createEvent, event ', event);
	return event;
}

/*
* Create the events for the Calendar component
*/
export function eventsListFromGoals(param, goals) {
	// console.log('--- eventsListFromGoals, param ', param);
	const arr = [];
	goals.forEach(goal => {
		goal.projects.forEach(project => {
			project.tasks.forEach(task => {
				switch (param) {
					case 'scheduled':
						if (datesUtilities.isScheduled(task)) {
							arr.push(createEvent(goal, project, task));
						}
						break;
					case 'events':
						if (datesUtilities.isEvent(task)) {
							arr.push(createEvent(goal, project, task));
						}
						break;
					case 'all':
					default:
						if (datesUtilities.isScheduled(task) || datesUtilities.isEvent(task)) {
							arr.push(createEvent(goal, project, task));
						}
						break;
				}
			});
		});
	});
	return arr;
}

/*
* Handle date change from an event drop
*/

export function transformCalendarDropEvent(dropEvent, ending) {
	// console.log('>>> transformCalendarDropEvent, dropEvent ', dropEvent);
	if (!dropEvent) {
		return null;
	}
	let obj = {};
	const time = Moment(dropEvent).format('HH:mm');

	if (time === '00:00') {
		if (ending) {
			const date = Moment(dropEvent)
				.subtract(1, 'days')
				.format('YYYY-MM-DD');
			obj = { date };
		} else {
			const date = Moment(dropEvent).format('YYYY-MM-DD');
			obj = { date };
		}
	} else {
		const date = Moment(dropEvent).format('YYYY-MM-DD');
		obj = { date, time };
	}
	// console.log('<<< transformCalendarDropEvent, date object ', obj);
	return obj;
}

/*
	createMaxDate(obj) {
		if (!obj) {
			return { date: '', time: '' };
		}
		return {
			date: Moment(obj.date)
				.add(1, 'week')
				.format('YYYY-MM-DD'),
			time: '23:59'
		};
	},
*/
