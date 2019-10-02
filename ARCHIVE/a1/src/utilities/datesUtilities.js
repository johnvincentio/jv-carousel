import Moment from 'moment';

export function createToday() {
	return { date: Moment().format('YYYY-MM-DD'), time: '00:00' };
}

/*
* Used by TaskDialog
*/
export function transformObjectToDateMoment(obj) {
	if (!obj || !obj.date) {
		return null;
	}
	// console.log(`transformObjectToDateMoment, date ${obj.date}`);
	const moment = Moment(`${obj.date}`, 'YYYY-MM-DD');
	// console.log('moment ', moment);
	return moment;
}

export function transformObjectToTimeMoment(obj) {
	if (!obj || !obj.date || !obj.time) {
		return null;
	}
	// console.log(`transformObjectToTimeMoment, time ${obj.time}`);
	const moment = Moment(`${obj.date} ${obj.time}`, 'YYYY-MM-DD HH:mm');
	// console.log('moment ', moment);
	return moment;
}

export function transformMomentsToObject(momentDate, momentTime) {
	// console.log('transformMomentsToObject, momentDate ', momentDate, ' momentTime ', momentTime);
	if (!momentDate) {
		return null;
	}

	const date = Moment(momentDate).format('YYYY-MM-DD');

	if (momentTime) {
		const time = momentTime ? Moment(momentTime).format('HH:mm') : null;
		return { date, time };
	}
	return { date };
}

/*
* Used to display a date/time
*/

export function transformObjectToUserDateString(obj) {
	// console.log('transformObjectToUserDateString; obj ', obj);
	if (!obj || !obj.date) {
		return null;
	}

	const date = Moment(obj.date).format('DD MMM YYYY');
	// console.log('date ', date);
	if (!obj.time) {
		return date;
	}

	const dateTime = `${obj.date} ${obj.time}`;
	// const time = Moment(dateTime).format('DD MMM YYYY HH:mm');
	const time = Moment(dateTime).format('hh:mma');
	// return `${time}, ${date}`;
	return `${date} ${time}`;
}

/*
* Others
*/

export function isScheduled(task) {
	if (!task) {
		return false;
	}
	if ('start' in task || 'end' in task) {
		return true;
	}
	return false;
}

export function isEvent(task) {
	if (!task) {
		return false;
	}
	if (
		typeof task.start !== 'undefined' &&
		typeof task.start.date !== 'undefined' &&
		typeof task.start.time !== 'undefined'
	) {
		return true;
	}
	if (typeof task.end !== 'undefined' && typeof task.end.date !== 'undefined' && typeof task.end.time !== 'undefined') {
		return true;
	}
	return false;
}

function createMomentWithTime(obj) {
	if (!obj || !obj.date) {
		return null;
	}
	let { time } = obj;
	if (!obj.time) {
		time = '00:00';
	}
	const dateTime = `${obj.date} ${time}`;
	// console.log('transformObjectToMoment, dateTime ', dateTime);
	const moment = Moment(dateTime, 'YYYY-MM-DD HH:mm');
	// console.log('moment ', moment);
	return moment;
}

export function isLate(task) {
	if (!task) {
		return false;
	}
	if (typeof task.end !== 'undefined' && typeof task.end.date !== 'undefined') {
		const date = createMomentWithTime(task.end);
		const now = Moment();
		// console.log('date ', date, 'now ', now);
		return now > date;
	}
	return false;
}
